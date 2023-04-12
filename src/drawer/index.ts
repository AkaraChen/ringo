import { DrawerProperties } from './interfaces';
import { useHTML } from '@/util';
import DrawerImpl from './impl/drawer';
import { hasHTML } from '@/util';

const createDrawerElement = ({
    title,
    content,
    dangerouslyUseHTML = false
}: DrawerProperties) => {
    if (!dangerouslyUseHTML && hasHTML(content!))
        throw new Error(`Cannot use HTML.`);
    return useHTML(/* html */ `
      <div class="ringo-drawer">
          <div class="ringo-drawer-head">
            <h2 class="ringo-drawer-title">
                ${title}
            </h2>
            <i class="ringo-drawer-close"></i>
          </div>
          <div class="ringo-drawer-content">
            ${content}
          </div>
          <div class="ringo-drawer-btns"></div>
      </div>
    `)[0];
};

export const drawer = (property: DrawerProperties) => {
    const element = createDrawerElement(property);
    const Model = property.model || DrawerImpl;
    const drawer = new Model(element, property);
    drawer.onCreate();
    document.body.append(element);
    drawer.onAppend();
};

export * from './interfaces';
