class BootstrapElementsCollapseButton extends HTMLElement {
    static EVENT = {
        TOGGLE_COLLAPSE: 'TOGGLE_COLLAPSE',
    }
    static get observedAttributes() {
        return ['target'];
    }
    constructor() {
        super();
        CustomElementHelper.setProperties(this, {
            target: '',
        });
    }
    connectedCallback() {
        this.addEventListener('click', this.onClick.bind(this));
    }
    onClick(){
         const customEvent = new CustomEvent(BootstrapElementsCollapseButton.EVENT.TOGGLE_COLLAPSE, {
             detail: {
                 target: this.target,
             }
         });
         document.dispatchEvent(customEvent);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
    }
}
customElements.define('be-collapsebutton', BootstrapElementsCollapseButton);