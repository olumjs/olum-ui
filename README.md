# Olum UI

A complete component set for [OlumJS](https://olumjs.top), in the spirit of [shadcn/ui](https://ui.shadcn.com) — familiar API, no React.

63 components written from scratch as plain OlumJS files. Nothing is installed as a package: components are copied straight into your project as source, so you own the code and can edit it like you wrote it yourself.

**[Browse the components →](https://ui.olumjs.top)**

## What's here

This repo is the component gallery and docs site — every demo, variant, and install snippet you see at [ui.olumjs.top](https://ui.olumjs.top) lives in `src/elements/`, built from the source components in `src/components/ui/`.

- **63 components** across data display, forms, layout, navigation, overlay, and feedback
- Each one is a self-contained `.html` file (markup + script), styled with Tailwind and driven by [OlumJS](https://github.com/olumjs/olum)
- Dark mode, keyboard navigation, and accessible markup out of the box
- `registry.json` is the manifest the CLI reads to resolve a component name to its file(s)

## Using a component in your own project

Install the CLI once, globally:

```bash
npm i -g olum-cli
```

Then add whichever component you need — it's copied into your project, not installed as a dependency:

```bash
olum add button
```

Every component's page on the docs site has the exact command for that component, plus every variant it supports.

## Development

This repo itself is an OlumJS app (not a library) — cloning it gets you the docs/gallery site.

```bash
git clone https://github.com/olumjs/olum-ui.git
cd olum-ui
npm install
npm run dev
```

### Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Builds CSS + demo snippets once, then runs the Tailwind and app watchers together |
| `npm run build` | Production build, output moved to `docs/` for GitHub Pages |
| `npm start` | Serves the production build |
| `npm run css` | One-off Tailwind build (`src/main.css` → `public/main.css`) |
| `npm run snippets` | Regenerates each example page's copyable code + syntax highlighting from its `<DemoBlock>`s, and mirrors `registry.json` descriptions into `src/utils/descriptions.js` |
| `npm run themes` | Lists every bundled Shiki theme name, for picking the snippet color scheme |
| `npm run fonts` | Copies the Geist font files into `public/fonts/` |

Run `npm run snippets` after editing any `src/elements/*/page.html` demo, or after changing a description in `registry.json` — both are generated files and shouldn't be hand-edited.

### Project layout

```
src/
  components/
    ui/           # the component set (Button, Dialog, DataTable, ...)
    Navbar/, Footer/, ...   # site chrome, not part of the component set
  elements/
    <component>/
      page.html    # the demo page for that component
      snippets.js  # generated — do not edit
  utils/           # component registry, descriptions, shared helpers
registry.json      # manifest the CLI reads: name, title, description, deps, path
```

## Attribution

Inspired by [shadcn/ui](https://ui.shadcn.com), but not affiliated with, sponsored by, or endorsed by it.

Every component here is an original implementation written directly in OlumJS — no React, no Radix/Base UI primitives, no Recharts/TanStack/DayPicker/Embla, and no shadcn/ui source. What the two share is a vocabulary: component names, variant names, the `data-slot` convention and a familiar visual language. [attribution.md](./attribution.md) sets that out in full, alongside the licenses for the material that *is* bundled here — the Lucide demo icons (ISC) and the self-hosted Geist fonts (OFL 1.1).

## License

[MIT](./LICENSE.md). See [attribution.md](./attribution.md) for the third-party notices that come with the bundled icons and fonts.

## Contributing
Thanks for wanting to help make Olum UI better! 💙 Bug fixes, new features, and docs improvements are all welcome.

### Step by step
1. **Fork** the repo and clone your fork:
   ```bash
   git clone https://github.com/<your-username>/olum-ui.git
   cd olum-ui
   ```
2. **Make sure you're up to date** with `main`:
   ```bash
   git fetch origin
   git checkout main
   ```
3. **Create your own branch from it:**
   ```bash
   git checkout -b feat/my-awesome-feature
   # or: git checkout -b fix/describe-the-bug
   ```
4. **Install dependencies:**
   ```bash
   npm install
   ```
5. **Make your change.** Components live in `src/components/ui/`, demo pages in `src/elements/<component>/page.html`, and `registry.json` is the manifest the CLI reads. Keep the change focused: one feature or fix per PR.
6. **Preview your change** with `npm run dev`. Run `npm run snippets` after editing any demo page or a description in `registry.json` — generated files (`snippets.js`, `docs/`) should not be hand-edited.
7. **Commit** using a clear message, following the existing style:
   ```
   feat: add a new component
   fix: describe the bug
   ```
8. **Push** your branch to your fork:
   ```bash
   git push origin feat/my-awesome-feature
   ```
9. **Open a Pull Request** against `main`. Describe what changed, why, and include a screenshot or small example if it's user-facing.

### PR checklist
- [ ] Branched from the latest `main`
- [ ] PR targets `main`
- [ ] One focused change, clear commit messages

Questions or unsure about an idea? Ask in [Discord](https://discord.gg/2zK7tb2Cg9) before you start — we're happy to help.

## Community
- [X](https://x.com/olumjs)
- [Bluesky](https://bsky.app/profile/olumjs.bsky.social)
- [Discord](https://discord.gg/2zK7tb2Cg9)

## Contact
- General: [hello@olumjs.top](mailto:hello@olumjs.top)
- Security: [security@olumjs.top](mailto:security@olumjs.top) — please report vulnerabilities here privately rather than opening a public issue
