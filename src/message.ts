import {createElement, addToDocument, removeFromDocument} from './dom';
import {nanoid} from 'nanoid';

const instances: Array<{id: string; target: HTMLElement; height: number}> = [];

export const message = (prop: props) => {
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
    } = prop;

    const removeInstance = (id: string) => {
        const index = instances.findIndex((item) => item.id === id);
        const removeHeight = marginTop + instances[index].height;
        if (instances[index + 1]) {
            for (let i = index + 1; i <= instances.length - 1; i++) {
                const {target} = instances[i];
                const currTop = Number(target.style.top.slice(0, -2));
                target.style.top = `${currTop - removeHeight}px`;
            }
        }
        instances.splice(index, 1);
    };

    const currHeight = () => {
        let count = marginTop;
        instances.forEach((item) => (count += item.height + marginTop));
        return count;
    };

    const id = nanoid();

    const message = createElement('div', 'ringo-message', [
        createElement('h3', 'ringo-message-head', title),
        createElement('p', 'ringo-message-content', text),
    ]);

    message.style.width = `${width}px`;
    message.classList.add(`ringo-message-${type}`);

    const close = () => {
        message.style.right = `-${width}px`;
        if (onClose) onClose();
        removeInstance(id);
        setTimeout(() => {
            removeFromDocument(message);
        }, 250);
    };

    if (showClose || duration === 0) {
        const closeButton = createElement('i', 'ringo-message-close');
        closeButton.addEventListener('click', close);
        message.appendChild(closeButton);
    }

    if (onClick) message.addEventListener('click', () => onClick(message));
    addToDocument(message);
    setTimeout(() => (message.style.right = `${marginRight}px`));
    if (duration != 0) setTimeout(close, duration);
    message.style.top = `${currHeight()}px`;
    instances.push({id, target: message, height: message.offsetHeight});
};

type props = {
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
};
