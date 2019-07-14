class BootstrapElementsButton extends HTMLElement {
    static get observedAttributes() {
        return ['type', 'size', 'block', 'active', 'disabled', 'toggle'];
    }
    constructor(){
        super();
        this.element = document.createElement('span');
        CustomElementHelper.setProperties(this, {
            type: 'primary',
            size: '',
            block: '',
            active:'',
            disabled: '',
            toggle: '',
        });
        this.onToggleHanlder = this.onToggle.bind(this);
    }
    connectedCallback(){
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
        const button = this.element.querySelector('button');
        if (button) {
            button.className = `
                btn btn-${this.type}
                ${this.size ? ` btn-${this.size}`: ''}
                ${this.block === 'true' ? ` btn-block`: ''} 
                ${this.toggle || this.active === 'true' ? ` active`: ''} 
            `;

            button.disabled = this.isDisabled();
            if(this.isDisabled()) {
                this.classList.add('disabled-events');
            }else{
                this.classList.remove('disabled-events');
            }
            if (this.toggle) {
                button.addEventListener('click', this.onToggleHanlder);
            }else{
                button.removeEventListener('click', this.onToggleHanlder);
            }

        }
    }
    onToggle(){
        const button = this.element.querySelector('button');
        if (!button.classList.contains('active')) {
            button.classList.add('active');
        } else{
            button.classList.remove('active');
        }
    }
    isDisabled(){
        return this.hasAttribute('disabled') && this.disabled !== "false";
    }
    getTemplate() {
        return `
            <button class="btn btn-${this.type}"><slot/></button>
        `
    }
}
customElements.define('be-button', BootstrapElementsButton);