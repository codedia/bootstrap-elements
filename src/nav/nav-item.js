class BootstrapElementsNavItem extends HTMLElement {
    static get observedAttributes() {
        return ['active', 'disabled', 'tab', 'pill', 'fill', 'justified', 'tagertid'];
    }
    constructor() {
        super();
        this.fragment = document.createDocumentFragment();
        this.element = document.createElement('li');
        this.styleElement = document.createElement('style');
        CustomElementHelper.setProperties(this, {
            active: 'false',
            disabled: 'false',
            tab: 'false',
            pill: 'false',
            fill: 'false',
            justified: 'false',
            tagertid: '',
        });
    }
    connectedCallback() {
        let shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this.fragment.appendChild(this.element);
        shadowRoot.appendChild(this.styleElement);
        shadowRoot.appendChild(this.fragment);
        shadowRoot.adoptedStyleSheets = [BootstrapElementsCore.sheet, BootstrapElementsCore.coreSheet];
        this.element.innerHTML = this.getTemplate();
        this.styleElement.innerHTML = this.getStyleTemplate();
        this.update();
        this.addListeners();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.update();
    }
    addListeners() {
        this.element.addEventListener('click', this.onClick);
    }
    onTabChange = (event) => {
        if(this.tagertid) {
            this.active = event.id === this.tagertid ? 'true' : 'false';
            this.update();
        }
    }
    onClick = () => {
        BootstrapElementsCore.dispatch(BootstrapElementsCore.EVENTS.BOOTSTRAP_ELEMENTS_SHOW_TABPANE, {
            id: this.tagertid,
            button: this,
        });
    }
    getStyleTemplate(){
        return `
        .tab-item {
            ${this.getStyleAsString('.nav-tabs .nav-item')}
        .tab-item a {  ${this.getStyleAsString('.nav-tabs .nav-link')}
        .tab-item a.active {  ${this.getStyleAsString('.nav-tabs .nav-link.active')}
        .pill-item a.active { ${this.getStyleAsString('.nav-pills .nav-link')}
        .pill-item a.active { ${this.getStyleAsString('.nav-pills .nav-link.active')}
        `;
        }
    getStyleAsString(selector){
       const styleString = BootstrapElementsCore.getStyle(selector);
       if (styleString) return styleString.split('{')[1];
       return '}';
    }
    update() {
        this.element.className = ` 
            nav-item
            ${this.tab === 'true' ? ' tab-item': ''} 
            ${this.pill === 'true' ? ' pill-item': ''} 
            ${this.fill === 'true' ? ' nav-item-fill': ''} 
            ${this.justified === 'true' ? ' nav-item-justified': ''} 
            `;
            const aTag = this.element.querySelector('a');
            if (aTag) {
                aTag.className = `
                nav-link
                ${this.active === 'true' ? ' active': ''} 
                ${this.disabled === 'true' ? ' disabled': ''} 
                ${this.justified === 'true' ? ' nav-item-justified': ''} 
        `;
        }
    }
    getTemplate() {
        return `
                <a class="nav-link" href="#"><slot/></a>
        `;
    }
}
customElements.define('be-navitem', BootstrapElementsNavItem);