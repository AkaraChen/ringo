import { createElement, useHTML } from '../util/dom';
import { when } from '../util/util';
import { MessageProperties } from '../types/message';
import MessageImpl from '../model/impl/message';

function createMessageElement({
    type = 'info',
    text,
    title = type,
    dangerouslyUseHTML,
    duration = 0,
    showClose = duration === 0
}: MessageProperties) {
    return useHTML(`
    <div class="ringo-message ringo-message-${type}">
        <h3 class="ringo-message-head">
            <div class="ringo-message-title">
                ${title}
            </div>
        </h3>
        <p class="ringo-message-content">
            ${dangerouslyUseHTML ? useHTML(text!) : text!}
        </p>
        ${when(showClose, '<i class="ringo-message-close"></i>')}
    </div>
    `)[0];
}

export function message(property: MessageProperties) {
    const element = createMessageElement(property);
    const Model = property.model || MessageImpl;
    const message = new Model(element, property);
    message.onCreate();
    document.body.append(element);
    message.onAppend();
}
