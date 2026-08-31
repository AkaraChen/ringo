export function defineRingoElement(tag: string) {
    if (customElements.get(tag)) return;

    class RingoHost extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
        }
    }

    customElements.define(tag, RingoHost);
}

export function createHost(tag: string): HTMLElement {
    defineRingoElement(tag);
    return document.createElement(tag);
}

export function getShadow(host: HTMLElement): ShadowRoot {
    if (!host.shadowRoot) {
        throw new Error(
            `Expected open shadow root on <${host.tagName.toLowerCase()}>`
        );
    }
    return host.shadowRoot;
}
