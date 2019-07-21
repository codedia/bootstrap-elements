class BootstrapElementsModal extends HTMLElement {
    static get observedAttributes() {
        return ['toggleid', 'show'];
    }
    constructor() {
        super();
        this.element = document.createElement('span');
        CustomElementHelper.setProperties(this, {
            toggleid: '',
            show:'false',
        });

    }
    connectedCallback() {
        let shadowRoot = this.attachShadow({
            mode: 'open'
        });
        shadowRoot.appendChild(this.element);
        this.classList.add('display-block');
        shadowRoot.adoptedStyleSheets = [BootstrapElementsCore.sheet, BootstrapElementsCore.coreSheet];
        this.element.innerHTML = this.getTemplate();
        this.update();
        BootstrapElementsCore.subscribe(BootstrapElementsCore.EVENTS.BOOTSTRAP_ELEMENTS_TOGGLE, this.onToggle.bind(this), this);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.update();
    }
    onToggle(event){
        if (event.id === this.toggleid) {
            $(this.element.querySelector('div')).modal('toggle');
        }

    }
    update() {
        $(this.element.querySelector('div')).modal({
            show: this.show === 'true'
        });
    }
    getTemplate() {
        return `
            <div class="modal" tabindex="-1" role="dialog">
                <slot/>
            </div>
        `;
    }
}
customElements.define('be-modal', BootstrapElementsModal);