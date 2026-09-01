import { globalStyle } from '@vanilla-extract/css';

globalStyle(':host', {
    position: 'fixed',
    inset: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 'var(--ringo-z-index, 9000)',
    backgroundColor: 'var(--ringo-bg, rgba(0, 0, 0, 0.6))',
    opacity: 0,
    transition: 'opacity var(--ringo-duration, 250ms)',
    display: 'block'
});

globalStyle(':host([data-open])', {
    opacity: 'var(--ringo-opacity, 0.8)'
});
