class BootstrapElementsToggleButton extends HTMLButtonElement {
    static get observedAttributes() {
        return ['type', 'size', 'block', 'active', 'disabled', 'toggle'];
    }
    constructor() {
        super();
        CustomElementHelper.setProperties(this, {
            type: 'primary',
            size: '',
            block: '',
            active: '',
            disabled: '',
            toggle: '',
        });
    }
    connectedCallback() {
        this.update();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.update();
    }
    update() {
        console.log(this);
            this.className = `
                btn btn-${this.type}
                ${this.size ? ` btn-${this.size}`: ''}
                ${this.block === 'true' ? ` btn-block`: ''} 
                ${this.toggle || this.active === 'true' ? ` active`: ''} 
            `;

    }
    onToggle() {
        const button = this.element.querySelector('button');
        if (!button.classList.contains('active')) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    }
    isDisabled() {
        return this.hasAttribute('disabled') && this.disabled !== "false";
    }
    getTemplate() {
        return `
            <button class="btn btn-${this.type}"><slot/></button>
        `
    }
}
customElements.define('be-togglebutton', BootstrapElementsToggleButton, {
    extends: 'button'
});