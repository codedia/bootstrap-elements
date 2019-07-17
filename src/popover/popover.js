const BootstrapElementsPopover = {
    init(){
        window.addEventListener('DOMContentLoaded', this.onLoad.bind(this))
    },
    onLoad(){
        BootstrapElementsCore.subscribe(BootstrapElementsCore.EVENTS.BOOTSTRAP_ELEMENTS_TOGGLE, this.onToggle.bind(this), this);
    },
    onToggle(event,element){
    	if (element && event.id === 'popover') {
            console.log('popover', event);
                $(event.element).popover({
                    container: event.element,
                    trigger: event.popover.popovertrigger ? event.popover.popovertrigger : 'click',
                    content: event.popover.content,
                    title: event.popover.title,
                    placement: event.popover.placement,
                });
            if (!element.popoverShowing) {
                element.popoverShowing = true;
                $(event.element).popover('show'); 
            }else{
                element.popoverShowing = false;
                $(event.element).popover('hide');
            }
        }
    }
    
};
BootstrapElementsPopover.init();