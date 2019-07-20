class BootstrapElementsNav extends HTMLElement {
    static get observedAttributes() {
        return ['justifycontent','flexcolumn', 'tabs', 'pills', 'fill'];
    }
    constructor() {
        super();
        this.fragment = document.createDocumentFragment();
        this.element = document.createElement('ul');
        CustomElementHelper.setProperties(this, {
            justifycontent: '',
            flexcolumn: 'false',
            tabs: 'false',
            pills: 'false',
            fill: 'false',
        });
    }
    connectedCallback() {
        let shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this.fragment.appendChild(this.element);
        shadowRoot.appendChild(this.fragment);
        shadowRoot.adoptedStyleSheets = [BootstrapElementsCore.sheet, BootstrapElementsCore.coreSheet];
        this.element.innerHTML = this.getTemplate();
        this.update();
        this.addListeners();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.update();
    }
    addListeners() {
    }
    update() {
        if (this.element) {
            
            this.element.className = `
                nav
                ${this.justifycontent ? ` justify-content-${this.justifycontent}` : ''}
                ${this.flexcolumn === 'true' ? ` flex-column` : ''}
                ${this.tabs === 'true' ? ` nav-tabs` : ''}
                ${this.pills === 'true' ? ` nav-pills` : ''}
                ${this.fill === 'true' ? ` nav-fill` : ''}
            `;

        }
    }
    getTemplate() {
        return `<slot/>
        `
    }
}
customElements.define('be-nav', BootstrapElementsNav);