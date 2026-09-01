export type StyleInput = string | CSSStyleSheet;

export interface HookContext {
    host: HTMLElement;
    shadowRoot: ShadowRoot;
}

export type LifecycleHook = (ctx: HookContext) => void;

export type MessageType = 'success' | 'info' | 'error' | 'warning';

export interface CommonProps {
    styles?: StyleInput | StyleInput[];
    onCreate?: LifecycleHook;
    onAppend?: LifecycleHook;
    onClose?: LifecycleHook;
    zIndex?: number;
}

export interface RingoInstance {
    host: HTMLElement;
    close: () => void;
}

export type Button = {
    text: string;
    onClick?: (closeFunction: () => void) => void;
    close?: boolean;
    primary?: boolean;
    type?: MessageType;
};
