// Prints every Shiki theme bundled with the installed version, split by the
// `type` each theme declares, so the two columns map onto the light/dark pair
// THEMES in gen-snippets.mjs expects. A name marked (current) is what the
// committed snippets were generated with.
import { bundledThemes } from "shiki";

const CURRENT = { light: process.env.SHIKI_LIGHT || "github-light", dark: process.env.SHIKI_DARK || "github-dark" };

const groups = { light: [], dark: [] };

for (const [name, load] of Object.entries(bundledThemes)) {
  const theme = await load().then(m => m.default ?? m);
  (groups[theme.type] ?? groups.dark).push({ name, displayName: theme.displayName });
}

for (const [type, themes] of Object.entries(groups)) {
  console.log(`\n${type} (${themes.length})`);
  const pad = Math.max(...themes.map(t => t.name.length));
  for (const { name, displayName } of themes) {
    const mark = CURRENT[type] === name ? " (current)" : "";
    console.log(`  ${name.padEnd(pad)}  ${displayName}${mark}`);
  }
}

console.log(`\nSet a pair, then regenerate:\n  SHIKI_LIGHT=<light> SHIKI_DARK=<dark> npm run snippets\nOr edit THEMES in scripts/gen-snippets.mjs to make it the default.\n`);
