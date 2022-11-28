import {createElement, setOnClick, useHTML} from './dom';
import {animate} from 'motion';
import {Height} from './height';
import {numberToPixel} from './style';

const height = new Height();

type NoticeProperties = {
    text: string,
    marginTop?: number,
    type: 'info' | 'warning' | 'error' | 'success',
    duration: number,
    onClick?: (element: HTMLElement) => any;
    onClose?: () => any;
    zIndex?: number;
    transitionDuration?: number;
    dangerouslyUseHTML?: boolean;
}

function createNoticeElement({text, type, dangerouslyUseHTML}: Partial<NoticeProperties>) {
    return createElement({
        tag: 'div',
        className: `ringo-notice ringo-notice-${type || 'info'}`,
        child: createElement({
            tag: 'p',
            className: 'ringo-notice-content',
            child: dangerouslyUseHTML ? useHTML(text!) : text!
        })
    });
}

export function notice(property: NoticeProperties) {
    const {
        marginTop = 12, duration = 3000, onClick, zIndex = 10_000,
        transitionDuration, onClose
    } = property;
    const element = createNoticeElement(property);
    document.body.append(element);
    element.style.top = `${-element.offsetHeight}px`;
    element.style.left = `calc(50vw - ${element.offsetWidth}px)`;
    element.addEventListener('ringotop', event => {
        const top = numberToPixel((event as CustomEvent).detail);
        animate(
            element,
            {top},
            {
                easing: 'ease-in-out',
                duration: (transitionDuration || 300) / 1000
            }
        );
    });
    const target = {target: element, marginTop};
    height.add(target);
    function close() {
        height.remove(target);
        setTimeout(() => element.remove(), transitionDuration);
        if (onClose) onClose();
    }
    setTimeout(close, duration);
    setOnClick(element, onClick);
    element.style.zIndex = zIndex.toString(10);
}
