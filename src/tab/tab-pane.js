class BootstrapElementsTabPane extends HTMLElement {
    static get observedAttributes() {
        return ['active', 'fade', 'show', 'paneid'];
    }
    constructor() {
        super();
        this.fragment = document.createDocumentFragment();
        this.element = document.createElement('div');
        this.isActive = false;
        CustomElementHelper.setProperties(this, {
            active: 'false',
            fade: 'false',
            show: 'false',
            paneid: ''
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
       
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.update();
    }
    
    update() {
            this.element.className = `
                tab-pane
                ${this.show === 'true' || this.isActive ? ` show`: ' hide'} 
                ${this.active === 'true' ? ` active`: ''} 
                ${this.fade === 'true' ? ` fade`: ''} 
            `;
    }
    getTemplate() {
        return `
                <slot></slot>
        `
    }
}
customElements.define('be-tabpane', BootstrapElementsTabPane);