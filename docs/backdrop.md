---
title: Backdrop
---

<script setup>
import Backdrop from "./demo/Backdrop.vue"
</script>

# Backdrop

Add a full height and full width background on the top of the document.

<Backdrop />

## Description

The backdrop focuses attention on a dialog or drawer. Multiple callers share one `<ringo-backdrop>` host. It keeps a reference count: the overlay is added when the count becomes 1, and removed when the count returns to 0.

## API

```ts
import { backdrop } from '@akrc/ringo';
const { add, remove, clear } = backdrop();

add(); // count++
remove(); // count--
clear(); // force clear backdrop
```

```ts
export interface BackdropProperties {
    colorLight?: string;
    colorDark?: string;
    zIndex?: number;
    opacity?: number;
    onClick?: () => void;
    transitionDuration?: number;
    styles?: StyleInput | StyleInput[];
    onCreate?: LifecycleHook;
    onAppend?: LifecycleHook;
    onClose?: LifecycleHook;
}
```
