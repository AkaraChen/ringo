export const createElement = (
    tag: string,
    className?: string,
    child?: child
) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (child) {
        if (typeof child === 'string') {
            element.textContent = child;
        } else if (Array.isArray(child)) {
            for (const item of child) element.append(item);
        } else {
            element.append(child);
        }
    }
    return element;
};

type child = string | HTMLElement | HTMLElement[] | Node[] | Node;

export const addToDocument = (element: HTMLElement) =>
    document.body.append(element);

export const removeFromDocument = (element: HTMLElement) => {
    element.remove();
};

export const parseHTMLString = (text: string) => {
    const document = new DOMParser().parseFromString(text, 'text/html');
    return [...document.body.childNodes];
};
