import { messageTheme } from './theme';
import { applyStyles } from '../core/styles';
import { createHost, getShadow } from '../core/element';
import { el, setOnClick } from '../core/dom';
import { Height, useHeight } from '../core/height';
import { numberToPixel } from '../core/style';
import { getConfiguredStyles } from '../configure';
import { animate, spring } from 'motion';
import type { CommonProps, MessageType, RingoInstance } from '../types';

export interface MessageProperties extends CommonProps {
    type?: MessageType;
    text: string;
    title?: string;
    duration?: number;
    onClick?: (element: HTMLElement) => void;
    showClose?: boolean;
    marginTop?: number;
    marginRight?: number;
    width?: number;
    transitionDuration?: number;
}

const TAG = 'ringo-message';
const stack = new Height();

export function message(property: MessageProperties): RingoInstance {
    const {
        type = 'info',
        text,
        title = type,
        duration = 3000,
        showClose = duration === 0,
        width = 300,
        marginRight = 20,
        marginTop = 10,
        transitionDuration = 300,
        zIndex = 10_000,
        onClick,
        styles,
        onCreate,
        onAppend,
        onClose
    } = property;

    const host = createHost(TAG);
    const shadow = getShadow(host);
    host.setAttribute('type', type);
    host.style.setProperty('--ringo-z-index', String(zIndex));
    host.style.width = numberToPixel(width);

    applyStyles(shadow, messageTheme, getConfiguredStyles(), styles);

    const closeBtn = showClose
        ? el('i', { class: 'ringo-message-close', part: 'close' })
        : undefined;

    const panel = el(
        'div',
        { class: `ringo-message ringo-message-${type}`, part: 'panel' },
        [
            el('h3', { class: 'ringo-message-head' }, [
                el('div', { class: 'ringo-message-title', part: 'title' }, [
                    title
                ])
            ]),
            el('p', { class: 'ringo-message-content', part: 'content' }, [
                text
            ]),
            closeBtn
        ]
    );
    shadow.append(panel);

    const ctx = { host, shadowRoot: shadow };
    let closed = false;

    onCreate?.(ctx);

    host.style.right = numberToPixel(-width);
    document.body.append(host);

    host.style.top = numberToPixel(stack.getHeight() + marginTop);
    const heightTarget = { target: host, marginTop };
    stack.add(heightTarget);

    const close = () => {
        if (closed) return;
        closed = true;
        onClose?.(ctx);
        stack.remove(heightTarget, false);
        animate(host, {
            right: numberToPixel(-host.offsetWidth)
        });
        setTimeout(() => host.remove(), transitionDuration);
    };
    useHeight(host, transitionDuration);
    setOnClick(host, onClick);

    animate(host, { right: numberToPixel(marginRight) }, { easing: spring() });

    if (duration) setTimeout(close, duration);
    closeBtn?.addEventListener('click', (event) => {
        event.stopPropagation();
        close();
    });

    onAppend?.(ctx);

    return { host, close };
}

export function resetMessageStack() {
    stack.clear();
}
