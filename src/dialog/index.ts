import { DialogProperties } from '@/types';
import { hasHTML, useHTML, when } from '@/util';
import DialogImpl from './impl/dialog';

const createDialogElement = ({
    title,
    showClose,
    text,
    buttons,
    dangerouslyUseHTML = false
}: DialogProperties) => {
    if (!dangerouslyUseHTML && hasHTML(text))
        throw new Error(`Cannot use HTML.`);
    return useHTML(/* html */ `
      <div class="ringo-dialog">
        <div class="ringo-dialog-head">
            <p class="ringo-dialog-title">
                ${title}
                ${when(
                    showClose,
                    /* html */ `<i class="ringo-dialog-close"></i>`
                )}
            </p>
        </div>
        <div class="ringo-dialog-body">
            ${text}
        </div>
        ${(when(buttons), `<div class="ringo-dialog-btns"></div>`)}
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
