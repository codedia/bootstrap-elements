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
        window.addEventListener('click', this.disposeHandler);
        let shadowRoot = this.attachShadow({
            mode: 'open'
        });
        shadowRoot.appendChild(this.element);
        shadowRoot.adoptedStyleSheets = [BootstrapElementsCore.sheet, BootstrapElementsCore.coreSheet];
        this.element.innerHTML = this.getTemplate();
        this.element.setAttribute('data-toggle','dropdown');
        this.update();
        BootstrapElementsCore.subscribe(BootstrapElementsCore.EVENTS.BOOTSTRAP_ELEMENTS_TOGGLE, this.onToggle.bind(this));
        this.element.querySelector('.dropdown-menu').addEventListener('click', () => {
            console.log('click');
            this.dispose()
        });
    }
    onToggle(event){
        console.log('onToggle');
        if(event.id === this.toggleid) {
            setTimeout(() => {
                $(this.element).dropdown('toggle');
            }, 10);
           
        }
    }
    dispose(){
        const menu = this.element.querySelector('.dropdown-menu');
        console.log(menu, menu.classList.contains('show'));
        if (menu.classList.contains('show')) {
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