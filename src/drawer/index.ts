import * as s from './drawer.css';
import '../button/button.css';
import { applyStyles } from '../core/styles';
import { createHost, getShadow } from '../core/element';
import { cx, el } from '../core/dom';
import { numberToPixel } from '../core/style';
import { getConfiguredStyles } from '../configure';
import { vanillaCssFor } from '../core/ve-register';
import { createButton } from '../button';
import { backdrop } from '../backdrop';
import { animate } from 'motion';
import type { Button, CommonProps, RingoInstance } from '../types';

export interface DrawerProperties extends CommonProps {
    width?: number;
    withBackdrop?: boolean;
    position?: 'left' | 'right';
    transitionDuration?: number;
    title?: string;
    showClose?: boolean;
    content?: string;
    buttons?: Button[];
    clickBackdropClose?: boolean;
}

const TAG = 'ringo-drawer';

export function drawer(property: DrawerProperties): RingoInstance {
    const {
        title = '',
        content = '',
        showClose = true,
        buttons = [],
        position = 'right',
        width = 300,
        clickBackdropClose = true,
        transitionDuration = 300,
        withBackdrop = true,
        zIndex = 10_000,
        styles,
        onCreate,
        onAppend,
        onClose
    } = property;

    const host = createHost(TAG);
    const shadow = getShadow(host);
    host.setAttribute('position', position);
    host.style.setProperty('--ringo-z-index', String(zIndex));
    host.style.width = numberToPixel(width);

    applyStyles(
        shadow,
        vanillaCssFor('button.css.ts', 'drawer.css.ts'),
        getConfiguredStyles(),
        styles
    );

    const closeBtn = showClose
        ? el('i', { class: cx(s.close, 'ringo-drawer-close'), part: 'close' })
        : undefined;

    const btnGroup =
        buttons.length > 0
            ? el('div', {
                  class: cx(s.buttons, 'ringo-drawer-btns'),
                  part: 'buttons'
              })
            : undefined;

    const panel = el(
        'div',
        { class: cx(s.panel, 'ringo-drawer'), part: 'panel' },
        [
            el('div', { class: cx(s.head, 'ringo-drawer-head') }, [
                el(
                    'h2',
                    { class: cx(s.title, 'ringo-drawer-title'), part: 'title' },
                    [title]
                ),
                closeBtn
            ]),
            el(
                'div',
                {
                    class: cx(s.content, 'ringo-drawer-content'),
                    part: 'content'
                },
                [content]
            ),
            btnGroup
        ]
    );
    shadow.append(panel);

    const ctx = { host, shadowRoot: shadow };
    let closed = false;
    const overlay = backdrop({
        onClick: clickBackdropClose ? () => close() : undefined,
        transitionDuration
    });

    const close = () => {
        if (closed) return;
        closed = true;
        onClose?.(ctx);
        if (withBackdrop) overlay.remove();
        animate(
            host,
            { [position]: numberToPixel(-width) },
            { duration: transitionDuration / 1000 }
        );
        setTimeout(() => host.remove(), transitionDuration);
    };

    if (btnGroup) {
        for (const button of buttons) {
            btnGroup.append(createButton(button, close));
        }
    }
    closeBtn?.addEventListener('click', close);

    onCreate?.(ctx);
    host.style[position] = numberToPixel(-width);
    document.body.append(host);

    animate(host, { [position]: 0 });
    if (withBackdrop) overlay.add();

    onAppend?.(ctx);

    return { host, close };
}
