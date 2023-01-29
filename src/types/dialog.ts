import { Button } from '@/types';
import { DialogModel } from '@/dialog/model';

export interface DialogProperties {
    title: string;
    withBackdrop?: boolean;
    width?: number;
    zIndex?: number;
    transitionDuration?: number;
    clickBackdropClose?: boolean;
    text: string;
    showClose?: boolean;
    buttons?: Button[];
    form?: HTMLFormElement;
    model?: typeof DialogModel;
}
