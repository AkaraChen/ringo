import {createElement} from './dom';
import {isDark, onColorChange} from './theme';

export type BackdropProperties = {
    color?: 'light' | 'dark';
    colorLight?: string;
    colorDark?: string;
    zIndex?: number;
    opacity?: number;
    onClick?(): any;
    transitionDuration?: number;
};

export const backdrop = (property: BackdropProperties = {}) => {
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
    let backdropElement: HTMLElement;

    const createBackdrop = () => {
        if (!isCreated) {
            backdropElement = createElement({tag: 'div'});
            backdropElement.style.position = 'fixed';
            backdropElement.style.top = '0';
            backdropElement.style.left = '0';
            backdropElement.style.width = '100vw';
            backdropElement.style.height = '100vh';
            backdropElement.style.zIndex = String(zIndex);
            backdropElement.style.transition = `all ${transitionDuration}ms`;
            backdropElement.style.transitionDuration = String(transitionDuration);
            backdropElement.style.opacity = '0';
            requestAnimationFrame(() => { backdropElement.style.opacity = String(opacity); });
            backdropElement.style.backgroundColor = isDark() ? colorDark : colorLight;
            onColorChange(event => {
                backdropElement.style.backgroundColor = event.matches
                    ? colorDark
                    : colorLight;
            });
            document.body.append(backdropElement);
            if (onClick) backdropElement.addEventListener('click', onClick);
            isCreated = true;
        }
    };
    const removeBackdrop = () => {
        if (isCreated) {
            backdropElement.style.opacity = '0';
            setTimeout(() => backdropElement.remove(), transitionDuration);
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
