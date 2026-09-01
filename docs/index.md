---
title: Get Started
---

# Get Started

`Ringo` is a popup component library written in TypeScript. The public API is still imperative (`message()`, `dialog()`, …). Internally each popup is a Web Component with an open Shadow DOM, so default styles stay isolated.

## Feature

- Shadow DOM style isolation, with three ways to pass styles in
- TypeScript-first API
- Lifecycle hooks instead of HTML injection or subclassing

## Install

```bash
pnpm add @akrc/ringo
```

```ts
import { message } from '@akrc/ringo';

message({ text: 'Hello, Ringo!' });
```

Default themes ship inside the shadow root. You do not need to import a global CSS file.

## Passing styles in

CSS custom properties on the host pierce the shadow:

```css
ringo-message {
    --ringo-radius: 8px;
    --ringo-bg: #fff;
}
```

`styles` (and `configure`) adopt extra stylesheets **after** the default theme:

```ts
import { configure, message } from '@akrc/ringo';

configure({
    styles: ':host { --ringo-radius: 12px; }'
});

message({
    text: 'Saved',
    styles: '.ringo-message-title { letter-spacing: 0.02em; }'
});
```

Key internals expose `::part` (`panel`, `title`, `content`, `close`, `buttons`):

```css
ringo-dialog::part(title) {
    font-weight: 700;
}
```

## Lifecycle hooks

```ts
message({
    text: 'Saved',
    onCreate({ host, shadowRoot }) {
        /* element is built, not yet in document */
    },
    onAppend({ host, shadowRoot }) {
        /* mounted on document.body */
    },
    onClose({ host, shadowRoot }) {
        /* closing animation is about to start */
    }
});
```

`text` / `title` / `content` are always plain text. Insert extra nodes from a hook.
