const BootstrapElementsCore = {
    STYLE_ID:'bootstrap-elements-style',
    sheet: new CSSStyleSheet(),
    init(){
        this.sheet.replace(BootstrapCSS);
        document.addEventListener('DOMContentLoaded',this.onLoad.bind(this));
    },
    onLoad(){
         this.createStyle();
    },
    createStyle(){
        const style = document.createElement('style');
        style.id = this.STYLE_ID;
        style.innerHTML = BootstrapCSS;
        document.head.appendChild(style);

    }
}
BootstrapElementsCore.init();