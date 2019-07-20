class BootstrapElementsScrollSpy extends HTMLElement {
    static get observedAttributes() {
        return ['target'];
    }
    constructor() {
            super();
            CustomElementHelper.setProperties(this, {
                target: ''
            });
            // $(this).scrollspy({
            //     target: `#${this.target}`
            // })
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
    }
}
customElements.define('be-scrollspy', BootstrapElementsScrollSpy);