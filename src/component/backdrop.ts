import { createElement, isDark, onColorChange } from '@/util';
import { stlx } from 'stlx';

export type BackdropProperties = {
    color?: 'light' | 'dark';
    colorLight?: string;
    colorDark?: string;
    zIndex?: number;
    opacity?: number;
    onClick?(): any;
    transitionDuration?: number;
};

export type Backdrop = ReturnType<typeof backdrop>;

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
            backdropElement = createElement({ tag: 'div' });
            stlx(backdropElement)
                .position('fixed')
                .top('0')
                .left('0')
                .width('100vw')
                .height('100vh')
                .zIndex('' + zIndex)
                .transition('all', `${transitionDuration}ms`)
                .opacity('0');
            requestAnimationFrame(() => {
                backdropElement.style.opacity = '' + opacity;
            });
            stlx(backdropElement).backgroundColor(
                isDark() ? colorDark : colorLight
            );
            onColorChange(event => {
                stlx(backdropElement).backgroundColor(
                    event.matches ? colorDark : colorLight
                );
            });
            document.body.append(backdropElement);
            if (onClick) backdropElement.addEventListener('click', onClick);
            isCreated = true;
        }
    };
    const removeBackdrop = () => {
        if (isCreated) {
            stlx(backdropElement).opacity('0');
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
