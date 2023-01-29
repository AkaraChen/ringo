import { BaseModel } from '@/base';
import { Instance } from '@/util';
import { NoticeProperties } from '@/types';

export class NoticeModel extends BaseModel {
    props: NoticeProperties;

    heightTarget: Instance | undefined;

    constructor(element: HTMLElement, properties: NoticeProperties) {
        super(element);
        this.props = properties;
    }
}