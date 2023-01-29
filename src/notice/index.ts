import { useHTML } from '@/util/dom';
import NoticeImpl from './impl/notice';
import { NoticeProperties } from './type';

function createNoticeElement({
    text,
    type = 'info',
    dangerouslyUseHTML
}: NoticeProperties) {
    return useHTML(/* html */ `
      <div class="ringo-notice ringo-notice-${type}">
          <p class="ringo-notice-content">
              ${dangerouslyUseHTML ? useHTML(text!) : text}
          </p>
      </div>
    `)[0];
}

export function notice(property: NoticeProperties) {
    const element = createNoticeElement(property);
    const Model = property.model || NoticeImpl;
    const notice = new Model(element, property);
    notice.onCreate();
    document.body.append(element);
    notice.onAppend();
}
