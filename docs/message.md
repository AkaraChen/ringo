---
title: Message
---

<script setup>
import Message from "./demo/Message.vue"
</script>

# Message

Used to show feedback after an activity. The difference with Notice is that the latter is often used to show a system level passive notification.

<Message />

## API

```ts
import { message } from '@akrc/ringo';

message({ text: 'Hello, Ringo!' });
```

```ts
export interface MessageProperties {
    type?: 'success' | 'info' | 'error' | 'warning';
    text: string;
    title?: string;
    duration?: number;
    onClick?: (element: HTMLElement) => void;
    showClose?: boolean;
    onCreate?: LifecycleHook;
    onAppend?: LifecycleHook;
    onClose?: LifecycleHook;
    styles?: StyleInput | StyleInput[];
    marginTop?: number;
    marginRight?: number;
    width?: number;
    zIndex?: number;
    transitionDuration?: number;
}
```
