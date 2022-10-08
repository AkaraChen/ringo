export function once(target: Function) {
    let isRun = false;
    if (!isRun) {
        target();
    }
}
