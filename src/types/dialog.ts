import { DialogModel } from '@/dialog/model';
import { Button } from '@/types';

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
