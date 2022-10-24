const media = () => window.matchMedia('(prefers-color-scheme: dark)');

export const isDark = () => {
    return media()?.matches;
};

export const onColorChange = (
    handler: (this: MediaQueryList, ev: MediaQueryListEvent) => any
) => {
    media()?.addEventListener('change', handler);
};
