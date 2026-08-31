import type { StyleInput } from './types';

let extraStyles: StyleInput[] = [];

function normalize(input?: StyleInput | StyleInput[]): StyleInput[] {
    if (input == null) return [];
    return Array.isArray(input) ? input : [input];
}

export function configure(
    options: { styles?: StyleInput | StyleInput[] } = {}
) {
    extraStyles = normalize(options.styles);
}

export function getConfiguredStyles(): StyleInput[] {
    return extraStyles;
}
