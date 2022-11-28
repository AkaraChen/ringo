type createElementProperties = {
    tag?: string,
    className?: string,
    child?: string | Node | Array<Node | undefined> | undefined,
    onClick?: (element: HTMLElement) => any
}

export const createElement = (property: createElementProperties) => {
    let {
        tag = 'div', className = '', child, onClick
    } = property;
    const element = document.createElement(tag);
    element.className = className;
    if (typeof child === 'string') {
        const textNode = document.createTextNode(child);
        element.append(textNode);
    }
    if (child instanceof Node) {
        child = [child];
    }
    if (Array.isArray(child)) {
        for (const node of child) { if (node) element.append(node); }
    }
    setOnClick(element, onClick);
    return element;
};

export const setOnClick = (target: HTMLElement, onClick?: (element: HTMLElement) => any) => {
    if (onClick) target.addEventListener('click', () => onClick(target));
};

export const useHTML = (html: string) => {
    const document = new DOMParser().parseFromString(html, 'text/html');
    return [...document.body.childNodes] as HTMLElement[];
};
