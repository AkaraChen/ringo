# Ringo

The message, dialog, notice, and drawer primitives written in TypeScript. Each popup is a Web Component with an open Shadow DOM; you still call an imperative API.

## Playground

[Ringo Playground](https://ringo-playground.akr.moe)

## Usage

```shell
pnpm add @akrc/ringo
```

```ts
import { message } from '@akrc/ringo';

message({ text: 'Hello, Ringo!' });
```

Pass styles into the shadow root with CSS variables, `styles` / `configure()`, or `::part`. See [the docs](https://ringo.js.org).
