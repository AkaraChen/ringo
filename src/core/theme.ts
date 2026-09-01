const media = () => window.matchMedia('(prefers-color-scheme: dark)');

export const isDark = () => media()?.matches ?? false;

export const onColorChange = (
    handler: (event: MediaQueryListEvent) => void
) => {
    media()?.addEventListener('change', handler);
};
