import {createElement, parseHTMLString} from './dom';
import {Height} from './util/height';
import {num2px as number2px} from './util/style';
import float from './util/float';

const height = new Height();

export const message = (property: MessageProperty) => {
    const {
        type = 'info',
        text,
        title = type,
        duration = 5000,
        onClick,
        showClose = false,
        onClose,
        marginTop = 20,
        marginRight = 20,
        width = 300,
        zIndex = 10_000,
        transitionDuration = 250,
        dangerouslyUseHTML = false
    } = property;

    const message = createElement('div', 'ringo-message', [
        createElement('h3', 'ringo-message-head', [
            createElement('p', 'ringo-message-title', title)
        ])
    ]);

    const content = createElement('p', 'ringo-message-content');

    if (dangerouslyUseHTML) {
        for (const node of parseHTMLString(text)) {
            content.append(node);
        }
    } else {
        content.append(document.createTextNode(text));
    }

    message.append(content);

    float(message, zIndex, transitionDuration);
    message.style.width = number2px(width);
    message.style.right = number2px(-width);
    message.classList.add(`ringo-message-${type}`);

    if (onClick) message.addEventListener('click', () => onClick(message));
    if (showClose || duration === 0) {
        const closeButton = createElement('i', 'ringo-message-close');
        closeButton.addEventListener('click', close);
        message.append(closeButton);
    }

    let isClosed = false;

    function close() {
        if (!isClosed) {
            message.style.right = number2px(-width);
            if (onClose) onClose();
            setTimeout(() => height.removeInstance(id), transitionDuration);
            isClosed = true;
        }
    }

    const id = height.addInstance(message, marginTop);

    setTimeout(() => { message.style.right = number2px(marginRight); }, 15);
    if (duration !== 0) setTimeout(close, duration);
};

export type MessageProperty = {
    type?: 'success' | 'info' | 'error' | 'warning';
    text: string;
    title?: string;
    duration?: number;
    onClick?: (element?: HTMLElement) => any;
    showClose?: boolean;
    onClose?: () => any;
    marginTop?: number;
    marginRight?: number;
    width?: number;
    zIndex?: number;
    transitionDuration?: number;
    dangerouslyUseHTML?: boolean;
};
