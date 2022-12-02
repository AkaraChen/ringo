import {createElement, setOnClick, useHTML} from './dom';
import {Height, useHeight} from './height';

const height = new Height();

type NoticeProperties = {
    text: string,
    marginTop?: number,
    type?: 'info' | 'warning' | 'error' | 'success',
    duration?: number,
    onClick?: (element: HTMLElement) => any;
    onClose?: () => any;
    zIndex?: number;
    transitionDuration?: number;
    dangerouslyUseHTML?: boolean;
}

function createNoticeElement({text, type, dangerouslyUseHTML}: NoticeProperties) {
    return createElement({
        tag: 'div',
        className: `ringo-notice ringo-notice-${type || 'info'}`,
        child: createElement({
            tag: 'p',
            className: 'ringo-notice-content',
            child: dangerouslyUseHTML ? useHTML(text!) : text
        })
    });
}

export function notice(property: NoticeProperties) {
    const {
        marginTop = 12, duration = 3000, onClick, zIndex = 10_000,
        transitionDuration = 300, onClose
    } = property;
    const element = createNoticeElement(property);
    document.body.append(element);
    element.style.top = `${-element.offsetHeight}px`;
    element.style.left = `calc(50vw - ${element.offsetWidth / 2}px)`;
    useHeight(element, transitionDuration);
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
