import { BaseModel } from '@/base';
import { DialogProperties } from './interfaces';

export class DialogModel extends BaseModel {
    props: DialogProperties;

    constructor(element: HTMLElement, properties: DialogProperties) {
        super(element);
        this.props = properties;
    }

    onClose() {}
}
