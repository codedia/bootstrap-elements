class BootstrapElementsToast extends HTMLElement {
    static get observedAttributes() {
        return ['show'];
    }
    constructor() {
        super();
        this.childElement = null;
        this.fragment = document.createDocumentFragment();
        this.element = document.createElement('div');
        CustomElementHelper.setProperties(this, {
            title: '',
            placement: 'auto',
            template: '',
            trigger: '',
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
        $(this.element).toast();
        this.update();
        this.addListeners();
    }
    getTemplate(){
        return `
        <div class="toast-header">
            <slot name="header"></slot>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body">
            <slot name="body"></slot>
        </div>
        `;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.update();
    }
    update() {
         this.element.className = ` 
            toast
            ${this.show === 'true' ? ' show': ''} 
            `;
    }
    addListeners() {
    }
}
customElements.define('be-toast', BootstrapElementsToast);