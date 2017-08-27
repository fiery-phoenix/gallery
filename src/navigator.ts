export class RightNavigator {

    private element: HTMLElement;

    constructor() {
        const element = document.createElement('div');
        element.setAttribute('class', 'nav-button-right');
        const innerDiv = document.createElement('div');
        innerDiv.innerHTML = '&gt;';
        innerDiv.setAttribute('class', 'nav-button-inner');
        element.appendChild(innerDiv);
        this.element = element;
    }

    public attachTo(parent: HTMLElement): RightNavigator {
        parent.appendChild(this.element);
        return this;
    }

    public onNavigation(f: Function) {
        this.element.addEventListener('click', () => f());
    }
}
