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
import {message} from '@akrc/ringo';
import '@akrc/ringo/style/message/ant.css';
```

```ts
export interface MessageProperties {
    type?: 'success' | 'info' | 'error' | 'warning';
    text: string;
    title?: string;
    duration?: number;
    onClick?: (element?: HTMLElement) => any;
    showClose?: boolean;
    onClose?: () => any;
    marginTop?: number;
    marginRight?: number;
    width?: number;
    zIndex?: number;
    transitionDuration?: number;
    model?: typeof MessageModel;
}
```
