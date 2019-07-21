class BootstrapElementsButtonGroup extends HTMLElement {
    static get observedAttributes() {
        return ['toggle'];
    }
    constructor() {
        super();
        this.element = document.createElement('div');
        CustomElementHelper.setProperties(this, {});
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
    update(){
        this.element.className = 'btn-group btn-group-toggle';
    }
    getTemplate() {
        return `
            <slot/>
        `;
    }
}
customElements.define('be-buttongroup', BootstrapElementsButtonGroup);