import { backdrop, Backdrop } from '@/component';
import { createButton } from '@/component/button';
import { numberToPixel } from '@/util/style';
import { when } from '@/util/util';
import { animate, spring } from 'motion';
import { DialogModel } from '../dialog';

class DialogImpl extends DialogModel {
    backdrop: Backdrop | undefined;

    override onCreate(): void {
        const { buttons } = this.props;
        const btnGroup = this.element.querySelector('.ringo-dialog-btns');
        const onClose = this.onClose.bind(this);
        if (buttons) {
            for (const button of buttons) {
                btnGroup?.append(createButton(button, onClose));
            }
        }
    }

    override onAppend(): void {
        const {
            width = 350,
            zIndex = 10_000,
            transitionDuration = 300,
            withBackdrop = true,
            clickBackdropClose = true
        } = this.props;
        this.stlx
            .zIndex(zIndex)
            .width(numberToPixel(width))
            .top(`calc(40vh - ${this.element.offsetHeight / 2}px)`)
            .left(`calc(50vw - ${this.element.offsetWidth / 2}px)`)
            .opacity('0');
        animate(
            this.element,
            { opacity: 1 },
            { duration: transitionDuration / 1000 }
        );
        const onClose = this.onClose.bind(this);
        this.backdrop = backdrop({
            onClick: when(clickBackdropClose, onClose)
        });
        if (withBackdrop) this.backdrop.add();
    }

    override onClose(): void {
        const { transitionDuration = 300, withBackdrop = true } = this.props;
        if (withBackdrop) this.backdrop?.remove();
        animate(
            this.element,
            { opacity: 0 },
            { easing: spring(), duration: transitionDuration / 1000 }
        );
        setTimeout(() => this.element.remove(), transitionDuration);
    }
}

export default DialogImpl;
