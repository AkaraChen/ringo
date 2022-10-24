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

    let child: Node[] | string;

    if (dangerouslyUseHTML && content != undefined) {
        child = parseHTMLString(content);
    } else {
        child = content || '';
    }
    if (child) {
        const box = createElement('div', 'ringo-drawer-content', child);
        drawer.appendChild(box);
    }

    const BtnGroup = createElement('div', 'ringo-drawer-btns');

    if (primaryButton) {
        const btn = createElement(
            'button',
            'ringo-drawer-button ringo-drawer-button-primary',
            primaryButton.text
        );
        btn.addEventListener('click', primaryButton.onClick);
        BtnGroup.appendChild(btn);
    }

    if (secondaryButton) {
        const btn = createElement(
            'button',
            'ringo-drawer-button',
            secondaryButton.text
        );
        btn.addEventListener('click', secondaryButton.onClick);
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

    const Backdrop = backdrop({onClick: close, transitionDuration});
    if (withBackdrop) Backdrop.add();
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
    primaryButton?: {text: string; onClick(): any};
    secondaryButton?: {text: string; onClick(): any};
    dangerouslyUseHTML?: boolean;
};
