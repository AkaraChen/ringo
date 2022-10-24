import {test, expect} from 'vitest';
import {backdrop, message, notice} from '../src/index';
import {sleep} from './util';

test('message', async () => {
    message({text: 'Hello', duration: 100, transitionDuration: 0});
    expect(document.getElementsByClassName('ringo-message')).not.toBeNull();
    await sleep(200);
    expect(document.getElementsByClassName('ringo-message')).toStrictEqual([]);
});

test('notice', async () => {
    notice({text: 'Hello', duration: 100, transitionDuration: 0});
    expect(document.getElementsByClassName('ringo-notice')).not.toBeNull();
    await sleep(200);
    expect(document.getElementsByClassName('ringo-notice')).toStrictEqual([]);
});

test('backdrop', () => {
    const {add, remove} = backdrop();
    add();
    expect(document.getElementsByTagName('div')).not.toBe(null);
    remove();
    expect(document.getElementsByTagName('div')).toStrictEqual([]);
});
