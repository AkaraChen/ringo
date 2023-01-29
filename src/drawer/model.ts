import { BaseModel } from '@/base';
import { DrawerProperties } from './type';

export class DrawerModel extends BaseModel {
    props: DrawerProperties;

    constructor(element: HTMLElement, properties: DrawerProperties) {
        super(element);
        this.props = properties;
    }

    onClose() {}
}
