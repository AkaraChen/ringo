import { useHTML } from '../util/dom';
import { when } from '../util/util';
import { DialogProperties } from '@/types/dialog';
import DialogImpl from '../model/impl/dialog';

const createDialogElement = ({ title, showClose, text }: DialogProperties) => {
    return useHTML(/* html */ `
      <div class="ringo-dialog">
        <div class="ringo-dialog-head">
            <p class="ringo-dialog-title">
                ${title}
                ${when(showClose, '<i class="ringo-dialog-close"></i>')}
            </p>
        </div>
        <div class="ringo-dialog-body">
            ${text}
        </div>
        <div class="ringo-dialog-btns"></div>
      </div>
    `)[0];
};

export const dialog = (property: DialogProperties) => {
    const element = createDialogElement(property);
    const Model = property.model || DialogImpl;
    const dialog = new Model(element, property);
    dialog.onCreate();
    document.body.append(element);
    dialog.onAppend();
};
