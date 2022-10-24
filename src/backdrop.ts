import {addToDocument, createElement, removeFromDocument} from './dom';
import {isDark, onColorChange} from './util/color';

export const backdrop = (prop: BackdropProp = {}) => {
    const {
        colorLight = 'rgba(0, 0, 0, 0.6)',
        colorDark = 'rgba(0, 0, 0, 0.6)',
        zIndex = 9000,
        opacity = 0.8,
        onClick,
        transitionDuration = 250,
    } = prop;

    let count = 0;
    let isCreated = false;
    let backdrop: HTMLElement;

    const createBackdrop = () => {
        if (!isCreated) {
            backdrop = createElement('div');
            backdrop.style.position = 'fixed';
            backdrop.style.top = '0';
            backdrop.style.left = '0';
            backdrop.style.width = '100vw';
            backdrop.style.height = '100vh';
            backdrop.style.zIndex = String(zIndex);
            backdrop.style.transition = 'opacity 0.5s';
            backdrop.style.transitionDuration = String(transitionDuration);
            backdrop.style.opacity = '0';
            setTimeout(() => (backdrop.style.opacity = String(opacity)));

            backdrop.style.backgroundColor = isDark() ? colorDark : colorLight;
            onColorChange((e) => {
                backdrop.style.backgroundColor = e.matches
                    ? colorDark
                    : colorLight;
            });
            addToDocument(backdrop);

            if (onClick) backdrop.addEventListener('click', onClick);

            isCreated = true;
        }
    };

    const removeBackdrop = () => {
        if (isCreated) {
            backdrop.style.opacity = '0';
            setTimeout(() => removeFromDocument(backdrop), transitionDuration);
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
        },
    };
};

export type BackdropProp = {
    color?: 'light' | 'dark';
    colorLight?: string;
    colorDark?: string;
    zIndex?: number;
    opacity?: number;
    onClick?(): any;
    transitionDuration?: number;
};
