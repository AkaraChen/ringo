import { NoticeModel } from '../model';
import NoticeInneiImpl from './innei';
import NoticeImpl from './notice';

export const modelMap: Record<string, typeof NoticeModel> = {
    notice: NoticeImpl,
    innei: NoticeInneiImpl
};

export const getModel = (model?: string | typeof NoticeModel) => {
    switch (typeof model) {
        case 'string': {
            if (model in modelMap) return modelMap[model];
            break;
        }
        case 'function': {
            return model;
        }
        default:
    }
    return NoticeImpl;
};
