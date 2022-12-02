export const when = <T>(judge: any, true_: T = judge) => {
    if (Array.isArray(judge) && judge.length === 0) return;
    if (judge) {
        if (typeof true_ === 'function') return true_();
        return true_;
    }
};
