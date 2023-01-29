import { useHTML, when } from '@/util';
import MessageImpl from './impl/message';
import { MessageProperties } from '@/types';

function createMessageElement({
    type = 'info',
    text,
    title = type,
    dangerouslyUseHTML,
    duration = 0,
    showClose = duration === 0
}: MessageProperties) {
    return useHTML(/* html */ `
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
