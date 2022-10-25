import {backdrop} from './backdrop';
import {addToDocument, createElement, removeFromDocument} from './dom';
import float from './util/float';
import {Btn} from './drawer';

export const dialog = (prop: DialogProp) => {
    const {
        title,
        withBackdrop = true,
        width = '300px',
        zIndex = 10000,
        transitionDuration = 250,
        clickBackdropClose = true,
        text,
        showClose = true,
        primaryButton,
        secondaryButton,
        form,
    } = prop;
    const dialog = createElement('div', 'ringo-dialog') as HTMLDialogElement;
    const head = createElement(
        'div',
        'ringo-dialog-head',
        createElement('h2', 'ringo-dialog-title', title)
    );
    if (showClose) {
        const closeBtn = createElement('i', 'ringo-dialog-close');
        closeBtn.addEventListener('click', close);
        head.appendChild(closeBtn);
    }
    dialog.appendChild(head);

    const body = createElement('div', 'ringo-dialog-body', text);
    if (form) {
        body.appendChild(form);
    }
    dialog.appendChild(body);

    const BtnGroup = createElement('div', 'ringo-dialog-btns');

    function createButton(prop: Btn) {
        const btn = createElement('button', 'ringo-dialog-button', prop.text);
        btn.addEventListener('click', () => prop.onClick(close));
        if (prop.close) btn.addEventListener('click', close);
        return btn;
    }

    if (primaryButton) {
        const btn = createButton(primaryButton);
        btn.classList.add('ringo-dialog-button-primary');
        BtnGroup.appendChild(btn);
    }

    if (secondaryButton) {
        const btn = createButton(secondaryButton);
        BtnGroup.appendChild(btn);
    }

    dialog.appendChild(BtnGroup);

    float(dialog, zIndex, transitionDuration);
    dialog.style.width = width;
    dialog.style.transition = 'opacity 0.5s';
    dialog.style.opacity = '0';
    addToDocument(dialog);
    setTimeout(() => (dialog.style.opacity = '1'), 15);
    dialog.style.top = `calc(50vh - ${dialog.offsetHeight / 2 + 50}px)`;
    dialog.style.left = `calc(50vw - ${dialog.offsetWidth / 2}px)`;

    const Backdrop = backdrop({onClick: clickBackdropClose ? close : () => {}});
    if (withBackdrop) Backdrop.add();
    function close() {
        if (withBackdrop) Backdrop.remove();
        dialog.style.opacity = '0';
        setTimeout(() => removeFromDocument(dialog), transitionDuration);
    }
};

export type DialogProp = {
    title: string;
    withBackdrop?: boolean;
    width?: string;
    zIndex?: number;
    transitionDuration?: number;
    clickBackdropClose?: boolean;
    text: string;
    showClose?: boolean;
    primaryButton?: Btn;
    secondaryButton?: Btn;
    form?: HTMLFormElement;
};
