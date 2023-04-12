import type { NoticeModel } from './model';

export interface NoticeProperties {
    text: string;
    marginTop?: number;
    type?: 'info' | 'warning' | 'error' | 'success';
    duration?: number;
    onClick?: (element: HTMLElement) => any;
    onClose?: () => any;
    zIndex?: number;
    transitionDuration?: number;
    model?: typeof NoticeModel;
    dangerouslyUseHTML?: boolean;
}
