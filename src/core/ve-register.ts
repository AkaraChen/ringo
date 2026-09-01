const sheets = new Map<string, string>();

export function registerVanillaCss(id: string, css: string) {
    sheets.set(id.replaceAll('\\', '/'), css);
}

export function vanillaCssFor(...needles: string[]): string {
    const out: string[] = [];
    for (const needle of needles) {
        const normalized = needle.replaceAll('\\', '/');
        for (const [id, css] of sheets) {
            if (id.endsWith(normalized) || id.includes(normalized)) {
                out.push(css);
                break;
            }
        }
    }
    return out.join('\n');
}
