class BootstrapElementsTabContent extends HTMLElement {
    static get observedAttributes() {
        return ['tabpaneid'];
    }
    constructor() {
        super();
        this.fragment = document.createDocumentFragment();
        this.element = document.createElement('div');
        CustomElementHelper.setProperties(this, {
            tabpaneid: '',
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
        this.element.querySelector('slot').addEventListener('slotchange', this.onSlotChange);
         BootstrapElementsCore.subscribe(BootstrapElementsCore.EVENTS.BOOTSTRAP_ELEMENTS_SHOW_TABPANE, this.onShowTab, this);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.update();
        if (name === 'tabpaneid' && oldValue !== newValue)
        BootstrapElementsCore.dispatch(BootstrapElementsCore.EVENTS.BOOTSTRAP_ELEMENTS_SHOW_TABPANE, {
            id: this.tabpaneid,
        });
    }
    onShowTab = (event) => {
        const slot = this.element.querySelector('slot');
        if(slot) {
            const elements = this.element.querySelector('slot').assignedElements();
            if(elements) {
                const hasChild = elements.find(pane => pane.getAttribute('paneid') === event.id);
                if(!hasChild) return;
                elements.forEach((pane) => {
                    const paneId = pane.getAttribute('paneid');
                    if(paneId) {
                        if (paneId && event.id === paneId) {
                            pane.setAttribute('show', 'true');
                            event.button.parentNode.childNodes.forEach(button => {
                                if(button.active === 'true')  button.active = 'false';
                                if (button.tagertid === event.id) button.active = 'true';
                            });
                            
                        } else {
                            pane.setAttribute('show', 'false');
                        }
                    }
                });
            }
        }
        
    }
    onSlotChange = () => {
        const elements = this.element.querySelector('slot').assignedElements;
        
    }
    update() {
            this.element.className = `
                tab-content
            `;
    }
    getTemplate() {
        return `
                <slot></slot>
        `
    }
}
customElements.define('be-tabcontent', BootstrapElementsTabContent);