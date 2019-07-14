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
        document.addEventListener(BootstrapElementsCollapseButton.EVENT.TOGGLE_COLLAPSE, (event) => {
            if (event.detail.target === this.collapseid)
            this.show = this.show === 'true' ? 'false' : 'true';
        });
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.update();
    }
    update() {
         $(this).collapse(this.show === 'true' ? 'show' : 'hide');
    }
}
customElements.define('be-collapsible', BootstrapElementsCollapsible);