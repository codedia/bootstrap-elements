const CoreStyle = `
    .disabled-events {
        pointer-events:none;
    }
    .hide {
        display:none;
    }
    .display-block {
        display:block;
    }
    .overflow-hidden {
        overflow:hidden;
    }
    be-navitem[fill], .nav-item-fill {
        flex: 1 1 auto;
        text-align: center;
    }
    .nav-item-justified {
        -ms-flex-preferred-size: 0;
        flex-basis: 0;
        -ms-flex-positive: 1;
        flex-grow: 1;
        text-align: center;
        height:100%;
    }
    .padding-0{
        padding:0;
    }
    .toast-header slot, .toast-body slot {
        width: 100%;
        display: block;
    }
    .popover-header{
        color: var(--gray-dark);
    }
`;