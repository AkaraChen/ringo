---
title: Message
---

# Message

Used to show feedback after an activity. The difference with Notice is that the latter is often used to show a system level passive notification.

<Message />

## API

```ts
import {message} from '@akrc/ringo';
import '@akrc/ringo/style/message/default.css';
```

```ts
export type MessageProps = {
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
};
```
