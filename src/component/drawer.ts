import { useHTML } from '../util/dom';
import { DrawerProperties } from '../types/drawer';
import DrawerImpl from '../model/impl/drawer';

const createDrawerElement = ({
    title,
    content,
    dangerouslyUseHTML
}: DrawerProperties) => {
    return useHTML(/* html */ `
      <div class="ringo-drawer">
          <div class="ringo-drawer-head">
            <h2 class="ringo-drawer-title">
                ${title}
            </h2>
            <i class="ringo-drawer-close"></i>
          </div>
          <div class="ringo-drawer-content">
            ${dangerouslyUseHTML ? useHTML(content!) : content}
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
