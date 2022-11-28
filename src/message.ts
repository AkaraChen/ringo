import {createElement, setOnClick, useHTML} from './dom';
import {animate, spring} from 'motion';
import {Height, useHeight} from './height';
import {numberToPixel} from './style';

const height = new Height();

type MessageProperties = {
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
}

function createMessageElement({
    type = 'info', text, title = type, dangerouslyUseHTML, duration, showClose = duration === 0
}: MessageProperties, close: () => void) {
    return createElement({
        tag: 'div',
        className: `ringo-message ringo-message-${type}`,
        child: [createElement({
            tag: 'h3',
            className: 'ringo-message-head',
            child: createElement({
                tag: 'div',
                className: 'ringo-message-title',
                child: title
            })
        }),
        createElement({
            tag: 'p',
            className: 'ringo-message-content',
            child: dangerouslyUseHTML ? useHTML(text!) : text!
        }),
        createElement({
            tag: 'i',
            className: `ringo-message-close ringo-message-close-${showClose}`,
            onClick: close
        })]
    });
}

export function message(property: MessageProperties) {
    const element = createMessageElement(property, close);
    document.body.append(element);
    const {
        width = 300, marginRight = 20, marginTop = 10,
        transitionDuration = 300, onClick, duration = 3000,
        zIndex = 10_000, onClose
    } = property;
    element.style.width = numberToPixel(width);
    element.style.right = numberToPixel(-element.offsetWidth);
    element.style.zIndex = String(zIndex);
    animate(element, {right: numberToPixel(marginRight)}, {easing: spring()});
    element.style.top = numberToPixel(height.getHeight() + marginRight);
    const target = {target: element, marginTop};
    height.add(target);
    function close() {
        height.remove(target, false);
        animate(element, {right: numberToPixel(-element.offsetWidth)});
        setTimeout(() => element.remove(), transitionDuration);
        if (onClose) onClose();
    }
    useHeight(element, transitionDuration);
    setOnClick(element, onClick);
    if (duration) setTimeout(close, duration);
}
