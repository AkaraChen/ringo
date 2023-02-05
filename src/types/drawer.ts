import { Button } from '@/types';
import { DrawerModel } from '../drawer/model';

export interface DrawerProperties {
    width?: number;
    zIndex?: number;
    withBackdrop?: boolean;
    position?: 'left' | 'right';
    transitionDuration?: number;
    title?: string;
    showClose?: boolean;
    onClose?(): void;
    content?: string;
    buttons: Button[];
    clickBackdropClose?: boolean;
    model?: typeof DrawerModel;
    dangerouslyUseHTML?: boolean
}
