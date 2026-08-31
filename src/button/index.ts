import type { Button } from '../types';
import { el } from '../core/dom';

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
    const className = [
        'ringo-button',
        primary ? 'ringo-button-primary' : '',
        `ringo-button-type-${type}`
    ]
        .filter(Boolean)
        .join(' ');

    const node = el('button', { class: className }, [text]);
    node.addEventListener('click', () => {
        onClick(closeFunction);
        if (close) closeFunction();
    });
    return node;
}
