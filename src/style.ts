export const numberToPixel = (number: number) => `${number}px`;

export const pixelToNumber = (pixel: string) => Number(pixel.slice(0, -2));
