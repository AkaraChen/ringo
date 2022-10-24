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
        } else {
            if (child instanceof Array) {
                child.forEach((item) => element.appendChild(item));
            } else {
                element.appendChild(child);
            }
        }
    }
    return element;
};

type child = string | HTMLElement | HTMLElement[] | Node[] | Node;

export const addToDocument = (element: HTMLElement) =>
    document.body.appendChild(element);

export const removeFromDocument = (element: HTMLElement) => {
    document.body.removeChild(element);
};

export const parseHTMLString = (text: string) => {
    const document = new DOMParser().parseFromString(text, 'text/html');
    return Array.from(document.body.childNodes);
};
