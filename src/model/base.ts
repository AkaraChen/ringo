import { stlx } from 'stlx';

export class BaseModel {
    element: HTMLElement;

    stlx: ReturnType<typeof stlx>;

    constructor(element: HTMLElement) {
        this.element = element;
        this.stlx = stlx(element);
    }

    onCreate(): void {}

    onAppend(): void {}
}
