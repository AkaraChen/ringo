import {backdrop} from './backdrop';
import {addToDocument, createElement} from './dom';

export const drawer = (prop: DrawerProp) => {
    const {width = '300px', zIndex = 10000, withBackdrop = true} = prop;
    const drawer = createElement('div', 'ringo-drawer');
    drawer.style.position = 'fixed';
    drawer.style.width = width;
    drawer.style.height = '100vh';
    drawer.style.top = '0';
    drawer.style.zIndex = String(zIndex);
    drawer.style.transition = 'left 1s';
    addToDocument(drawer);
    drawer.style.left = '-' + width;
    console.log(drawer.style.left);
    drawer.style.left = '0';
    const Backdrop = backdrop();
    if (withBackdrop) Backdrop.add();
};

export type DrawerProp = {
    width?: string;
    zIndex?: number;
    withBackdrop?: boolean;
};
