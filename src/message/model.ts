import { BaseModel } from '@/base';
import type { Instance } from '@/util';
import { MessageProperties } from '@/types';

export class MessageModel extends BaseModel {
    props: MessageProperties;

    heightTarget: Instance | undefined;

    constructor(element: HTMLElement, properties: MessageProperties) {
        super(element);
        this.props = properties;
    }

    onClose() {}
}
