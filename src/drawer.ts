import {backdrop} from './backdrop';
import {
    addToDocument,
    createElement,
    parseHTMLString,
    removeFromDocument,
} from './dom';

export const drawer = (prop: DrawerProp) => {
    const {
        width = '300px',
        zIndex = 10000,
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
        clickBackdropClose = true,
    } = prop;

    const drawer = createElement('div', 'ringo-drawer');

    const head = createElement('div', 'ringo-drawer-head', [
        createElement('h2', 'ringo-drawer-title', title),
    ]);
    if (showClose) {
        const closeBtn = createElement('i', 'ringo-drawer-close');
        head.appendChild(closeBtn);
        closeBtn.addEventListener('click', close);
    }
    drawer.appendChild(head);

    const child =
        dangerouslyUseHTML && content != undefined
            ? parseHTMLString(content)
            : content || '';

    const contentBox = createElement('div', 'ringo-drawer-content', child);
    drawer.appendChild(contentBox);

    const BtnGroup = createElement('div', 'ringo-drawer-btns');

    function createButton(prop: Btn) {
        const btn = createElement('button', 'ringo-drawer-button', prop.text);
        btn.addEventListener('click', () => prop.onClick(close));
        if (prop.close) btn.addEventListener('click', close);
        return btn;
    }

    if (primaryButton) {
        const btn = createButton(primaryButton);
        btn.classList.add('ringo-drawer-button-primary');
        BtnGroup.appendChild(btn);
    }

    if (secondaryButton) {
        const btn = createButton(secondaryButton);
        BtnGroup.appendChild(btn);
    }

    drawer.appendChild(BtnGroup);

    drawer.style.position = 'fixed';
    drawer.style.width = width;
    drawer.style.height = '100vh';
    drawer.style.top = '0';
    drawer.style.zIndex = String(zIndex);

    drawer.style.transition = 'all 0.25s';
    drawer.style[position] = '-' + width;
    setTimeout(() => (drawer.style[position] = '0'));
    addToDocument(drawer);

    function close() {
        if (onClose) onClose();
        Backdrop.remove();
        drawer.style[position] = '-' + width;
        setTimeout(() => {
            removeFromDocument(drawer);
        }, 250);
    }

    const Backdrop = backdrop({
        onClick: clickBackdropClose ? close : () => {},
        transitionDuration,
    });
    if (withBackdrop) Backdrop.add();

    return {
        close,
    };
};

export type DrawerProp = {
    width?: string;
    zIndex?: number;
    withBackdrop?: boolean;
    position?: 'left' | 'right';
    transitionDuration?: number;
    title?: string;
    showClose?: boolean;
    onClose?(): void;
    content?: string;
    primaryButton?: Btn;
    secondaryButton?: Btn;
    dangerouslyUseHTML?: boolean;
    clickBackdropClose?: boolean;
};

type Btn = {
    text: string;
    onClick(closeFn: () => void): any;
    close?: true;
};
