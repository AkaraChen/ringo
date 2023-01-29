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
export interface DrawerProperties {
    width?: number;
    zIndex?: number;
    withBackdrop?: boolean;
    position?: 'left' | 'right';
    transitionDuration?: number;
    title?: string;
    showClose?: boolean;
    onClose?(): void;
    content?: string;
    buttons: Button[];
    clickBackdropClose?: boolean;
    model?: typeof DrawerModel;
}

export type Button = {
    text: string;
    onClick?: (closeFunction: () => void) => any;
    close?: boolean;
    primary?: boolean;
    type?: 'info' | 'warning' | 'error' | 'success';
};
```
