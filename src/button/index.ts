import * as s from './button.css';
import type { Button } from '../types';
import { cx, el } from '../core/dom';

export function createButton(
    {
        primary = false,
        text,
        onClick = (close) => close(),
        close,
        type = 'info'
    }: Button,
    closeFunction: () => void
) {
    const node = el(
        'button',
        {
            class: cx(
                s.button,
                primary && s.primary,
                s.tone[type],
                'ringo-button',
                primary && 'ringo-button-primary',
                `ringo-button-type-${type}`
            )
        },
        [text]
    );
    node.addEventListener('click', () => {
        onClick(closeFunction);
        if (close) closeFunction();
    });
    return node;
}
