import {nanoid} from 'nanoid';
import {addToDocument, removeFromDocument} from '../dom';
import {num2px, px2num} from './style';

export class Height {
    private instanceList: Instance[] = [];

    addInstance = (target: HTMLElement, marginTop: number) => {
        addToDocument(target);
        const id = nanoid();
        this.instanceList.push({
            id,
            target: target,
            height: target.offsetHeight,
            marginTop,
        });
        target.style.top = num2px(this.currHeight() - target.offsetHeight);
        return id;
    };

    removeInstance = (id: string) => {
        const index = this.instanceList.findIndex((item) => item.id === id);
        const instance = this.instanceList[index];
        const {height, marginTop} = instance;
        this.instanceList.splice(index, 1);
        removeFromDocument(instance.target);
        for (let i = index; i <= this.instanceList.length - 1; i++) {
            const instance = this.instanceList[i];
            instance.target.style.top = num2px(
                px2num(instance.target.style.top) - height - marginTop
            );
        }
    };

    currHeight = () => {
        let count = 0;
        this.instanceList.forEach((item) => {
            const {height, marginTop} = item;
            count += height + marginTop;
        });
        return count;
    };
}

export type Instance = {
    id: string;
    target: HTMLElement;
    height: number;
    marginTop: number;
};
