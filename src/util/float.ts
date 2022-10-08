const float = (element: HTMLElement, zIndex: number, duration: number) => {
    element.style.boxSizing = 'border-box';
    element.style.position = 'fixed';
    element.style.zIndex = String(zIndex);
    element.style.transition = `all ${duration}ms ease-in-out`;
};

export default float;
