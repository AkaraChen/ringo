export const backdropTheme =
    ':host {\n    position: fixed;\n    inset: 0;\n    width: 100vw;\n    height: 100vh;\n    z-index: var(--ringo-z-index, 9000);\n    background-color: var(--ringo-bg, rgba(0, 0, 0, 0.6));\n    opacity: 0;\n    transition: opacity var(--ringo-duration, 250ms);\n    display: block;\n}\n\n:host([data-open]) {\n    opacity: var(--ringo-opacity, 0.8);\n}\n';
