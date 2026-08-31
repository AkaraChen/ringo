import { noticeAntTheme } from './ant-theme';
import { noticeInneiTheme } from './innei-theme';
import { applyStyles } from '../core/styles';
import { createHost, getShadow } from '../core/element';
import { el, setOnClick } from '../core/dom';
import { Height, useHeight } from '../core/height';
import { numberToPixel } from '../core/style';
import { getConfiguredStyles } from '../configure';
import type { CommonProps, MessageType, RingoInstance } from '../types';

export interface NoticeProperties extends CommonProps {
    text: string;
    marginTop?: number;
    type?: MessageType;
    duration?: number;
    onClick?: (element: HTMLElement) => void;
    transitionDuration?: number;
    variant?: 'ant' | 'innei';
}

const TAG = 'ringo-notice';
const stack = new Height();

export function notice(property: NoticeProperties): RingoInstance {
    const {
        text,
        type = 'info',
        marginTop = 12,
        duration = 3000,
        zIndex = 10_000,
        transitionDuration = 300,
        variant = 'ant',
        onClick,
        styles,
        onCreate,
        onAppend,
        onClose
    } = property;

    const host = createHost(TAG);
    const shadow = getShadow(host);
    host.setAttribute('type', type);
    host.setAttribute('variant', variant);
    host.style.setProperty('--ringo-z-index', String(zIndex));

    applyStyles(
        shadow,
        variant === 'innei' ? noticeInneiTheme : noticeAntTheme,
        getConfiguredStyles(),
        styles
    );

    const panel = el(
        'div',
        { class: `ringo-notice ringo-notice-${type}`, part: 'panel' },
        [el('p', { class: 'ringo-notice-content', part: 'content' }, [text])]
    );
    shadow.append(panel);

    const ctx = { host, shadowRoot: shadow };
    let closed = false;

    if (variant === 'innei') {
        panel.classList.add('ringo-innei-notice-enter');
    }

    onCreate?.(ctx);
    document.body.append(host);

    if (variant === 'innei') {
        host.style.top = numberToPixel(stack.getHeight() + marginTop);
    } else {
        host.style.top = `${-host.offsetHeight}px`;
        useHeight(host, transitionDuration);
    }

    const heightTarget = { target: host, marginTop };
    stack.add(heightTarget);

    const close = () => {
        if (closed) return;
        closed = true;
        onClose?.(ctx);
        if (variant === 'innei') {
            panel.classList.add('ringo-innei-notice-leave');
        }
        stack.remove(heightTarget, variant !== 'innei');
        setTimeout(() => host.remove(), transitionDuration);
    };
    setOnClick(host, onClick);

    if (duration) setTimeout(close, duration);

    onAppend?.(ctx);

    return { host, close };
}

export function resetNoticeStack() {
    stack.clear();
}
