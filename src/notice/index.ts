import { NoticeProperties } from './interfaces';
import { hasHTML, useHTML } from '@/util';
import { getModel } from './impl';

function createNoticeElement({
    text,
    type = 'info',
    dangerouslyUseHTML = false
}: NoticeProperties) {
    if (!dangerouslyUseHTML && hasHTML(text))
        throw new Error(`Cannot use HTML.`);
    return useHTML(/* html */ `
      <div class="ringo-notice-container">
        <div class="ringo-notice ringo-notice-${type}">
            <p class="ringo-notice-content">
                ${text}
            </p>
        </div>
      </div
    `)[0];
}

export function notice(property: NoticeProperties) {
    const element = createNoticeElement(property);
    const Model = getModel(property.model);
    const notice = new Model(element, property);
    notice.onCreate();
    document.body.append(element);
    notice.onAppend();
}

export * from './interfaces';
