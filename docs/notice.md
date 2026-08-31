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
import { notice } from '@akrc/ringo';

notice({ text: 'Saved', variant: 'innei' });
```

```ts
export interface NoticeProperties {
    text: string;
    marginTop?: number;
    type?: 'info' | 'warning' | 'error' | 'success';
    duration?: number;
    onClick?: (element: HTMLElement) => void;
    onCreate?: LifecycleHook;
    onAppend?: LifecycleHook;
    onClose?: LifecycleHook;
    styles?: StyleInput | StyleInput[];
    zIndex?: number;
    transitionDuration?: number;
    variant?: 'ant' | 'innei';
}
```
