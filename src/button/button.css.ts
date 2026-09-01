import { style, styleVariants } from '@vanilla-extract/css';

export const button = style({
    vars: {
        '--primary': '#1890ff',
        '--primary-hover': '#40a9ff',
        '--font-color': '#000',
        '--border-color': '#d9d9d9'
    },
    display: 'inline-flex',
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px 15px',
    borderRadius: 2,
    outline: 'none',
    border: '1px solid var(--border-color)',
    backgroundColor: 'transparent',
    boxShadow: '0 2px #00000004',
    transition: '0.25s all',
    color: '#000',
    fontSize: 15,
    cursor: 'pointer',
    userSelect: 'none',
    selectors: {
        '&:hover, &:focus': {
            borderColor: 'var(--primary-hover)',
            color: 'var(--primary-hover)'
        },
        '&[disabled]': {
            cursor: 'no-drop',
            opacity: 0.5
        },
        '& + &': {
            marginLeft: 4
        }
    },
    '@media': {
        '(prefers-color-scheme: dark)': {
            vars: {
                '--primary': '#177ddc',
                '--primary-hover': '#095cb5',
                '--font-color': '#fff',
                '--border-color': '#434343'
            },
            color: '#fff',
            boxShadow: '0 2px 0 rgb(0 0 0 / 2%)'
        }
    }
});

export const primary = style({
    backgroundColor: 'var(--primary)',
    color: '#fff',
    borderColor: 'var(--primary)',
    selectors: {
        '&:hover, &:focus': {
            borderColor: 'var(--primary-hover)',
            backgroundColor: 'var(--primary-hover)',
            color: '#fff'
        }
    }
});

export const tone = styleVariants({
    info: {},
    error: {
        vars: { '--primary': '#ff4d4f', '--primary-hover': '#ff7875' },
        '@media': {
            '(prefers-color-scheme: dark)': {
                vars: { '--primary': '#a61d24', '--primary-hover': '#800f19' }
            }
        }
    },
    warning: {
        vars: { '--primary': '#faad14', '--primary-hover': '#ffc53d' },
        '@media': {
            '(prefers-color-scheme: dark)': {
                vars: { '--primary': '#d48806', '--primary-hover': '#ad6800' }
            }
        }
    },
    success: {
        vars: { '--primary': '#52c41a', '--primary-hover': '#73d13d' },
        '@media': {
            '(prefers-color-scheme: dark)': {
                vars: { '--primary': '#389e0d', '--primary-hover': '#237804' }
            }
        }
    }
});
