class BootstrapElementsButton extends HTMLElement {
    static get observedAttributes() {
        return [
            'type',
            'size',
            'block',
            'active',
            'disabled',
            'toggle',
            'toggletarget',
            'link',
            'close',
            'popoverplacement',
            'popovercontent',
            'popovertitle',
            'popovertrigger',
            'dropdown',
            'nopadding',
        ];
    }
    constructor(){
        super();
        this.element = document.createElement('span');
        CustomElementHelper.setProperties(this, {
            type: '',
            size: '',
            block: '',
            active:'',
            disabled: '',
            toggle: '',
            toggletarget: '',
            link: '',
            close: '',
            popoverplacement: '',
            popovercontent: '',
            popovertitle: '',
            popovertrigger: '',
            dropdown: '',
            nopadding: '',
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
        this.element.addEventListener('click', this.onClick.bind(this));
    }
    onClick(){
        if (this.toggletarget) BootstrapElementsCore.dispatch(BootstrapElementsCore.EVENTS.BOOTSTRAP_ELEMENTS_TOGGLE, {
            id: this.toggletarget,
            element: this.element.querySelector('button'),
            popover:{
                placement: this.popoverplacement,
                content: this.popovercontent,
                title: this.popovertitle,
                trigger: this.popovertrigger,
            }
        });
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.update();
    }
    update(){
        const button = this.element.querySelector('button');
        if (button) {
            button.className = `
                btn ${this.type !== '' ? ` btn-${this.type}` : ''}
                ${this.close === 'true' ? ' close' : ''}
                ${this.size ? ` btn-${this.size}`: ''}
                ${this.block === 'true' ? ' btn-block': ''} 
                ${this.link === 'true' ? ' btn-link': ''} 
                ${this.toggle || this.active === 'true' ? ' active': ''} 
                ${this.dropdown || this.dropdown === 'true' ? ' dropdown-toggle': ''} 
                ${this.nopadding || this.nopadding === 'true' ? ' padding-0': ''} 
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
        return this.hasAttribute('disabled') && this.disabled !== 'false';
    }
    getTemplate() {
        return `
            <button class="btn btn-${this.type}"><slot/></button>
        `;
    }
}
customElements.define('be-button', BootstrapElementsButton);