import { BaseModel } from '@/base';
import { DialogProperties } from '@/types';

export class DialogModel extends BaseModel {
    props: DialogProperties;

    constructor(element: HTMLElement, properties: DialogProperties) {
        super(element);
        this.props = properties;
    }

    onClose() {}
}
