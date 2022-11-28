import {createElement, useHTML} from './dom';
import {animate} from 'motion';
import {numberToPixel} from './style';
import {backdrop} from './backdrop';

export type Button = {
    text: string;
    onClick: (closeFunction: () => void) => any
    close?: boolean;
    primary?: boolean
};

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
}

const createButton = ({
    primary, text, onClick = () => {}, close
}: Button, closeFunction: () => any) => {
    return createElement({
        tag: 'button',
        className: `ringo-drawer-button ringo-button-primary-${primary || false}`,
        child: text,
        onClick: () => {
            onClick(closeFunction);
            if (close) closeFunction();
        }
    });
};

const createDrawerElement = (
    {
        title, content, dangerouslyUseHTML, buttons
    }: DrawerProperties,
    close: () => void
) => {
    const buttonList = [];
    for (const button of buttons) { buttonList.push(createButton(button, close)); }
    return createElement({
        className: 'ringo-drawer',
        child: [createElement({
            tag: 'div',
            className: 'ringo-drawer-head',
            child: [createElement({
                tag: 'h2',
                className: 'ringo-drawer-title',
                child: title
            }), createElement({
                tag: 'i',
                className: 'ringo-drawer-close',
                onClick: close
            })]
        }), createElement({
            className: 'ringo-drawer-content',
            child: dangerouslyUseHTML ? useHTML(content!) : content
        }), createElement({
            className: 'ringo-drawer-btns',
            child: buttonList
        })]
    });
};

export const drawer = (property: DrawerProperties) => {
    const element = createDrawerElement(property, close);
    document.body.append(element);
    const {
        position = 'right', width = 300,
        clickBackdropClose = true, transitionDuration = 300,
        withBackdrop = true, onClose, zIndex = 10_000
    } = property;
    element.style.width = numberToPixel(width);
    element.style.zIndex = String(zIndex);
    element.style[position] = numberToPixel(-width);
    animate(element, {[`${position}`]: 0});
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
            {[`${position}`]: numberToPixel(-width)},
            {duration: transitionDuration / 1000}
        );
        setTimeout(() => element.remove, transitionDuration);
    }
};
