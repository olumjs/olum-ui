# Olum UI

[shadcn/ui](https://ui.shadcn.com), rebuilt for [OlumJS](https://olumjs.top) — same markup, same behavior, no React.

The whole shadcn/ui component set ported to plain OlumJS files. Nothing is installed as a package: components are copied straight into your project as source, so you own the code and can edit it like you wrote it yourself.

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
    ui/           # the ported components (Button, Dialog, DataTable, ...)
    Navbar/, Footer/, ...   # site chrome, not part of the component set
  elements/
    <component>/
      page.html    # the demo page for that component
      snippets.js  # generated — do not edit
  utils/           # component registry, descriptions, shared helpers
registry.json      # manifest the CLI reads: name, title, description, deps, path
```

## Attribution

A community port of [shadcn/ui](https://ui.shadcn.com) (MIT). Not affiliated with or endorsed by the original project.

## License

MIT
