/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable unicorn/consistent-destructuring */
import {nanoid} from 'nanoid';
import {addToDocument, removeFromDocument} from '../dom';
import {num2px as number2px, px2num as px2number} from './style';

export type Instance = {
    id: string;
    target: HTMLElement;
    height: number;
    marginTop: number;
};
export class Height {
    private instanceList: Instance[] = [];

    addInstance = (target: HTMLElement, marginTop: number) => {
        addToDocument(target);
        const id = nanoid();
        this.instanceList.push({
            id,
            target: target,
            height: target.offsetHeight,
            marginTop
        });
        target.style.top = number2px(this.currHeight() - target.offsetHeight);
        return id;
    };

    removeInstance = (id: string) => {
        const index = this.instanceList.findIndex(item => item.id === id);
        const instance = this.instanceList[index];
        const {height, marginTop} = instance;
        this.instanceList.splice(index, 1);
        removeFromDocument(instance.target);
        for (let index_ = index; index_ <= this.instanceList.length - 1; index_++) {
            const instance = this.instanceList[index_];
            instance.target.style.top = number2px(
                px2number(instance.target.style.top) - height - marginTop
            );
        }
    };

    currHeight = () => {
        let count = 0;
        for (const item of this.instanceList) {
            const {height, marginTop} = item;
            count += height + marginTop;
        }
        return count;
    };
}
