import { BaseModel } from './base';
import { MessageProperties } from '../types/message';
import type { Instance } from '../util/height';

export class MessageModel extends BaseModel {
    props: MessageProperties;

    heightTarget: Instance | undefined;

    constructor(element: HTMLElement, properties: MessageProperties) {
        super(element);
        this.props = properties;
    }

    onClose() {}
}
