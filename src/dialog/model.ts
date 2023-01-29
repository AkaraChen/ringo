import { DialogProperties } from '@/types';
import { BaseModel } from '@/base';

export class DialogModel extends BaseModel {
    props: DialogProperties;

    constructor(element: HTMLElement, properties: DialogProperties) {
        super(element);
        this.props = properties;
    }

    onClose() {}
}
