import {createElement} from './dom';
import {isDark, onColorChange} from './util/color';

export const backdrop = (prop: BackdropProp = {}) => {
    const {
        colorLight = '#fff',
        colorDark = '#000',
        zIndex = 9000,
        opacity = 0.8,
        onClick,
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
            backdrop.style.opacity = String(opacity);

            backdrop.style.backgroundColor = isDark() ? colorDark : colorLight;
            onColorChange((e) => {
                backdrop.style.backgroundColor = e.matches
                    ? colorDark
                    : colorLight;
            });
            document.body.appendChild(backdrop);

            if (onClick) backdrop.addEventListener('click', onClick);

            isCreated = true;
        }
    };

    const removeBackdrop = () => {
        if (isCreated) {
            document.body.removeChild(backdrop);
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
};
