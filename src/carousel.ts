import {Indicator} from './indicator';
import {LeftNavigator, RightNavigator} from './navigator';

export class Carousel {

    private container: HTMLElement;

    private n: number;
    private index: number = 0;
    private indicator: Indicator;
    private slidingCoordinates: Coordinates = new Coordinates();

    constructor(container: HTMLElement) {
        this.container = container;
    }

    public init() {
        this.n = this.container.children.length;
        const carousel = this;
        for (let i = 1; i < carousel.n; i++) {
            this.hideItem(i);
        }
        this.addNavigation();
    }

    private addNavigation() {
        if (this.n > 0) {
            this.indicator = new Indicator(this.n).attachTo(this.container);
            new RightNavigator().attachTo(this.container).onNavigation(() => this.next());
            new LeftNavigator().attachTo(this.container).onNavigation(() => this.previous());
            const carousel = this;
            this.container.addEventListener('touchstart', (e) => {
                carousel.slidingCoordinates.update(e.touches[0].clientX, e.touches[0].clientY);
            }, false);

            this.container.addEventListener('touchmove', (e) => {
                const xDiff = carousel.slidingCoordinates.getDirection(e.touches[0].clientX, e.touches[0].clientY);

                if (xDiff !== 0) {
                    if (xDiff > 0) {
                        carousel.previous();
                    } else {
                        carousel.next();
                    }
                }

                carousel.slidingCoordinates.unset();
            }, false);
        }
    }

    public next() {
        this.hideItem(this.index);
        this.showItem(this.incIndex());
        this.indicator.updateWith(this.index + 1);
    }

    private previous() {
        this.hideItem(this.index);
        this.showItem(this.decIndex());
        this.indicator.updateWith(this.index + 1);
    }

    private incIndex(): number {
        this.index = (this.index + 1) % this.n;
        return this.index;
    }

    private decIndex() {
        this.index = (this.index - 1);
        if (this.index < 0) {
            this.index = this.n - 1;
        }
        return this.index;
    }

    private hideItem(index: number) {
        this.container.children[index].className = 'hidden';
    }

    private showItem(index: number) {
        const child = this.container.children[index];
        child.className = 'shown';

        Carousel.resizeImage(child.firstChild);
    }

    public static resizeImage(img: Node) {
        if (img['width'] / window.innerWidth > img['height'] / window.innerHeight) {
            img['className'] = 'full-width';
        } else {
            img['className'] = 'full-height';
        }
    }
}

class Coordinates {

    private x: number;
    private y: number;

    public update(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public unset() {
        this.x = null;
        this.y = null;
    }

    public getDirection(x: number, y: number): number {
        if (!this.x || !this.y) {
            return 0;
        }
        const xDiff = this.x - x;
        const yDiff = this.y - y;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            return xDiff;
        }

        return 0;
    }
}
