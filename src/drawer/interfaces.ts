import { Button } from '@/component/interfaces';
import { DrawerModel } from './model';

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
    dangerouslyUseHTML?: boolean;
}
