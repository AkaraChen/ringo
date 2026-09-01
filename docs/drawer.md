---
title: Drawer
---

<script setup>
import Drawer from "./demo/Drawer.vue"
</script>

# Drawer

A slide-in panel that keeps the current page underneath.

<Drawer />

## API

```ts
import { drawer } from '@akrc/ringo';

drawer({
    title: 'Test',
    content: 'Hello',
    buttons: [
        { text: 'Primary', onClick: () => {}, close: true, primary: true },
        {
            text: 'Secondary',
            onClick: (close) => {
                close();
            }
        }
    ]
});
```

```ts
export interface DrawerProperties {
    width?: number;
    zIndex?: number;
    withBackdrop?: boolean;
    position?: 'left' | 'right';
    transitionDuration?: number;
    title?: string;
    showClose?: boolean;
    content?: string;
    buttons?: Button[];
    clickBackdropClose?: boolean;
    onCreate?: LifecycleHook;
    onAppend?: LifecycleHook;
    onClose?: LifecycleHook;
    styles?: StyleInput | StyleInput[];
}

export type Button = {
    text: string;
    onClick?: (closeFunction: () => void) => void;
    close?: boolean;
    primary?: boolean;
    type?: 'info' | 'warning' | 'error' | 'success';
};
```
