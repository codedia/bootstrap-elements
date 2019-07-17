class BootstrapElementsCollapsible extends HTMLElement {
    static EVENT = {
        TOGGLE_COLLAPSE: 'TOGGLE_COLLAPSE',
    }
    static get observedAttributes() {
        return ['collapseid', 'show'];
    }
    constructor() {
        super();
        CustomElementHelper.setProperties(this, {
            ['collapseid']: '',
            show:'false',
        });
    }
    connectedCallback() {
        this.update();
        this.classList.add('collapse');
        this.classList.add('display-block');
        BootstrapElementsCore.subscribe(BootstrapElementsCore.EVENTS.BOOTSTRAP_ELEMENTS_TOGGLE, this.onToggle.bind(this),this);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.update();
    }
    onToggle(event){
        if (event.id === this.collapseid)
            this.show = this.show === 'true' ? 'false' : 'true';
    }
    update() {
         $(this).collapse(this.show === 'true' ? 'show' : 'hide');
    }
}
customElements.define('be-collapsible', BootstrapElementsCollapsible);