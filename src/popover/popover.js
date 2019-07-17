const BootstrapElementsPopover = {
    init(){
        window.addEventListener('DOMContentLoaded', this.onLoad.bind(this))
    },
    onLoad(){
        console.log('loaded');
        BootstrapElementsCore.subscribe(BootstrapElementsCore.EVENTS.BOOTSTRAP_ELEMENTS_TOGGLE, this.onToggle.bind(this), this);
    },
    onToggle(event,element){
    	if (element && event.id === 'popover') {
            console.log('popover', element)
        }
    }
    
};
BootstrapElementsPopover.init();