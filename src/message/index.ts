import { MessageProperties } from '@/types';
import { hasHTML, useHTML, when } from '@/util';
import MessageImpl from './impl/message';

function createMessageElement({
    type = 'info',
    text,
    title = type,
    duration = 0,
    showClose = duration === 0,
    dangerouslyUseHTML = true
}: MessageProperties) {
    if (!dangerouslyUseHTML && hasHTML(text))
        throw new Error(`Cannot use HTML.`);
    return useHTML(/* html */ `
      <div class="ringo-message ringo-message-${type}">
          <h3 class="ringo-message-head">
              <div class="ringo-message-title">
                  ${title}
              </div>
          </h3>
          <p class="ringo-message-content">
              ${text}
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
