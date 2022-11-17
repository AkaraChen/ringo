import {backdrop} from './backdrop';
import {addToDocument, createElement, removeFromDocument} from './dom';
import float from './util/float';
import {Btn as Button} from './drawer';

export type DialogProperty = {
    title: string;
    withBackdrop?: boolean;
    width?: string;
    zIndex?: number;
    transitionDuration?: number;
    clickBackdropClose?: boolean;
    text: string;
    showClose?: boolean;
    primaryButton?: Button;
    secondaryButton?: Button;
    form?: HTMLFormElement;
};

export const dialog = (property: DialogProperty) => {
    const {
        title,
        withBackdrop = true,
        width = '300px',
        zIndex = 10_000,
        transitionDuration = 250,
        clickBackdropClose = true,
        text,
        showClose = true,
        primaryButton,
        secondaryButton,
        form
    } = property;
    const dialog = createElement('div', 'ringo-dialog') as HTMLDialogElement;
    const head = createElement(
        'div',
        'ringo-dialog-head',
        createElement('h2', 'ringo-dialog-title', title)
    );
    if (showClose) {
        const closeButton = createElement('i', 'ringo-dialog-close');
        closeButton.addEventListener('click', close);
        head.append(closeButton);
    }
    dialog.append(head);

    const body = createElement('div', 'ringo-dialog-body', text);
    if (form) {
        body.append(form);
    }
    dialog.append(body);

    const ButtonGroup = createElement('div', 'ringo-dialog-btns');

    function createButton(property_: Button) {
        const button = createElement('button', 'ringo-dialog-button', property_.text);
        button.addEventListener('click', () => property_.onClick(close));
        if (property_.close) button.addEventListener('click', close);
        return button;
    }

    if (primaryButton) {
        const button = createButton(primaryButton);
        button.classList.add('ringo-dialog-button-primary');
        ButtonGroup.append(button);
    }

    if (secondaryButton) {
        const button = createButton(secondaryButton);
        ButtonGroup.append(button);
    }

    dialog.append(ButtonGroup);

    float(dialog, zIndex, transitionDuration);
    dialog.style.width = width;
    dialog.style.transition = 'opacity 0.5s';
    dialog.style.opacity = '0';
    addToDocument(dialog);
    setTimeout(() => { dialog.style.opacity = '1'; }, 15);
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
