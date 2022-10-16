/**
 * @vitest-environment jsdom
 */

import {test, expect} from 'vitest';
import {message, notice} from '../src/index';
import {sleep} from './util';

test('message', async () => {
    message({text: 'Hello', duration: 100, transitionDuration: 0});
    expect(document.getElementsByClassName('ringo-message')).not.toBeNull();
    await sleep(100);
    expect(document.getElementsByClassName('ringo-message')).not.toBe(
        HTMLCollection
    );
});

test('notice', async () => {
    notice({text: 'Hello', duration: 100, transitionDuration: 0});
    expect(document.getElementsByClassName('ringo-notice')).not.toBeNull();
    await sleep(100);
    expect(document.getElementsByClassName('ringo-notice')).not.toBe(
        HTMLCollection
    );
});
