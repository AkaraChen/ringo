import type { backdrop } from '@/component';

export interface BackdropProperties {
    color?: 'light' | 'dark';
    colorLight?: string;
    colorDark?: string;
    zIndex?: number;
    opacity?: number;
    onClick?(): any;
    transitionDuration?: number;
}

export type Backdrop = ReturnType<typeof backdrop>;

export type Button = {
    text: string;
    onClick?: (closeFunction: () => void) => any;
    close?: boolean;
    primary?: boolean;
    type?: 'info' | 'warning' | 'error' | 'success';
};
