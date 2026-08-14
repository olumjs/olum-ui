# Attribution & Third-Party Licenses

`olum-ui` is an independent component set for [OlumJS](https://olumjs.top),
written from scratch in OlumJS syntax and inspired by
[shadcn/ui](https://ui.shadcn.com). Its code is MIT licensed, see
[LICENSE.md](./LICENSE.md). Third-party material it actually redistributes —
the Lucide demo icons and the Geist font files — remains under its own license,
reproduced in full below.

This project is **not affiliated with, sponsored by, or endorsed by** shadcn,
Vercel, Tailwind Labs, the Lucide project, or any other party named here. The
names "shadcn/ui", "Geist", "Tailwind CSS" and "Lucide" are used only to
identify those projects, not to suggest any association.

## Relationship to shadcn/ui

These components are **original implementations**, not a translation of
shadcn/ui's source. No shadcn/ui file was converted, and no class string,
stylesheet or block of logic was copied across. Each component was written
directly in OlumJS against the behaviour it needed to have:

- no React and no JSX — single-file `.html` components using OlumJS props,
  slots and events, with native HTML attribute names (`class`, `for`,
  `oninput`)
- no primitive library. shadcn/ui composes Radix UI / Base UI primitives; there
  is no such dependency here, so open/close, focus, selection and keyboard
  behaviour is built from hidden native `<input>` elements plus CSS `:has()`
  selectors — a different mechanism, not a reimplementation of theirs
- no `cva`, no `Slot`. Variants are plain objects resolved through
  `tailwind-merge`
- the heavier widgets are hand-written: the chart is inline SVG (no Recharts),
  the data table is hand-rolled filter/sort/paginate (no TanStack Table), the
  calendar is hand-rolled month math (no React DayPicker), the carousel is CSS
  scroll-snap (no Embla), the resizable panels are pointer-drag on the flex
  grow factor (no react-resizable-panels)
- the styling is this project's own: its own spacing scale, sizes and design
  tokens, plus mechanisms shadcn/ui does not have, such as the
  `has-data-[icon=inline-start]` padding hooks, `--card-spacing`, and
  `color-mix()` hover states

What the two projects genuinely share is a **vocabulary**: component names,
variant names like `default` / `destructive` / `outline` / `ghost` / `link`,
the `data-slot` attribute convention, and a token palette built on the same
ideas (`primary`, `muted`, `destructive`, `ring`). The look is deliberately
familiar. That is an interface and a design language rather than copied code,
but shadcn/ui is where the vocabulary comes from and it deserves the credit.

## shadcn/ui

- Website: https://ui.shadcn.com
- Source: https://github.com/shadcn-ui/ui
- License: **MIT**

The inspiration for this project's component vocabulary, API shape and visual
language, and the model for the docs site layout. Its notice is reproduced
below as a courtesy — no shadcn/ui code is included here, so nothing obliges
it, and it is not an admission that any is.

```
MIT License

Copyright (c) 2023 shadcn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Copying a component out of here

Components are meant to be copied into your own project (`olum add button`).
They are this project's code, under this project's MIT license — so the notice
that travels with them is [LICENSE.md](./LICENSE.md), not shadcn/ui's. Using
them inside an app you ship imposes no obligation at all; MIT only asks for the
notice when you redistribute the source or substantial portions of it.

## Lucide

- Website: https://lucide.dev
- Source: https://github.com/lucide-icons/lucide
- License: **ISC** (icons derived from Feather: **MIT**)

The demo pages under `src/elements/` embed Lucide icon SVGs inline as strings,
matching the icons shadcn/ui's own examples use. The path data is Lucide's,
with the outer `<svg>` attributes reformatted and, in places, a Tailwind class
added. These icons are demo content only — no component in
`src/components/ui/` depends on them.

```
ISC License

Copyright (c) 2026 Lucide Icons and Contributors

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
```

Icons derived from [Feather](https://github.com/feathericons/feather) remain
additionally under Feather's MIT license:

```
MIT License

Copyright (c) 2013-present Cole Bemis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Geist and Geist Mono

- Source: https://github.com/vercel/geist-font
- License: **SIL Open Font License 1.1**

The docs site self-hosts both fonts. The `.woff2` files in `public/fonts/`
(and in the built `docs/` output) are copied unmodified out of
`@fontsource-variable/geist` and `@fontsource-variable/geist-mono`, which
subset and convert the upstream release. OFL section 2 requires this notice
and the license to accompany the font files, which is what this section is.

The fonts are *bundled with* this software, not sold by themselves, as OFL
section 1 requires. Nothing here is a Modified Version, so no Reserved Font
Name restriction is engaged.

```
Copyright 2024 The Geist Project Authors (https://github.com/vercel/geist-font)
Copyright 2024 The Geist Project Authors (https://github.com/vercel/geist-font.git)

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
http://scripts.sil.org/OFL
```

```
-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
```

## Tailwind CSS

- Website: https://tailwindcss.com
- License: **MIT**, Copyright (c) Tailwind Labs, Inc.

Used as a build dependency and as the class vocabulary every component is
written in. No Tailwind source is redistributed here; the generated
`public/main.css` is output produced by the tool from this project's own input,
which Tailwind's license places no conditions on.

## Shiki

- Website: https://shiki.style
- License: **MIT**, Copyright (c) 2021 Pine Wu

Used by `npm run snippets` at build time to syntax-highlight the code samples.
The generated markup embeds colour values from two bundled VS Code themes,
`min-light` (Miguel Solorio, MIT) and `material-theme-palenight` (Material
Theme, MIT). No Shiki source ships in the built site.

## tailwind-merge

- License: **MIT**, Copyright (c) 2021 Dany Castillo

A runtime dependency used to resolve conflicting Tailwind classes when a
component merges its defaults with a caller's `class` prop.

## Not used here

The projects below are listed only to record their **absence**. shadcn/ui
builds on them, this project does not: no source, no dependency, no port of
their internals. Where a component needed comparable behaviour it was written
from scratch, as described above.

- [Radix UI](https://www.radix-ui.com) — MIT
- [Base UI](https://base-ui.com) — MIT
- [Recharts](https://recharts.org) — MIT
- [TanStack Table](https://tanstack.com/table) — MIT
- [React DayPicker](https://daypicker.dev) — MIT
- [Embla Carousel](https://www.embla-carousel.com) — MIT
- [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) — MIT

## Something missing or wrong?

If you believe an attribution here is incomplete or incorrect, please open an
issue at https://github.com/olumjs/olum-ui/issues and it will be fixed.
