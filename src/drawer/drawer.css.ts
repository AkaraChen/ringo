import { globalStyle, style } from '@vanilla-extract/css';
import { hostTokens } from '../theme/tokens';
import { closeIcon, closeIconLight } from '../theme/icons';

globalStyle(':host', {
    position: 'fixed',
    top: 0,
    height: '100%',
    display: 'block',
    boxSizing: 'border-box',
    zIndex: hostTokens.zIndex,
    vars: {
        '--ringo-bg': '#fff',
        '--ringo-fg': 'inherit',
        '--ringo-radius': '0',
        '--ringo-shadow': 'none',
        '--ringo-z-index': '10000'
    },
    '@media': {
        '(prefers-color-scheme: dark)': {
            vars: {
                '--ringo-bg': '#242424',
                '--ringo-fg': '#ddd'
            }
        }
    }
});

export const panel = style({
    boxSizing: 'border-box',
    backgroundColor: hostTokens.bg,
    color: hostTokens.fg,
    borderRight: '1px #e6e8eb solid',
    borderRadius: hostTokens.radius,
    boxShadow: hostTokens.shadow,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '@media': {
        '(prefers-color-scheme: dark)': {
            border: 'none'
        }
    }
});

globalStyle(`:host([position='left']) ${panel}`, {
    borderRight: 'none',
    borderLeft: '1px #e6e8eb solid'
});

export const head = style({
    display: 'flex',
    padding: '16px 24px',
    paddingBottom: 12,
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(0, 0, 0, 6%)',
    alignItems: 'center',
    '@media': {
        '(prefers-color-scheme: dark)': {
            borderBottom: '1px solid #303030'
        }
    }
});

export const title = style({
    fontSize: 16,
    color: '#333',
    margin: 0,
    fontWeight: 400,
    '@media': {
        '(prefers-color-scheme: dark)': {
            color: '#ddd'
        }
    }
});

export const close = style({
    backgroundImage: closeIcon,
    display: 'block',
    width: 16,
    height: 16,
    opacity: 0.6,
    cursor: 'pointer',
    '@media': {
        '(prefers-color-scheme: dark)': {
            opacity: 1,
            backgroundImage: closeIconLight
        }
    }
});

export const content = style({
    fontSize: 14,
    padding: 24,
    lineHeight: 1.5
});

export const buttons = style({
    padding: '12px 24px',
    marginTop: 'auto'
});
