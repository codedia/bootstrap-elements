class BootstrapElementsButton extends HTMLElement {
    static get observedAttributes() {
        return ['type'];
    }
    constructor(){
        super();
        this.type = 'primary';
        this.element = document.createElement('div');
        this.styleElement = document.createElement('style');
    }
    connectedCallback(){
        let shadowRoot = this.attachShadow({
            mode: 'open'
        });
        //shadowRoot.appendChild(this.styleElement);
        shadowRoot.appendChild(this.element);
        console.log(BootstrapElementsCore.sheet);
        shadowRoot.adoptedStyleSheets = [BootstrapElementsCore.sheet];
        this.element.innerHTML = this.getTemplate();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        updateType();
    }
    updateType(){
        this.element.querySelector('button').className = `btn btn-${this.type}`;
    }
    getTemplate() {
        return `
            <button class="btn btn-${this.type}"><slot/></button>
        `
    }
}
customElements.define('be-button', BootstrapElementsButton);