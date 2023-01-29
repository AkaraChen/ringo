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

The backdrop is used to focus the user's attention on the dialog component. However, there may be situation in a page where multiple backdrops are called at the same time, the backdrop use closure to ensure that there is and will be only one backdrop, it maintains a count state with a default value of 0, when the count is greater than one, the backdrop will be added to the page, when the count goes to zero the backdrop will disappear.

## API

```ts
import {backdrop} from '@akrc/ringo';
const {add, remove, clear} = backdrop();

add(); // count++
remove(); // count--
clear(); // force clear backdrop
```

```ts
export interface BackdropProperties {
    color?: 'light' | 'dark';
    colorLight?: string;
    colorDark?: string;
    zIndex?: number;
    opacity?: number;
    onClick?(): any;
    transitionDuration?: number;
}
```
