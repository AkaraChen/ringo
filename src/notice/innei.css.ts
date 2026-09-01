import {
    globalStyle,
    keyframes,
    style,
    styleVariants
} from '@vanilla-extract/css';
import { hostTokens } from '../theme/tokens';
import {
    inneiErrorIcon,
    inneiInfoIcon,
    inneiSuccessIcon,
    inneiWarningIcon
} from '../theme/icons';

const fadeIn = keyframes({
    from: { opacity: 0, transform: 'scale(0.5, 0.5)' },
    to: { opacity: 1, transform: 'scale(1, 1)' }
});

const fadeOut = keyframes({
    from: { opacity: 1, transform: 'scale(1, 1)' },
    to: { opacity: 0, transform: 'scale(0.5, 0.5)' }
});

globalStyle(':host', {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'block',
    zIndex: hostTokens.zIndex,
    vars: {
        '--ringo-bg': '#fff',
        '--ringo-radius': '32px',
        '--ringo-shadow':
            '0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%)',
        '--ringo-z-index': '10000'
    },
    '@media': {
        '(prefers-color-scheme: dark)': {
            vars: {
                '--ringo-bg': '#212121'
            }
        }
    }
});

export const enter = style({
    animation: `${fadeIn} 0.3s both`
});

export const leave = style({
    animation: `${fadeOut} 0.3s both`
});

export const panel = style({
    boxSizing: 'border-box',
    padding: '10px 16px',
    boxShadow: hostTokens.shadow,
    borderRadius: hostTokens.radius,
    backgroundColor: hostTokens.bg,
    fontSize: 14
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
    margin: 0,
    fontSize: 14,
    selectors: {
        '&::before': {
            content: '',
            width: 16,
            height: 16,
            display: 'inline-block',
            backgroundImage: inneiInfoIcon,
            marginRight: 10
        },
        [`${type.warning} &::before`]: { backgroundImage: inneiWarningIcon },
        [`${type.error} &::before`]: { backgroundImage: inneiErrorIcon },
        [`${type.success} &::before`]: { backgroundImage: inneiSuccessIcon }
    }
});
