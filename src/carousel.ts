export class Carousel {
    private container: HTMLElement;

    private n: number;
    private index: number = 0;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    public init() {
        this.n = this.container.children.length;
        const carousel = this;
        for (let i = 1; i < carousel.n; i++) {
            this.hideItem(i);
        }
        this.container.addEventListener('click', function() {
            carousel.hideItem(carousel.index);
            carousel.showItem(carousel.incIndex());
        });
    }

    private incIndex(): number {
        this.index = (this.index + 1) % this.n;
        return this.index;
    }

    private hideItem(index: number) {
        this.container.children[index]['style'].display = 'none';
    }

    private showItem(index: number) {
        this.container.children[index]['style'].display = 'block';
    }
}
