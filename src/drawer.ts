import {backdrop} from './backdrop';
import {
    addToDocument,
    createElement,
    parseHTMLString,
    removeFromDocument
} from './dom';
import float from './util/float';

export type DrawerProperty = {
    width?: string;
    zIndex?: number;
    withBackdrop?: boolean;
    position?: 'left' | 'right';
    transitionDuration?: number;
    title?: string;
    showClose?: boolean;
    onClose?(): void;
    content?: string;
    primaryButton?: Button;
    secondaryButton?: Button;
    dangerouslyUseHTML?: boolean;
    clickBackdropClose?: boolean;
};

export const drawer = (property: DrawerProperty) => {
    const {
        width = '300px',
        zIndex = 10_000,
        withBackdrop = true,
        position = 'right',
        transitionDuration = 250,
        title,
        showClose = true,
        onClose,
        content,
        primaryButton,
        secondaryButton,
        dangerouslyUseHTML = false,
        clickBackdropClose = true
    } = property;

    const drawer = createElement('div', 'ringo-drawer');

    const head = createElement('div', 'ringo-drawer-head', [
        createElement('h2', 'ringo-drawer-title', title)
    ]);
    if (showClose) {
        const closeButton = createElement('i', 'ringo-drawer-close');
        head.append(closeButton);
        closeButton.addEventListener('click', close);
    }
    drawer.append(head);

    const child = dangerouslyUseHTML && content !== undefined
        ? parseHTMLString(content)
        : content || '';

    const contentBox = createElement('div', 'ringo-drawer-content', child);
    drawer.append(contentBox);

    const ButtonGroup = createElement('div', 'ringo-drawer-btns');

    function createButton(property_: Button) {
        const button = createElement('button', 'ringo-drawer-button', property_.text);
        button.addEventListener('click', () => property_.onClick(close));
        if (property_.close) button.addEventListener('click', close);
        return button;
    }

    if (primaryButton) {
        const button = createButton(primaryButton);
        button.classList.add('ringo-drawer-button-primary');
        ButtonGroup.append(button);
    }

    if (secondaryButton) {
        const button = createButton(secondaryButton);
        ButtonGroup.append(button);
    }

    drawer.append(ButtonGroup);

    float(drawer, zIndex, transitionDuration);
    drawer.style.width = width;
    drawer.style.height = '100vh';
    drawer.style.top = '0';

    drawer.style[position] = '-' + width;
    setTimeout(() => { drawer.style[position] = '0'; }, 15);
    addToDocument(drawer);

    const Backdrop = backdrop({
        onClick: clickBackdropClose ? close : () => {},
        transitionDuration
    });

    function close() {
        if (onClose) onClose();
        if (withBackdrop) Backdrop.remove();
        drawer.style[position] = '-' + width;
        setTimeout(() => {
            removeFromDocument(drawer);
        }, transitionDuration);
    }

    if (withBackdrop) Backdrop.add();
};

export type Button = {
    text: string;
    // eslint-disable-next-line no-unused-vars
    onClick(closeFunction: () => void): any;
    close?: true;
};
