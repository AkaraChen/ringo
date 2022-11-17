const media = () => window.matchMedia('(prefers-color-scheme: dark)');

export const isDark = () => {
    return media()?.matches;
};

export const onColorChange = (
    // eslint-disable-next-line no-unused-vars
    handler: (event: MediaQueryListEvent) => any
) => {
    media()?.addEventListener('change', handler);
};
