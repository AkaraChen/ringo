import {createElement} from './dom';
import {Height} from './util/height';
import {num2px} from './util/style';
import {once} from './util/function';
import float from './util/float';

const height = new Height();

export const notice = (prop: NoticeProps) => {
    const {
        type = 'info',
        text,
        duration = 3000,
        onClick,
        onClose,
        marginTop = 20,
        zIndex = 10000,
        transitionDuration = 250,
    } = prop;

    const notice = createElement('div', `ringo-notice`, [
        createElement('p', 'ringo-notice-content', text),
    ]);

    float(notice, zIndex, transitionDuration);
    notice.classList.add(`ringo-notice-${type}`);
    notice.style.top = num2px(-notice.offsetHeight);

    if (onClick) notice.addEventListener('click', () => onClick(notice));

    function close() {
        once(() => {
            notice.style.top = num2px(-notice.offsetHeight);
            if (onClose) onClose();
            setTimeout(() => height.removeInstance(id), transitionDuration);
        });
    }

    const id = height.addInstance(notice, marginTop);
    notice.style.left = `calc(50vw - ${num2px(notice.offsetHeight)})`;
    setTimeout(close, duration);
};

export type NoticeProps = {
    type?: 'success' | 'info' | 'error' | 'warning';
    text: string;
    duration?: number;
    onClick?: (element?: HTMLElement) => any;
    onClose?: () => any;
    marginTop?: number;
    zIndex?: number;
    transitionDuration?: number;
};
