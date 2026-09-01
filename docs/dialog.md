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
import { dialog } from '@akrc/ringo';

dialog({
    title: 'Error Occurred',
    text: 'You need to be logged in to continue.',
    showClose: true,
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
    onCreate?: LifecycleHook;
    onAppend?: LifecycleHook;
    onClose?: LifecycleHook;
    styles?: StyleInput | StyleInput[];
}
```
