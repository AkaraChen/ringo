import { Button } from '@/component/button';
import { DialogModel } from '@/model/dialog';

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
