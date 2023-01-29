import { backdrop, createButton } from '@/component';
import { Backdrop } from '@/types';
import { numberToPixel } from '@/util';
import { animate } from 'motion';
import { DrawerModel } from '../model';

class DrawerImpl extends DrawerModel {
    backdrop: Backdrop | undefined;

    override onCreate(): void {
        const { buttons } = this.props;
        const btnGroup = this.element.querySelector('.ringo-drawer-btns');
        const onClose = this.onClose.bind(this);
        for (const button of buttons) {
            btnGroup?.append(createButton(button, onClose));
        }
    }

    override onAppend(): void {
        const {
            position = 'right',
            width = 300,
            clickBackdropClose = true,
            transitionDuration = 300,
            withBackdrop = true,
            zIndex = 10_000
        } = this.props;
        this.stlx.width(numberToPixel(width)).zIndex(zIndex);
        this.element.style[position] = numberToPixel(-width);
        animate(this.element, { [`${position}`]: 0 });
        const onClose = this.onClose.bind(this);
        this.backdrop = backdrop({
            onClick: clickBackdropClose ? onClose : () => {},
            transitionDuration
        });
        if (withBackdrop) this.backdrop.add();
        this.element
            .querySelector('.ringo-drawer-close')
            ?.addEventListener('click', onClose);
    }

    override onClose(): void {
        const {
            position = 'right',
            width = 300,
            transitionDuration = 300,
            withBackdrop = true,
            onClose
        } = this.props;
        onClose?.();
        if (withBackdrop) this.backdrop?.remove();
        animate(
            this.element,
            { [`${position}`]: numberToPixel(-width) },
            { duration: transitionDuration / 1000 }
        );
        setTimeout(() => this.element.remove(), transitionDuration);
    }
}

export default DrawerImpl;
