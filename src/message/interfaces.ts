import { BaseModel } from '@/base';
import type { Instance } from '@/util';

export interface MessageProperties {
    type?: 'success' | 'info' | 'error' | 'warning';
    text: string;
    title?: string;
    duration?: number;
    onClick?: (element?: HTMLElement) => any;
    showClose?: boolean;
    onClose?: () => any;
    marginTop?: number;
    marginRight?: number;
    width?: number;
    zIndex?: number;
    transitionDuration?: number;
    model?: typeof MessageModel;
    dangerouslyUseHTML?: boolean;
}

export class MessageModel extends BaseModel {
    props: MessageProperties;

    heightTarget: Instance | undefined;

    constructor(element: HTMLElement, properties: MessageProperties) {
        super(element);
        this.props = properties;
    }

    onClose() {}
}
