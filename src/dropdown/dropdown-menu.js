class BootstrapElementsDropdownMenu extends HTMLElement {
    static get observedAttributes() {
        return ['toggleid'];
    }
    constructor() {
        super();
        this.isOpen = false;
        this.element = document.createElement('span');
        CustomElementHelper.setProperties(this, {
        });
        this.disposeHandler = this.dispose.bind(this);
    }
    connectedCallback() {
        let shadowRoot = this.attachShadow({
            mode: 'open'
        });
        shadowRoot.appendChild(this.element);
        this.classList.add('display-block');
        window.addEventListener('click', this.disposeHandler);
        shadowRoot.adoptedStyleSheets = [BootstrapElementsCore.sheet, BootstrapElementsCore.coreSheet];
        this.element.innerHTML = this.getTemplate();
        this.element.setAttribute('data-toggle','dropdown');
        this.update();
        BootstrapElementsCore.subscribe(BootstrapElementsCore.EVENTS.BOOTSTRAP_ELEMENTS_TOGGLE, this.onToggle.bind(this));
        this.element.querySelector('.dropdown-menu').addEventListener('click', (event) => {
            this.dispose();
        });
    }
    onToggle(event){
        if(event.id === this.toggleid) {
            setTimeout(() => {
                $(this.element).dropdown('toggle');
            }, 10);
           
        }
    }
    dispose(){
        const menu = this.element.querySelector('.dropdown-menu');
        if (menu.classList.contains('show')) {
            $(this.element).dropdown('dispose');
            menu.classList.remove('show');
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.update();
    }
    update() {
    }
    getTemplate() {
        return `
            <div class="dropdown-menu" toggleid="dropdownmenu">
                <slot/>
            </div>
        `
    }
}
customElements.define('be-dropdownmenu', BootstrapElementsDropdownMenu);