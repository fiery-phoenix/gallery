abstract class Navigator {

    private element: HTMLElement;

    protected constructor(direction: string, representation: string) {
        const element = document.createElement('div');
        element.setAttribute('class', 'nav-button-' + direction);
        const innerDiv = document.createElement('div');
        innerDiv.innerHTML = representation;
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

export class RightNavigator extends Navigator {
    constructor() {
        super('right', '&gt;');
    }
}

export class LeftNavigator extends Navigator {
    constructor() {
        super('left', '&lt;');
    }
}
