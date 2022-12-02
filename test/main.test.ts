import {test, expect} from 'vitest';
import {backdrop, message, notice} from '../src/index';
import {sleep} from './util';

test('message', async () => {
    message({text: 'Hello', duration: 100, transitionDuration: 0});
    expect(document.querySelectorAll('.ringo-message')).not.toBeNull();
    await sleep(200);
    expect(document.querySelectorAll('.ringo-message')).toStrictEqual([]);
});

test('notice', async () => {
    notice({text: 'Hello', duration: 100, transitionDuration: 0});
    expect(document.querySelectorAll('.ringo-notice')).not.toBeNull();
    await sleep(200);
    expect(document.querySelectorAll('.ringo-notice')).toStrictEqual([]);
});

test('backdrop', async () => {
    const {add, remove} = backdrop();
    add();
    expect(document.querySelectorAll('div')).not.toBeNull();
    remove();
    await sleep(500);
    expect(document.querySelectorAll('div')).toStrictEqual([]);
});
