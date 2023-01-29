import { BaseModel } from './base';
import { DrawerProperties } from '../types/drawer';

export class DrawerModel extends BaseModel {
    props: DrawerProperties;

    constructor(element: HTMLElement, properties: DrawerProperties) {
        super(element);
        this.props = properties;
    }

    onClose() {}
}
