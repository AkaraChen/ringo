import {createElement, parseHTMLString} from './dom';
import {Height} from './util/height';
import {num2px as number2px} from './util/style';
import float from './util/float';

const height = new Height();

export const notice = (property: NoticeProperty) => {
    const {
        type = 'info',
        text,
        duration = 3000,
        onClick,
        onClose,
        marginTop = 20,
        zIndex = 10_000,
        transitionDuration = 250,
        dangerouslyUseHTML = false
    } = property;

    const notice = createElement('div', 'ringo-notice');

    const content = createElement('p', 'ringo-notice-content');

    if (dangerouslyUseHTML) {
        for (const node of parseHTMLString(text)) {
            content.append(node);
        }
    } else {
        content.append(document.createTextNode(text));
    }

    notice.append(content);

    float(notice, zIndex, transitionDuration);
    notice.classList.add(`ringo-notice-${type}`);
    notice.style.top = number2px(-notice.offsetHeight);

    if (onClick) notice.addEventListener('click', () => onClick(notice));

    let isClosed = false;

    function close() {
        if (!isClosed) {
            if (onClose) onClose();
            setTimeout(() => height.removeInstance(id), transitionDuration);
            isClosed = true;
        }

        notice.style.top = number2px(-notice.offsetHeight);
    }

    const id = height.addInstance(notice, marginTop);
    notice.style.left = `calc(50vw - ${number2px(notice.offsetWidth / 2)})`;
    setTimeout(close, duration);
};

export type NoticeProperty = {
    type?: 'success' | 'info' | 'error' | 'warning';
    text: string;
    duration?: number;
    onClick?: (element?: HTMLElement) => any;
    onClose?: () => any;
    marginTop?: number;
    zIndex?: number;
    transitionDuration?: number;
    dangerouslyUseHTML?: boolean;
};
