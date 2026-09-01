import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { darkShadow, hostTokens, lightShadow } from '../theme/tokens';
import {
    closeIcon,
    closeIconLight,
    errorIcon,
    infoIcon,
    successIcon,
    warningIcon
} from '../theme/icons';

globalStyle(':host', {
    position: 'fixed',
    display: 'block',
    boxSizing: 'border-box',
    zIndex: hostTokens.zIndex,
    vars: {
        '--ringo-bg': '#fff',
        '--ringo-fg': 'inherit',
        '--ringo-radius': '0',
        '--ringo-shadow': lightShadow,
        '--ringo-z-index': '10000'
    },
    '@media': {
        '(prefers-color-scheme: dark)': {
            vars: {
                '--ringo-bg': '#1f1f1f',
                '--ringo-fg': '#fff',
                '--ringo-shadow': darkShadow
            }
        }
    }
});

export const panel = style({
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: hostTokens.bg,
    color: hostTokens.fg,
    padding: '16px 24px',
    boxShadow: hostTokens.shadow,
    borderRadius: hostTokens.radius,
    fontFamily: 'Arial, Helvetica, sans-serif'
});

export const head = style({
    fontWeight: 500,
    fontSize: 16,
    margin: 0,
    marginBottom: 8,
    display: 'flex'
});

export const type = styleVariants({
    info: {},
    success: {},
    warning: {},
    error: {}
});

export const title = style({
    selectors: {
        '&::before': {
            content: '',
            display: 'inline-block',
            width: 16,
            height: 16,
            verticalAlign: 'middle',
            marginRight: 8,
            backgroundImage: infoIcon
        },
        [`${type.success} &::before`]: { backgroundImage: successIcon },
        [`${type.warning} &::before`]: { backgroundImage: warningIcon },
        [`${type.error} &::before`]: { backgroundImage: errorIcon }
    }
});

export const content = style({
    fontSize: 14,
    lineHeight: 1.5,
    margin: 0
});

export const close = style({
    position: 'absolute',
    top: 18,
    right: 18,
    display: 'block',
    height: 14,
    width: 14,
    opacity: 0.5,
    cursor: 'pointer',
    backgroundImage: closeIcon,
    '@media': {
        '(prefers-color-scheme: dark)': {
            backgroundImage: closeIconLight
        }
    }
});
