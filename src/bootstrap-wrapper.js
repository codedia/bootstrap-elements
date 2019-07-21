class BootstrapWrapper extends HTMLElement {
    constructor() {
        super();
        this.element = document.createElement('div');
    }
    connectedCallback() {
        let shadowRoot = this.attachShadow({
            mode: 'open'
        });
        shadowRoot.appendChild(this.element);
        shadowRoot.adoptedStyleSheets = [BootstrapElementsCore.sheet];
        this.element.innerHTML = this.getTemplate();
    }
    getTemplate() {
        return '<slot/>';
    }
}
customElements.define('be-wrapper', BootstrapWrapper);