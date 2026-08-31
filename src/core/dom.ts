export function el(
    tag: string,
    attrs: Record<string, string | undefined> = {},
    children: Array<Node | string | undefined | false> = []
): HTMLElement {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
        if (value == null || value === '') continue;
        if (key === 'class') node.className = value;
        else node.setAttribute(key, value);
    }
    for (const child of children) {
        if (!child) continue;
        node.append(
            typeof child === 'string' ? document.createTextNode(child) : child
        );
    }
    return node;
}

export function setOnClick(
    target: HTMLElement,
    onClick?: (element: HTMLElement) => void
) {
    if (onClick) target.addEventListener('click', () => onClick(target));
}
