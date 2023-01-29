import { BaseModel } from './base';
import { NoticeProperties } from '../types/notice';
import { Instance } from '../util/height';

export class NoticeModel extends BaseModel {
    props: NoticeProperties;

    heightTarget: Instance | undefined;

    constructor(element: HTMLElement, properties: NoticeProperties) {
        super(element);
        this.props = properties;
    }
}
