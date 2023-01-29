import { createElement, when } from '@/util';

export type Button = {
    text: string;
    onClick?: (closeFunction: () => void) => any;
    close?: boolean;
    primary?: boolean;
    type?: 'info' | 'warning' | 'error' | 'success';
};

export const createButton = (
    {
        primary = false,
        text,
        onClick = close => close(),
        close,
        type = 'info'
    }: Button,
    closeFunction: () => any
) => {
    return createElement({
        child: text,
        className: `ringo-button ${when(
            primary,
            'ringo-button-primary'
        )} ringo-button-type-${type}`,
        onClick: () => {
            onClick(closeFunction);
            if (close) closeFunction();
        },
        tag: 'button'
    });
};
