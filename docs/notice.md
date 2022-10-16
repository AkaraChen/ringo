---
title: Notice
---

<script setup>
import Notice from "./demo/Notice.vue"
</script>

# Notice

Displays a global notification message at the top of the page.

<Notice />

## API

```ts
import {notice} from '@akrc/ringo';
import '@akrc/ringo/style/notice/default.css';
```

```ts
export type NoticeProps = {
    type?: 'success' | 'info' | 'error' | 'warning';
    text: string;
    duration?: number;
    onClick?: (element?: HTMLElement) => any;
    onClose?: () => any;
    marginTop?: number;
    zIndex?: number;
    transitionDuration?: number;
};
```
