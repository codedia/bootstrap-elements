class BootstrapElementsAlert extends HTMLElement {
    static get observedAttributes() {
        return ['dismissible', 'type'];
    }
    constructor() {
        super();
        this.element = document.createElement('span');
        CustomElementHelper.setProperties(this, {
            dismissible: 'false',
            type: ''
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
        this.addListeners();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.update();
    }
    addListeners() {
        const alertElement = this.element.querySelector('div');
        $(alertElement).on('closed.bs.alert', () => {
            this.parentNode.removeChild(this);
        });
        this.element.querySelector('button').addEventListener('click', () => $(alertElement).alert('close'));
    }
    update() {
        const div = this.element.querySelector('div');
        if (div) {
            div.className = `
                alert fade show
                ${this.type ? ` alert-${this.type}`: ''} 
                ${this.dismissible === 'true' ? ` alert-dismissible`: ''} 
            `;

            if (this.dismissible === 'true') {
                div.querySelector('button').classList.remove('hide')
            }else{
                div.querySelector('button').classList.add('hide')
            }

        }
    }
    getTemplate() {
        return `
            <div class="alert fade show" role="alert">
                <slot></slot>
                <button type="button" class="close hide" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `
    }
}
customElements.define('be-alert', BootstrapElementsAlert);