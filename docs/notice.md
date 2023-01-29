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
import '@akrc/ringo/style/notice/ant.css';
```

```ts
export interface NoticeProperties {
    text: string;
    marginTop?: number;
    type?: 'info' | 'warning' | 'error' | 'success';
    duration?: number;
    onClick?: (element: HTMLElement) => any;
    onClose?: () => any;
    zIndex?: number;
    transitionDuration?: number;
    model?: typeof NoticeModel;
}
```
