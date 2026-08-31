import * as ant from './notice.css';
import * as innei from './innei.css';
import { applyStyles } from '../core/styles';
import { createHost, getShadow } from '../core/element';
import { cx, el, setOnClick } from '../core/dom';
import { Height, useHeight } from '../core/height';
import { numberToPixel } from '../core/style';
import { getConfiguredStyles } from '../configure';
import { vanillaCssFor } from '../core/ve-register';
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

    const theme = variant === 'innei' ? innei : ant;
    const host = createHost(TAG);
    const shadow = getShadow(host);
    host.setAttribute('type', type);
    host.setAttribute('variant', variant);
    host.style.setProperty('--ringo-z-index', String(zIndex));

    applyStyles(
        shadow,
        vanillaCssFor(variant === 'innei' ? 'innei.css.ts' : 'notice.css.ts'),
        getConfiguredStyles(),
        styles
    );

    const panel = el(
        'div',
        {
            class: cx(
                theme.panel,
                theme.type[type],
                'ringo-notice',
                `ringo-notice-${type}`,
                variant === 'innei'
                    ? cx(innei.enter, 'ringo-innei-notice-enter')
                    : undefined
            ),
            part: 'panel'
        },
        [
            el(
                'p',
                {
                    class: cx(theme.content, 'ringo-notice-content'),
                    part: 'content'
                },
                [text]
            )
        ]
    );
    shadow.append(panel);

    const ctx = { host, shadowRoot: shadow };
    let closed = false;

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
            panel.classList.add(innei.leave, 'ringo-innei-notice-leave');
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
