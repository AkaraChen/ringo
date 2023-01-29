---
title: Dialog
---

<script setup>
import Dialog from "./demo/Dialog.vue"
</script>

# Dialog

Informs users while preserving the current page state.

<Dialog />

## API

```ts
import {dialog} from '@akrc/ringo';
import '@akrc/ringo/style/dialog/ant.css';

dialog({
    title: 'Error Occurred',
    text: 'You need to be logged in to continue.',
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
export interface DialogProperties {
    title: string;
    withBackdrop?: boolean;
    width?: number;
    zIndex?: number;
    transitionDuration?: number;
    clickBackdropClose?: boolean;
    text: string;
    showClose?: boolean;
    buttons?: Button[];
    form?: HTMLFormElement;
    model?: typeof DialogModel;
}
```
