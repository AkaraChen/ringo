import {addToDocument, createElement} from './dom';

export const drawer = (prop: DrawerProp) => {
    const {width} = prop;
    const drawer = createElement('div', 'ringo-drawer');
    drawer.style.position = 'fixed';
    drawer.style.width = width;
    drawer.style.height = '100vh';
    drawer.style.left = '0';
    drawer.style.top = '0';
    drawer.style.zIndex = '10000';
    addToDocument(drawer);
};

export type DrawerProp = {
    width: string;
};
