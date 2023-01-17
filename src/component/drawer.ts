import { createElement, useHTML } from '../util/dom';
import { animate } from 'motion';
import { numberToPixel } from '../util/style';
import { backdrop } from './backdrop';
import { when } from '../util/util';
import { Button, createButton } from './button';
import { stlx } from 'stlx';

export type DrawerProperties = {
    width?: number;
    zIndex?: number;
    withBackdrop?: boolean;
    position?: 'left' | 'right';
    transitionDuration?: number;
    title?: string;
    showClose?: boolean;
    onClose?(): void;
    content?: string;
    buttons: Button[];
    dangerouslyUseHTML?: boolean;
    clickBackdropClose?: boolean;
};

const createDrawerElement = (
    { title, content, dangerouslyUseHTML, buttons }: DrawerProperties,
    close: () => void
) => {
    return createElement({
        className: 'ringo-drawer',
        child: [
            createElement({
                tag: 'div',
                className: 'ringo-drawer-head',
                child: [
                    createElement({
                        tag: 'h2',
                        className: 'ringo-drawer-title',
                        child: title
                    }),
                    createElement({
                        tag: 'i',
                        className: 'ringo-drawer-close',
                        onClick: close
                    })
                ]
            }),
            createElement({
                className: 'ringo-drawer-content',
                child: dangerouslyUseHTML ? useHTML(content!) : content
            }),
            createElement({
                className: 'ringo-drawer-btns',
                child: when(
                    buttons,
                    buttons.map(button => createButton(button, close))
                )
            })
        ]
    });
};

export const drawer = (property: DrawerProperties) => {
    const element = createDrawerElement(property, close);
    document.body.append(element);
    const {
        position = 'right',
        width = 300,
        clickBackdropClose = true,
        transitionDuration = 300,
        withBackdrop = true,
        onClose,
        zIndex = 10_000
    } = property;
    stlx(element)
        .width(numberToPixel(width))
        .zIndex('' + zIndex);
    element.style[position] = numberToPixel(-width);
    animate(element, { [`${position}`]: 0 });
    const Backdrop = backdrop({
        onClick: clickBackdropClose ? close : () => {},
        transitionDuration
    });
    if (withBackdrop) Backdrop.add();
    function close() {
        if (onClose) onClose();
        if (withBackdrop) Backdrop.remove();
        animate(
            element,
            { [`${position}`]: numberToPixel(-width) },
            { duration: transitionDuration / 1000 }
        );
        setTimeout(() => element.remove(), transitionDuration);
    }
};