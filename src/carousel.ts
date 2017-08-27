import {Indicator} from './indicator';
import {LeftNavigator, RightNavigator} from './navigator';

export class Carousel {

    private container: HTMLElement;

    private n: number;
    private index: number = 0;
    private indicator: Indicator;

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
