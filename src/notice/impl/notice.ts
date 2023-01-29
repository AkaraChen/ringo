import { Height, setOnClick, useHeight } from '@/util';
import { NoticeModel } from '../model';

const height = new Height();

class NoticeImpl extends NoticeModel {
    override onAppend() {
        const {
            marginTop = 12,
            duration = 3000,
            onClick,
            zIndex = 10_000,
            transitionDuration = 300,
            onClose
        } = this.props;
        this.stlx.top(`${-this.element.offsetHeight}px`);
        useHeight(this.element, transitionDuration);
        this.heightTarget = { target: this.element, marginTop };
        height.add(this.heightTarget);
        setOnClick(this.element, onClick);
        setTimeout(() => {
            height.remove(this.heightTarget!);
            setTimeout(() => this.element.remove(), transitionDuration);
            onClose?.();
        }, duration);
        this.stlx.zIndex(zIndex);
        setOnClick(this.element, onClick);
    }
}

export default NoticeImpl;
