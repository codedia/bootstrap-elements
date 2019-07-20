const BootstrapElementsCore = {
    EVENTS:{
        BOOTSTRAP_ELEMENTS_TOGGLE: 'BOOTSTRAP_ELEMENTS_TOGGLE',
        BOOTSTRAP_ELEMENTS_SHOW_TABPANE: 'BOOTSTRAP_ELEMENTS_SHOW_TABPANE',
    },
    STYLE_ID:'bootstrap-elements-style',
    CORE_STYLE_ID:'bootstrap-elements-core-style',
    sheet: new CSSStyleSheet(),
    coreSheet: new CSSStyleSheet(),
    subscriptions:{},
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

    },
    getStyle(className) {
        var classes = this.sheet.rules || this.sheet.cssRules;
        for (var x = 0; x < classes.length; x++) {
            if (classes[x].selectorText && classes[x].selectorText.indexOf(className) >= 0) {
                return (classes[x].cssText) ? (classes[x].cssText) : (classes[x].style.cssText);
            }
        }
    },
    unsubscribe(eventName,_element){
        if (!this.subscriptions[eventName]) return;
        this.subscriptions[eventName].forEach((obj, index) => {
            if (obj.element === _element) this.subscriptions[eventName].splice(index,1);
        });
    },
    subscribe(eventName,callback, element){
        if (!this.subscriptions[eventName]) this.subscriptions[eventName]= [];
        this.subscriptions[eventName].push({callback, element});
    },
    dispatch(eventName,detail){
        if (this.subscriptions[eventName]) this.subscriptions[eventName].forEach(obj => {
                if(obj.callback)obj.callback(detail,obj.element);
            }
        );
    }
}
BootstrapElementsCore.init();