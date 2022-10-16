export const sleep = async (second: number) => {
    await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), second);
    });
};
