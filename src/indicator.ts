export class Indicator {

    private element: HTMLElement;
    private n: number;

    constructor(n: number) {
        this.n = n;
        this.element = document.createElement('p');
        this.element.innerHTML = '1/' + n;
    }

    public attachTo(parent: HTMLElement): Indicator {
        parent.appendChild(this.element);
        return this;
    }

    public updateWith(index: number) {
        this.element.innerHTML = `<p>${index}/${this.n}</p>`;
    }
}
