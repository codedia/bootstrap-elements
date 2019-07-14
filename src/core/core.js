const BootstrapElementsCore = {
    STYLE_ID:'bootstrap-elements-style',
    CORE_STYLE_ID:'bootstrap-elements-core-style',
    sheet: new CSSStyleSheet(),
    coreSheet: new CSSStyleSheet(),
    init(){
        this.sheet.replace(BootstrapCSS);
        document.addEventListener('DOMContentLoaded',this.onLoad.bind(this));
    },
    onLoad(){
        this.coreSheet.replace(CoreStyle);
        this.createStyle(this.STYLE_ID, BootstrapCSS);
        this.createStyle(this.CORE_STYLE_ID, CoreStyle);
    },
    createStyle(id, innerHTML){
        const style = document.createElement('style');
        style.id = id;
        style.innerHTML = innerHTML;
        document.head.appendChild(style);

    }
}
BootstrapElementsCore.init();