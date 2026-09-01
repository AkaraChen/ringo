import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { darkShadow, hostTokens, lightShadow } from '../theme/tokens';
import { errorIcon, infoIcon, successIcon, warningIcon } from '../theme/icons';

globalStyle(':host', {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'block',
    zIndex: hostTokens.zIndex,
    vars: {
        '--ringo-bg': '#fff',
        '--ringo-fg': '#333',
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
    boxSizing: 'border-box',
    padding: '10px 16px',
    color: hostTokens.fg,
    boxShadow: hostTokens.shadow,
    fontSize: 14,
    backgroundColor: hostTokens.bg,
    borderRadius: hostTokens.radius,
    fontFamily: 'Arial, Helvetica, sans-serif'
});

export const type = styleVariants({
    info: {},
    warning: {},
    error: {},
    success: {}
});

export const content = style({
    display: 'flex',
    alignItems: 'center',
    margin: 4,
    fontSize: 15,
    selectors: {
        '&::before': {
            content: '',
            width: 16,
            height: 16,
            display: 'inline-block',
            backgroundImage: infoIcon,
            marginRight: 10
        },
        [`${type.warning} &::before`]: { backgroundImage: warningIcon },
        [`${type.error} &::before`]: { backgroundImage: errorIcon },
        [`${type.success} &::before`]: { backgroundImage: successIcon }
    }
});
