import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { backdrop, configure, dialog, drawer, message, notice } from '../src';
import { cleanupRingo } from './setup';

beforeEach(() => {
    vi.useFakeTimers();
    cleanupRingo();
});

afterEach(() => {
    cleanupRingo();
    vi.useRealTimers();
});

describe('message', () => {
    it('creates a custom element with an open shadow root', () => {
        const { host } = message({ text: 'hello', duration: 0 });
        expect(host.tagName.toLowerCase()).toBe('ringo-message');
        expect(host.shadowRoot).toBeTruthy();
        expect(host.isConnected).toBe(true);
        expect(
            host.shadowRoot?.querySelector('[part="content"]')?.textContent
        ).toBe('hello');
    });

    it('treats text as plain text, not HTML', () => {
        const { host } = message({
            text: '<img src=x onerror=alert(1)>',
            duration: 0
        });
        const content = host.shadowRoot?.querySelector('[part="content"]');
        expect(content?.childNodes).toHaveLength(1);
        expect(content?.childNodes[0].nodeType).toBe(Node.TEXT_NODE);
        expect(content?.querySelector('img')).toBeNull();
    });

    it('calls lifecycle hooks in order with host and shadowRoot', () => {
        const order: string[] = [];
        let createCtx: { host?: HTMLElement; shadowRoot?: ShadowRoot } = {};
        const { host } = message({
            text: 'hooks',
            duration: 0,
            onCreate(ctx) {
                order.push('create');
                createCtx = ctx;
                expect(ctx.host.isConnected).toBe(false);
                expect(ctx.shadowRoot).toBe(ctx.host.shadowRoot);
            },
            onAppend(ctx) {
                order.push('append');
                expect(ctx.host.isConnected).toBe(true);
            }
        });
        expect(order).toEqual(['create', 'append']);
        expect(createCtx.host).toBe(host);
        expect(createCtx.shadowRoot).toBe(host.shadowRoot);
    });

    it('adopts vanilla-extract theme CSS into the shadow root', () => {
        const { host } = message({ text: 've', duration: 0 });
        const adopted = host.shadowRoot?.adoptedStyleSheets ?? [];
        const fallback = [...(host.shadowRoot?.querySelectorAll('style') ?? [])]
            .map((node) => node.textContent ?? '')
            .join('\n');
        const css = adopted
            .flatMap((sheet) =>
                [...(sheet.cssRules ?? [])].map((rule) => rule.cssText)
            )
            .join('\n');
        expect(`${css}\n${fallback}`).toContain('--ringo-bg');
    });

    it('applies user styles after the default theme', () => {
        const { host } = message({
            text: 'styled',
            duration: 0,
            styles: '.ringo-message-title { letter-spacing: 2px; }'
        });
        const adopted = host.shadowRoot?.adoptedStyleSheets ?? [];
        const fallback = host.shadowRoot?.querySelectorAll('style') ?? [];
        expect(adopted.length + fallback.length).toBeGreaterThanOrEqual(1);
        if (adopted.length >= 2) {
            const last = adopted.at(-1);
            const css = [...(last?.cssRules ?? [])]
                .map((rule) => rule.cssText)
                .join('');
            expect(css).toContain('letter-spacing');
        } else {
            const texts = [...fallback]
                .map((node) => node.textContent ?? '')
                .join('\n');
            expect(texts).toContain('letter-spacing');
        }
    });

    it('uses configure() styles on every instance', () => {
        configure({ styles: ':host { --ringo-radius: 12px; }' });
        const { host } = message({ text: 'global', duration: 0 });
        const adopted = host.shadowRoot?.adoptedStyleSheets ?? [];
        const fallback = [...(host.shadowRoot?.querySelectorAll('style') ?? [])]
            .map((node) => node.textContent ?? '')
            .join('\n');
        const css = adopted
            .flatMap((sheet) =>
                [...(sheet.cssRules ?? [])].map((rule) => rule.cssText)
            )
            .join('\n');
        expect(`${css}\n${fallback}`).toContain('--ringo-radius');
    });

    it('calls onClose when closed', () => {
        const onClose = vi.fn();
        const { close } = message({ text: 'bye', duration: 0, onClose });
        close();
        expect(onClose).toHaveBeenCalledTimes(1);
        expect(onClose.mock.calls[0][0].shadowRoot).toBeTruthy();
    });

    it('stacks multiple messages', () => {
        const first = message({ text: 'one', duration: 0 });
        const second = message({ text: 'two', duration: 0 });
        expect(document.querySelectorAll('ringo-message')).toHaveLength(2);
        expect(second.host).not.toBe(first.host);
    });
});

describe('notice', () => {
    it('renders ant variant by default and innei when requested', () => {
        const ant = notice({ text: 'plain', duration: 0 });
        expect(ant.host.getAttribute('variant')).toBe('ant');
        ant.close();

        const innei = notice({ text: 'pill', duration: 0, variant: 'innei' });
        expect(innei.host.getAttribute('variant')).toBe('innei');
        expect(
            innei.host.shadowRoot
                ?.querySelector('.ringo-notice')
                ?.classList.contains('ringo-innei-notice-enter')
        ).toBe(true);
    });
});

describe('dialog', () => {
    it('opens with backdrop and default buttons', () => {
        const { host } = dialog({ title: 'Hi', text: 'body', showClose: true });
        expect(host.tagName.toLowerCase()).toBe('ringo-dialog');
        expect(
            host.shadowRoot?.querySelector('[part="title"]')?.textContent
        ).toBe('Hi');
        expect(host.shadowRoot?.querySelectorAll('.ringo-button')).toHaveLength(
            2
        );
        expect(document.querySelector('ringo-backdrop')).toBeTruthy();
    });

    it('omits the button row when buttons is empty', () => {
        const { host } = dialog({ title: 'Empty', text: 'x', buttons: [] });
        expect(host.shadowRoot?.querySelector('[part="buttons"]')).toBeNull();
    });

    it('closes from the close control', () => {
        const onClose = vi.fn();
        const { host } = dialog({
            title: 'Close me',
            text: 'x',
            showClose: true,
            onClose
        });
        host.shadowRoot?.querySelector<HTMLElement>('[part="close"]')?.click();
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});

describe('drawer', () => {
    it('does not throw when buttons are omitted', () => {
        expect(() =>
            drawer({ title: 'Panel', content: 'hello' })
        ).not.toThrow();
        expect(document.querySelector('ringo-drawer')).toBeTruthy();
    });

    it('places the host on the requested side', () => {
        const { host } = drawer({
            title: 'Left',
            content: 'x',
            position: 'left'
        });
        expect(host.getAttribute('position')).toBe('left');
    });
});

describe('backdrop', () => {
    it('uses a shared host and reference counting', () => {
        const first = backdrop();
        const second = backdrop();
        first.add();
        expect(document.querySelectorAll('ringo-backdrop')).toHaveLength(1);
        second.add();
        expect(document.querySelectorAll('ringo-backdrop')).toHaveLength(1);
        first.remove();
        expect(document.querySelector('ringo-backdrop')).toBeTruthy();
        second.remove();
        vi.runAllTimers();
        expect(document.querySelector('ringo-backdrop')).toBeNull();
    });

    it('clear() drops the overlay immediately after the transition', () => {
        const layer = backdrop();
        layer.add();
        layer.add();
        layer.clear();
        vi.runAllTimers();
        expect(document.querySelector('ringo-backdrop')).toBeNull();
    });
});
