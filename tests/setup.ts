import { afterEach } from 'vitest';
import { configure } from '../src/configure';
import { resetBackdrop } from '../src/backdrop';
import { resetMessageStack } from '../src/message';
import { resetNoticeStack } from '../src/notice';

export function cleanupRingo() {
    document
        .querySelectorAll(
            'ringo-message, ringo-notice, ringo-dialog, ringo-drawer, ringo-backdrop'
        )
        .forEach((node) => node.remove());
    configure({ styles: [] });
    resetBackdrop();
    resetMessageStack();
    resetNoticeStack();
}

afterEach(() => {
    cleanupRingo();
});
