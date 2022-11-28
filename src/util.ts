export const when = <T>(judge: any, true_: T) => {
    if (judge) return true_;
};
