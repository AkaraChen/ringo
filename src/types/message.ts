import { MessageModel } from '../message/model';

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
    dangerouslyUseHTML?: boolean
}
