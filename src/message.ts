import {createElement, parseHTMLString} from './dom';
import {Height} from './util/height';
import {num2px} from './util/style';
import float from './util/float';

const height = new Height();

export const message = (prop: MessageProps) => {
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
        zIndex = 10000,
        transitionDuration = 250,
        dangerouslyUseHTML = false,
    } = prop;

    const message = createElement('div', `ringo-message`, [
        createElement('h3', 'ringo-message-head', title),
    ]);

    const content = createElement('p', 'ringo-message-content');

    if (dangerouslyUseHTML) {
        for (const node of parseHTMLString(text)) {
            content.appendChild(node);
        }
    } else {
        content.appendChild(document.createTextNode(text));
    }

    message.appendChild(content);

    float(message, zIndex, transitionDuration);
    message.style.width = num2px(width);
    message.style.right = num2px(-width);
    message.classList.add(`ringo-message-${type}`);

    if (onClick) message.addEventListener('click', () => onClick(message));
    if (showClose || duration === 0) {
        const closeButton = createElement('i', 'ringo-message-close');
        closeButton.addEventListener('click', close);
        message.appendChild(closeButton);
    }

    let isClosed = false;

    function close() {
        if (!isClosed) {
            message.style.right = num2px(-width);
            if (onClose) onClose();
            setTimeout(() => height.removeInstance(id), transitionDuration);
            isClosed = true;
        }
    }

    const id = height.addInstance(message, marginTop);

    setTimeout(() => (message.style.right = num2px(marginRight)));
    if (duration != 0) setTimeout(close, duration);
};

export type MessageProps = {
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
