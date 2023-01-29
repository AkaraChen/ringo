import { pixelToNumber, numberToPixel } from './style';
import { animate } from 'motion';

export interface Instance {
    target: HTMLElement;
    marginTop: number;
}

export class Height {
    list: Instance[] = [];

    getHeight() {
        let count = 0;
        for (const instance of this.list) {
            count += instance.target.offsetHeight;
            count += instance.marginTop;
        }
        return count;
    }

    add(instance: Instance) {
        const { target, marginTop } = instance;
        const height = this.getHeight() + marginTop;
        target.dispatchEvent(new CustomEvent('ringotop', { detail: height }));
        this.list.push(instance);
    }

    remove(instance: Instance, setTop = true) {
        const { target, marginTop } = instance;
        const height = target.offsetHeight + marginTop;
        if (setTop) {
            target.dispatchEvent(
                new CustomEvent('ringotop', { detail: -height })
            );
        }
        const index = this.list.indexOf(instance);
        if (index !== -1) {
            for (const item of this.list.slice(index + 1)) {
                const element = item.target;
                const currentHeight = pixelToNumber(element.style.top);
                element.dispatchEvent(
                    new CustomEvent('ringotop', {
                        detail: currentHeight - height
                    })
                );
            }
        }
        this.list.splice(index, 1);
    }
}

export const useHeight = (
    element: HTMLElement,
    transitionDuration?: number
) => {
    element.addEventListener('ringotop', event => {
        const top = numberToPixel((event as CustomEvent).detail);
        animate(
            element,
            { top },
            {
                easing: 'ease-in-out',
                duration: (transitionDuration || 300) / 1000
            }
        );
    });
};
