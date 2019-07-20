class BootstrapElementsTooltip extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'placement', 'template', 'trigger'];
    }
    constructor() {
        super();
        this.childElement = null;
        this.fragment = document.createDocumentFragment();
        this.element = document.createElement('slot');
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
        this.update();
        this.addListeners();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.update();
    }
    update(){
        if(this.childElement){
             const options = {
                 container: 'body',
                 title: this.title,
                 placement: this.placement ? this.placement : null,
             }
             if (this.trigger) options.trigger = this.trigger;
             if (this.template) options.template = this.template;
             $(this.childElement).tooltip(options);
            }
    }
    addListeners() {
       this.element.addEventListener('slotchange', this.onSlotChange);
    }
    onSlotChange = () =>{
        const elements = this.element.assignedElements();
        if(elements){
           this.childElement = elements[0];
           this.update();
        }
    }
}
customElements.define('be-tooltip', BootstrapElementsTooltip);