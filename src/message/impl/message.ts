import { Height, numberToPixel, setOnClick, useHeight } from '@/util';
import { animate, spring } from 'motion';
import { MessageModel } from '../interfaces';

const height = new Height();

class MessageImpl extends MessageModel {
    override onAppend() {
        const {
            width = 300,
            marginRight = 20,
            marginTop = 10,
            transitionDuration = 300,
            onClick,
            duration = 3000,
            zIndex = 10_000
        } = this.props;
        this.stlx
            .width(numberToPixel(width))
            .right(numberToPixel(-this.element.offsetWidth))
            .zIndex('' + zIndex);
        animate(
            this.element,
            { right: numberToPixel(marginRight) },
            { easing: spring() }
        );
        this.stlx.top(numberToPixel(height.getHeight() + marginRight));
        this.heightTarget = { target: this.element, marginTop };
        height.add(this.heightTarget);
        useHeight(this.element, transitionDuration);
        setOnClick(this.element, onClick);
        const onClose = this.onClose.bind(this);
        if (duration) setTimeout(onClose, duration);
        this.element
            .querySelector('.ringo-message-close')
            ?.addEventListener('click', onClose);
    }

    override onClose() {
        const { transitionDuration = 300, onClose } = this.props;
        height.remove(this.heightTarget!, false);
        animate(this.element, {
            right: numberToPixel(-this.element.offsetWidth)
        });
        setTimeout(() => this.element.remove(), transitionDuration);
        onClose?.();
    }
}

export default MessageImpl;
