import { Button } from '@/component/button';
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
    dangerouslyUseHTML?: boolean;
    clickBackdropClose?: boolean;
    model?: typeof DrawerModel;
}
