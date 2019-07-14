class BootstrapElementsDropdown extends HTMLElement {
    static get observedAttributes() {
        return [''];
    }
    constructor() {
        super();
        this.element = document.createElement('span');
        CustomElementHelper.setProperties(this, {
        });
    }
    connectedCallback() {
        let shadowRoot = this.attachShadow({
            mode: 'open'
        });
        shadowRoot.appendChild(this.element);
        shadowRoot.adoptedStyleSheets = [BootstrapElementsCore.sheet, BootstrapElementsCore.coreSheet];
        this.element.innerHTML = this.getTemplate();
        this.update();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.update();
    }
    update() {
    }
    getTemplate() {
        return `
            <div class="dropdown">
                <slot/>
            </div>
        `
    }
}
customElements.define('be-dropdown', BootstrapElementsDropdown);