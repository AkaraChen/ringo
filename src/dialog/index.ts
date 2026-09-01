import * as s from './dialog.css';
import '../button/button.css';
import { applyStyles } from '../core/styles';
import { createHost, getShadow } from '../core/element';
import { cx, el } from '../core/dom';
import { numberToPixel } from '../core/style';
import { getConfiguredStyles } from '../configure';
import { vanillaCssFor } from '../core/ve-register';
import { createButton } from '../button';
import { backdrop } from '../backdrop';
import { animate, spring } from 'motion';
import type { Button, CommonProps, RingoInstance } from '../types';

export interface DialogProperties extends CommonProps {
    title: string;
    withBackdrop?: boolean;
    width?: number;
    transitionDuration?: number;
    clickBackdropClose?: boolean;
    text: string;
    showClose?: boolean;
    buttons?: Button[];
}

const TAG = 'ringo-dialog';

const defaultButtons: Button[] = [
    { text: 'Yes', close: true, primary: true },
    { text: 'No', close: true }
];

export function dialog(property: DialogProperties): RingoInstance {
    const {
        title,
        text,
        showClose = false,
        buttons = defaultButtons,
        withBackdrop = true,
        clickBackdropClose = true,
        width = 350,
        zIndex = 10_000,
        transitionDuration = 300,
        styles,
        onCreate,
        onAppend,
        onClose
    } = property;

    const host = createHost(TAG);
    const shadow = getShadow(host);
    host.style.setProperty('--ringo-z-index', String(zIndex));
    host.style.width = numberToPixel(width);

    applyStyles(
        shadow,
        vanillaCssFor('button.css.ts', 'dialog.css.ts'),
        getConfiguredStyles(),
        styles
    );

    const closeBtn = showClose
        ? el('i', { class: cx(s.close, 'ringo-dialog-close'), part: 'close' })
        : undefined;

    const btnGroup =
        buttons.length > 0
            ? el('div', {
                  class: cx(s.buttons, 'ringo-dialog-btns'),
                  part: 'buttons'
              })
            : undefined;

    const panel = el(
        'div',
        { class: cx(s.panel, 'ringo-dialog'), part: 'panel' },
        [
            el('div', { class: cx(s.head, 'ringo-dialog-head') }, [
                el(
                    'p',
                    { class: cx(s.title, 'ringo-dialog-title'), part: 'title' },
                    [title]
                ),
                closeBtn
            ]),
            el(
                'div',
                { class: cx(s.body, 'ringo-dialog-body'), part: 'content' },
                [text]
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
            { opacity: 0 },
            { easing: spring(), duration: transitionDuration / 1000 }
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
    document.body.append(host);

    host.style.top = `calc(40vh - ${host.offsetHeight / 2}px)`;
    host.style.left = `calc(50vw - ${host.offsetWidth / 2}px)`;
    host.style.opacity = '0';

    animate(
        host,
        { opacity: 1 },
        { duration: transitionDuration / 1000, easing: spring() }
    );
    if (withBackdrop) overlay.add();

    onAppend?.(ctx);

    return { host, close };
}
