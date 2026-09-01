import type { StyleInput } from '../types';

function flatten(
    groups: Array<StyleInput | StyleInput[] | undefined>
): StyleInput[] {
    const result: StyleInput[] = [];
    for (const group of groups) {
        if (group == null) continue;
        if (Array.isArray(group)) result.push(...group);
        else result.push(group);
    }
    return result;
}

function canConstructSheet() {
    return (
        typeof CSSStyleSheet !== 'undefined' &&
        typeof CSSStyleSheet.prototype.replaceSync === 'function'
    );
}

function canAdopt(shadow: ShadowRoot) {
    return canConstructSheet() && shadow.adoptedStyleSheets !== undefined;
}

export function applyStyles(
    shadow: ShadowRoot,
    ...groups: Array<StyleInput | StyleInput[] | undefined>
) {
    const items = flatten(groups);
    if (items.length === 0) return;

    const texts: string[] = [];
    const sheets: CSSStyleSheet[] = [];

    for (const item of items) {
        if (typeof item === 'string') {
            texts.push(item);
            if (canConstructSheet()) {
                const sheet = new CSSStyleSheet();
                sheet.replaceSync(item);
                sheets.push(sheet);
            }
        } else {
            sheets.push(item);
        }
    }

    if (canAdopt(shadow) && sheets.length > 0) {
        shadow.adoptedStyleSheets = [...shadow.adoptedStyleSheets, ...sheets];
        return;
    }

    if (texts.length > 0) {
        const style = document.createElement('style');
        style.textContent = texts.join('\n');
        shadow.prepend(style);
    }
}
