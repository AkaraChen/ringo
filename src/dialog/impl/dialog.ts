import { backdrop, createButton } from '@/component';
import { Backdrop } from '@/types';
import { numberToPixel, when } from '@/util';
import { animate, spring } from 'motion';
import { DialogModel } from '../model';

class DialogImpl extends DialogModel {
    backdrop: Backdrop | undefined;

    override onCreate(): void {
        const {
            buttons = [
                {
                    text: 'Yes',
                    close: true,
                    primary: true
                },
                {
                    text: 'No',
                    close: true
                }
            ]
        } = this.props;
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
            transitionDuration = 300,
            withBackdrop = true,
            clickBackdropClose = true,
            width = 350,
            zIndex = 10_000
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
            { duration: transitionDuration / 1000, easing: spring() }
        );
        const onClose = this.onClose.bind(this);
        this.backdrop = backdrop({
            onClick: when(clickBackdropClose, () => onClose)
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
