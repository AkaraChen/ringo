import { backdropTheme } from './theme';
import { applyStyles } from '../core/styles';
import { createHost, getShadow } from '../core/element';
import { getConfiguredStyles } from '../configure';
import { isDark, onColorChange } from '../core/theme';
import type { CommonProps } from '../types';

export interface BackdropProperties extends CommonProps {
    colorLight?: string;
    colorDark?: string;
    opacity?: number;
    onClick?: () => void;
    transitionDuration?: number;
}

export type Backdrop = {
    add: () => void;
    remove: () => void;
    clear: () => void;
};

const TAG = 'ringo-backdrop';

let host: HTMLElement | undefined;
let count = 0;
const clickHandlers: Array<() => void> = [];
let removeTimer: ReturnType<typeof setTimeout> | undefined;

function ensureHost(props: BackdropProperties) {
    if (host) return host;

    host = createHost(TAG);
    const shadow = getShadow(host);
    const {
        colorLight = 'rgba(0, 0, 0, 0.6)',
        colorDark = 'rgba(0, 0, 0, 0.6)',
        zIndex = 9000,
        opacity = 0.8,
        transitionDuration = 250,
        styles
    } = props;

    host.style.setProperty('--ringo-z-index', String(zIndex));
    host.style.setProperty('--ringo-opacity', String(opacity));
    host.style.setProperty('--ringo-duration', `${transitionDuration}ms`);
    host.style.setProperty('--ringo-bg', isDark() ? colorDark : colorLight);

    applyStyles(shadow, backdropTheme, getConfiguredStyles(), styles);

    onColorChange((event) => {
        if (!host) return;
        host.style.setProperty(
            '--ringo-bg',
            event.matches ? colorDark : colorLight
        );
    });

    host.addEventListener('click', () => {
        clickHandlers.at(-1)?.();
    });

    return host;
}

function show(props: BackdropProperties) {
    const node = ensureHost(props);
    const ctx = { host: node, shadowRoot: getShadow(node) };
    if (removeTimer) {
        clearTimeout(removeTimer);
        removeTimer = undefined;
    }
    if (!node.isConnected) {
        props.onCreate?.(ctx);
        document.body.append(node);
        props.onAppend?.(ctx);
    }
    requestAnimationFrame(() => {
        node.setAttribute('data-open', '');
    });
}

function hide(props: BackdropProperties, transitionDuration = 250) {
    if (!host) return;
    props.onClose?.({ host, shadowRoot: getShadow(host) });
    host.removeAttribute('data-open');
    removeTimer = setTimeout(() => {
        host?.remove();
        removeTimer = undefined;
    }, transitionDuration);
}

export function backdrop(property: BackdropProperties = {}): Backdrop {
    const { transitionDuration = 250, onClick } = property;

    return {
        add() {
            if (onClick) clickHandlers.push(onClick);
            if (++count === 1) show(property);
        },
        remove() {
            if (onClick) {
                const index = clickHandlers.lastIndexOf(onClick);
                if (index !== -1) clickHandlers.splice(index, 1);
            }
            if (count > 0 && --count === 0) hide(property, transitionDuration);
        },
        clear() {
            clickHandlers.length = 0;
            if (count !== 0) {
                count = 0;
                hide(property, transitionDuration);
            }
        }
    };
}

export function resetBackdrop() {
    clickHandlers.length = 0;
    count = 0;
    if (removeTimer) {
        clearTimeout(removeTimer);
        removeTimer = undefined;
    }
    host?.remove();
    host = undefined;
}
