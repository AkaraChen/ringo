import { createElement } from './dom';
import { animate, spring } from 'motion';
import { Button, createButton } from './button';
import { when } from './util';
import { numberToPixel } from './style';
import { backdrop } from './backdrop';

type DialogProperties = {
    title: string;
    withBackdrop?: boolean;
    width?: number;
    zIndex?: number;
    transitionDuration?: number;
    clickBackdropClose?: boolean;
    text: string;
    showClose?: boolean;
    buttons?: Button[]
    form?: HTMLFormElement;
}

const createDialogElement = ({
    title, showClose, text, form,
    buttons = [
        { text: 'Yes', onClick: close => close(), primary: true },
        { text: 'No', onClick: close => close() }
    ]
}: DialogProperties, close: () => any) => {
    return createElement({
        className: 'ringo-dialog',
        child: [createElement({
            className: 'ringo-dialog-head',
            child: [
                createElement({
                    tag: 'p',
                    className: 'ringo-dialog-title',
                    child: title
                }),
                when(
                    showClose,
                    createElement({
                        tag: 'i',
                        className: 'ringo-dialog-close',
                        onClick: close
                    })
                )
            ]
        }),
        createElement({
            className: 'ringo-dialog-body',
            child: [text, when(form)]
        }),
        createElement({
            className: 'ringo-dialog-btns',
            child: when(buttons, () => buttons!.map(button => createButton(button, close)))
        })]
    });
};

export const dialog = (property: DialogProperties) => {
    const {
        width = 350, zIndex = 10_000, transitionDuration = 300,
        withBackdrop = true, clickBackdropClose = true
    } = property;
    const element = createDialogElement(property, close);
    document.body.append(element);
    element.style.zIndex = String(zIndex);
    element.style.width = numberToPixel(width);
    element.style.top = `calc(40vh - ${element.offsetHeight / 2}px)`;
    element.style.left = `calc(50vw - ${element.offsetWidth / 2}px)`;
    element.style.opacity = '0';
    animate(element, { opacity: 1 }, { duration: transitionDuration / 1000 });
    const Backdrop = backdrop({ onClick: when(clickBackdropClose, () => close) });
    if (withBackdrop) Backdrop.add();
    function close() {
        if (withBackdrop) Backdrop.remove();
        animate(element, {
            opacity: 0
        }, { easing: spring(), duration: transitionDuration / 1000 });
        setTimeout(() => {
            element.remove();
        }, transitionDuration);
    }
};
