---
title: Drawer
---

<script setup>
import Drawer from "./demo/Drawer.vue"
</script>

# Drawer

Informs users while preserving the current page state.

<Drawer />

## API

```ts
import {drawer} from '@akrc/ringo';
import '@akrc/ringo/style/drawer/ant.css';

drawer({
    title: 'Test',
    content: lorem,
    primaryButton: {
        text: 'Primary',
        onClick: () => {},
        close: true,
    },
    secondaryButton: {
        text: 'Secondary',
        onClick: (close) => {
            if (1 === 1) close();
        },
    },
});
```

```ts
export type DrawerProp = {
    width?: string;
    zIndex?: number;
    withBackdrop?: boolean;
    position?: 'left' | 'right';
    transitionDuration?: number;
    title?: string;
    showClose?: boolean;
    onClose?(): void;
    content?: string;
    primaryButton?: Btn;
    secondaryButton?: Btn;
    dangerouslyUseHTML?: boolean;
    clickBackdropClose?: boolean;
};

type Btn = {
    text: string;
    onClick(closeFn: () => void): any;
    close?: true;
};
```
