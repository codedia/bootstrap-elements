class BootstrapElementsCarousel extends HTMLElement {
    static get observedAttributes() {
        return ['crossfade', 'interval'];
    }
    constructor() {
        super();
        CustomElementHelper.setProperties(this, {
            crossfade: 'false',
            interval: '5000',
        });
    }
    connectedCallback() {
        window.addEventListener('DOMContentLoaded',this.setButtons.bind(this));
        this.update();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.update();
    }
    update() {
            this.classList.add('carousel');
            this.classList.add('slide');
            this.style.display = 'block';
            this.classList.toggle('carousel-fade', this.crossfade === 'true');
            this.setAttribute('data-ride', 'carousel');
            $(this).carousel({
                interval:Number(this.interval),
            });
            
    }
    setButtons(){
        const prevButton = this.querySelector('.carousel-control-prev');
        const nextButton = this.querySelector('.carousel-control-next');
        if (prevButton) prevButton.addEventListener('click', () => $(this).carousel('prev'));
        if (nextButton) nextButton.addEventListener('click', () => $(this).carousel('next'));
    }
}
customElements.define('be-carousel', BootstrapElementsCarousel);