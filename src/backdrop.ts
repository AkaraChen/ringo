import {createElement} from './dom';
import {isDark, onColorChange} from './theme';

export type BackdropProperty = {
    color?: 'light' | 'dark';
    colorLight?: string;
    colorDark?: string;
    zIndex?: number;
    opacity?: number;
    onClick?(): any;
    transitionDuration?: number;
};

export const backdrop = (property: BackdropProperty = {}) => {
    const {
        colorLight = 'rgba(0, 0, 0, 0.6)',
        colorDark = 'rgba(0, 0, 0, 0.6)',
        zIndex = 9000,
        opacity = 0.8,
        onClick,
        transitionDuration = 250
    } = property;

    let count = 0;
    let isCreated = false;
    let backdrop: HTMLElement;

    const createBackdrop = () => {
        if (!isCreated) {
            backdrop = createElement({tag: 'div'});
            backdrop.style.position = 'fixed';
            backdrop.style.top = '0';
            backdrop.style.left = '0';
            backdrop.style.width = '100vw';
            backdrop.style.height = '100vh';
            backdrop.style.zIndex = String(zIndex);
            backdrop.style.transition = `all ${transitionDuration}ms`;
            backdrop.style.transitionDuration = String(transitionDuration);
            backdrop.style.opacity = '0';
            requestAnimationFrame(() => { backdrop.style.opacity = String(opacity); });
            backdrop.style.backgroundColor = isDark() ? colorDark : colorLight;
            onColorChange(event => {
                backdrop.style.backgroundColor = event.matches
                    ? colorDark
                    : colorLight;
            });
            document.body.append(backdrop);
            if (onClick) backdrop.addEventListener('click', onClick);
            isCreated = true;
        }
    };
    const removeBackdrop = () => {
        if (isCreated) {
            backdrop.style.opacity = '0';
            setTimeout(() => backdrop.remove(), transitionDuration);
            isCreated = false;
        }
    };
    return {
        add() {
            if (++count === 1) {
                createBackdrop();
            }
        },
        remove() {
            if (--count === 0) {
                removeBackdrop();
            }
        },
        clear() {
            if (count !== 0) {
                count = 0;
                removeBackdrop();
            }
        }
    };
};
