export const lightShadow =
    '0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d';

export const darkShadow =
    '0 3px 6px -4px rgb(0 0 0 / 48%), 0 6px 16px 0 rgb(0 0 0 / 32%), 0 9px 28px 8px rgb(0 0 0 / 20%)';

export const hostTokens = {
    bg: 'var(--ringo-bg)',
    fg: 'var(--ringo-fg)',
    radius: 'var(--ringo-radius)',
    shadow: 'var(--ringo-shadow)',
    zIndex: 'var(--ringo-z-index)'
} as const;
