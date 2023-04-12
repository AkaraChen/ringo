import { Height, numberToPixel, setOnClick } from '@/util';
import { NoticeModel } from '../model';

const height = new Height();

class NoticeInneiImpl extends NoticeModel {
    innerElement!: HTMLElement;

    override onCreate() {
        this.innerElement = this.element.children[0] as HTMLElement;
        this.innerElement.classList.add('ringo-innei-notice-enter');
    }

    override onAppend() {
        const {
            marginTop = 12,
            duration = 3000,
            onClick,
            zIndex = 10_000,
            transitionDuration = 300,
            onClose
        } = this.props;
        this.stlx.top(numberToPixel(height.getHeight() + marginTop));
        this.heightTarget = { target: this.element, marginTop };
        height.add(this.heightTarget);
        setOnClick(this.element, onClick);
        setTimeout(() => {
            this.innerElement.classList.add('ringo-innei-notice-leave');
            height.remove(this.heightTarget!);
            setTimeout(() => this.element.remove(), transitionDuration);
            onClose?.();
        }, duration);
        this.stlx.zIndex(zIndex);
        setOnClick(this.element, onClick);
    }
}

export default NoticeInneiImpl;
