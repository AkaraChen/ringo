import { createElement } from '../util/dom';
import { when } from '@/util/util';

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
        tag: 'button',
        className: `ringo-button ${when(
            primary,
            'ringo-button-primary'
        )} ringo-button-type-${type}`,
        child: text,
        onClick: () => {
            onClick(closeFunction);
            if (close) closeFunction();
        }
    });
};
