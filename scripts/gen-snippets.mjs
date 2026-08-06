// Extracts every <DemoBlock> body from the example pages and writes a sibling
// snippets.js holding the raw source (for the copy button) plus Shiki-highlighted
// HTML (for display). Running at build time keeps the shown code identical to the
// live demo by construction, and keeps Shiki out of the browser bundle entirely.
//
// The snippets land in a .js module rather than the page's own <script> block on
// purpose: a literal </script> inside an embedded string truncates the compiler's
// script-extraction pass.
import { readFile, writeFile } from "node:fs/promises";
import { glob } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { codeToHtml } from "shiki";

const THEMES = { light: "github-light", dark: "github-dark" };


const slug = label =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Pull out the body of each <DemoBlock ...> … </DemoBlock>, tracking depth so a
// nested one wouldn't close the outer block early.
const parseBlocks = source => {
  const blocks = [];
  const open = /<DemoBlock\b([^>]*)>/g;
  let match;

  while ((match = open.exec(source))) {
    const attrs = match[1];
    const label = /label="([^"]*)"/.exec(attrs)?.[1];
    if (!label) throw new Error(`<DemoBlock> without a label attribute`);

    let depth = 1;
    let cursor = open.lastIndex;
    const scan = /<DemoBlock\b[^>]*>|<\/DemoBlock>/g;
    scan.lastIndex = cursor;
    let step;
    while (depth > 0 && (step = scan.exec(source))) {
      depth += step[0] === "</DemoBlock>" ? -1 : 1;
      if (depth === 0) cursor = step.index;
    }
    if (depth !== 0) throw new Error(`unclosed <DemoBlock label="${label}">`);

    blocks.push({ label, body: source.slice(open.lastIndex, cursor) });
    open.lastIndex = cursor;
  }
  return blocks;
};

// Strip the common leading indentation so the snippet reads as standalone code.
const dedent = body => {
  const lines = body.replace(/^\n/, "").replace(/\s+$/, "").split("\n");
  const indents = lines.filter(l => l.trim()).map(l => l.match(/^ */)[0].length);
  const cut = indents.length ? Math.min(...indents) : 0;
  return lines.map(l => l.slice(cut)).join("\n");
};

const jsString = value => "`" + value.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${") + "`";

// Docs chrome never belongs in a snippet. The reference check below already
// filters these out (they appear outside every DemoBlock), but naming them keeps
// the intent explicit if one is ever used inside a demo.
const CHROME = /\/(Navbar|GalleryNav|PageToc|PageHeader|InstallBlock|Pager|DemoBlock|CodeBlock)\/|^\.\/snippets$/;

// Paths are written for this repo's tree; a reader copying the snippet wants the
// path from their own project root.
const rewritePath = path => path.replace(/^(\.\.\/)+components\//, "./components/");

const references = (code, name) => new RegExp(`\\b${name.replace(/\$/g, "\\$")}\\b`).test(code);

// Walk a `const x = ...` (or let/function) from its opening line until every
// bracket it opened has closed, so multi-line objects and arrays come out whole.
const readDeclaration = (lines, start) => {
  let depth = 0;
  for (let i = start; i < lines.length; i += 1) {
    for (const ch of lines[i]) {
      if ("([{".includes(ch)) depth += 1;
      else if (")]}".includes(ch)) depth -= 1;
    }
    if (depth <= 0 && /[;}]\s*$/.test(lines[i])) return lines.slice(start, i + 1);
  }
  return lines.slice(start, start + 1);
};

const parseScript = source => {
  const match = /<script>\n([\s\S]*?)\n<\/script>/.exec(source);
  if (!match) return { imports: [], decls: [] };
  const lines = match[1].split("\n");

  const imports = [];
  const decls = [];

  for (let i = 0; i < lines.length; i += 1) {
    const imp = /^\s*import (?:(\{[^}]*\})|(\w+)) from "([^"]+)";\s*$/.exec(lines[i]);
    if (imp) {
      const names = imp[1] ? imp[1].replace(/[{}]/g, "").split(",").map(s => s.trim().split(/\s+as\s+/).pop()) : [imp[2]];
      imports.push({ names, path: imp[3], text: lines[i].trim() });
      continue;
    }
    const decl = /^\s*(?:const|let|function)\s+(\w+)/.exec(lines[i]);
    if (decl) {
      const text = readDeclaration(lines, i);
      decls.push({ name: decl[1], text });
      i += text.length - 1;
    }
  }
  return { imports, decls };
};

// A lookup object like `icons` holds an entry per demo on the page, so a block
// using two of five would otherwise carry three irrelevant SVG blobs. Drop the
// unreferenced keys -- but only for the simple one-property-per-line shape, and
// never when the object is indexed dynamically, since then the keys in play
// can't be known from the markup.
const pruneObject = (decl, scope) => {
  const [open, ...rest] = decl.text;
  const close = rest.at(-1);
  const body = rest.slice(0, -1);
  if (!/=\s*\{$/.test(open) || !/^\s*\};?$/.test(close ?? "")) return decl;
  if (new RegExp(`\\b${decl.name}\\s*\\[`).test(scope)) return decl;

  const props = body.map(line => ({ line, key: /^\s*([\w$]+|"[^"]+")\s*:/.exec(line)?.[1]?.replace(/"/g, "") }));
  if (props.some(p => !p.key)) return decl;

  const hit = new Set([...scope.matchAll(new RegExp(`\\b${decl.name}\\.([\\w$]+)`, "g"))].map(m => m[1]));
  const keep = props.filter(p => hit.has(p.key));
  if (!keep.length || keep.length === props.length) return decl;

  return { ...decl, text: [open, ...keep.map(p => p.line), close] };
};

// Rebuild a standalone component file for one demo: its markup plus only the
// imports and declarations that markup actually reaches, resolved transitively
// so a config referencing another const brings it along.
const buildSnippet = (markup, { imports, decls }) => {
  const needed = new Set();
  let changed = true;
  while (changed) {
    changed = false;
    const scope = [markup, ...[...needed].map(n => decls.find(d => d.name === n).text.join("\n"))].join("\n");
    for (const d of decls) {
      if (!needed.has(d.name) && references(scope, d.name)) {
        needed.add(d.name);
        changed = true;
      }
    }
  }

  const raw = decls.filter(d => needed.has(d.name));
  const fullScope = [markup, ...raw.map(d => d.text.join("\n"))].join("\n");
  const kept = raw.map(d => pruneObject(d, fullScope));
  const scope = [markup, ...kept.map(d => d.text.join("\n"))].join("\n");
  const used = imports.filter(i => !CHROME.test(i.path) && i.names.some(n => references(scope, n)));

  if (!used.length && !kept.length) return markup;

  const head = [
    ...used.map(i => `  ${i.text.replace(/"([^"]+)"/, (_, p) => `"${rewritePath(p)}"`)}`),
    ...kept.flatMap(d => ["", ...d.text]),
  ];

  return ["<script>", ...head, "</script>", "", markup].join("\n");
};

let pages = 0;
let total = 0;
const routes = [];

for await (const page of glob("src/elements/*/page.html")) {
  routes.push(basename(dirname(page)));
  const source = await readFile(page, "utf8");
  const blocks = parseBlocks(source);
  if (!blocks.length) continue;

  const script = parseScript(source);

  const entries = [];
  for (const { label, body } of blocks) {
    const code = buildSnippet(dedent(body), script);
    const html = await codeToHtml(code, { lang: "html", themes: THEMES, defaultColor: false });
    // `key` is emitted alongside so DemoBlock's anchor id and PageToc's href
    // come from one place instead of each re-deriving the slug.
    entries.push(
      `  ${JSON.stringify(slug(label))}: { key: ${JSON.stringify(slug(label))}, label: ${JSON.stringify(label)}, code: ${jsString(code)}, html: ${jsString(html)} },`,
    );
  }

  const out = ["// Generated by scripts/gen-snippets.mjs -- do not edit.", "export const snippets = {", ...entries, "};", ""].join("\n");
  await writeFile(join(dirname(page), "snippets.js"), out);
  pages += 1;
  total += blocks.length;
}

// Descriptions are authored in registry.json; mirroring them into a module keeps
// the manifest out of the browser bundle and off the bundler's resolve path.
const registry = JSON.parse(await readFile("registry.json", "utf8"));
const byName = new Map(registry.components.map(c => [c.name, c]));

const described = routes
  .sort()
  .map(id => [id, byName.get(id)?.description])
  .filter(([, description]) => description);

await writeFile(
  "src/utils/descriptions.js",
  [
    "// Generated by scripts/gen-snippets.mjs from registry.json -- do not edit.",
    "// Edit the `description` field in registry.json instead.",
    "export const descriptions = {",
    ...described.map(([id, description]) => `  ${JSON.stringify(id)}: ${JSON.stringify(description)},`),
    "};",
    "",
  ].join("\n"),
);

console.log(`snippets: ${total} block(s) across ${pages} page(s) | descriptions: ${described.length}/${routes.length} routes`);
