class BootstrapElementsCode extends HTMLTextAreaElement {
    constructor() {
        super();
        this.childElement = null;
        this.fragment = document.createDocumentFragment();
        this.element = document.createElement('div');
    }
    connectedCallback() {
        console.log('connected', this);
    }
    addListeners() {}
}
customElements.define('be-code', BootstrapElementsCode, {extends: 'textarea'});