import { globalStyle, style } from '@vanilla-extract/css';
import { darkShadow, hostTokens, lightShadow } from '../theme/tokens';
import { dialogCloseIcon } from '../theme/icons';

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
                '--ringo-bg': '#242424',
                '--ringo-shadow': darkShadow
            }
        }
    }
});

export const panel = style({
    backgroundColor: hostTokens.bg,
    color: hostTokens.fg,
    border: 'none',
    borderRadius: hostTokens.radius,
    boxShadow: hostTokens.shadow
});

export const head = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(0, 0, 0, 6%)',
    padding: '16px 24px',
    '@media': {
        '(prefers-color-scheme: dark)': {
            borderBottom: '1px solid #303030'
        }
    }
});

export const title = style({
    fontSize: 16,
    fontWeight: 500,
    margin: 0
});

export const body = style({
    padding: 24,
    fontSize: 15,
    borderBottom: '1px solid rgba(0, 0, 0, 6%)',
    lineHeight: 1.35,
    '@media': {
        '(prefers-color-scheme: dark)': {
            borderBottom: '1px solid #303030'
        }
    }
});

export const close = style({
    width: 18,
    height: 18,
    cursor: 'pointer',
    background: dialogCloseIcon
});

export const buttons = style({
    padding: '12px 24px',
    textAlign: 'right'
});
