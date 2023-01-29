import { NoticeProperties } from '@/types';
import { useHTML } from '@/util';
import NoticeImpl from './impl/notice';

function createNoticeElement({ text, type = 'info' }: NoticeProperties) {
    return useHTML(/* html */ `
      <div class="ringo-notice ringo-notice-${type}">
          <p class="ringo-notice-content">
              ${text}
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
