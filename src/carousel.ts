import {Indicator} from './indicator';
import {LeftNavigator, RightNavigator} from './navigator';

export class Carousel {

    private container: HTMLElement;

    private n: number;
    private index: number = 0;
    private indicator: Indicator;
    private xDown: number;
    private yDown: number;

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
                carousel.xDown = e.touches[0].clientX;
                carousel.yDown = e.touches[0].clientY;
            }, false);

            this.container.addEventListener('touchmove', (e) => {
                if ( ! carousel.xDown || ! carousel.yDown ) {
                    return;
                }

                let xUp = e.touches[0].clientX;
                let yUp = e.touches[0].clientY;

                let xDiff = carousel.xDown  - xUp;
                let yDiff = carousel.yDown  - yUp;

                if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
                    if ( xDiff > 0 ) {
                        carousel.previous();
                    } else {
                        carousel.next();
                    }
                }

                carousel.xDown = null;
                carousel.yDown = null;
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
        this.container.children[index]['style'].display = 'none';
    }

    private showItem(index: number) {
        this.container.children[index]['style'].display = 'block';
    }
}
