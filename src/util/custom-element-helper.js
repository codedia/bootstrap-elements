const CustomElementHelper = {
    setProperties(element, defaultValues) {
        if (defaultValues) {
            Object.keys(defaultValues).forEach(name => {
                element[`_${name}`] = defaultValues[name];
                Object.defineProperty(element, name, {
                    set(value) {
                        element[`_${name}`] = value;
                        if (element.update) element.update();
                    },
                    get() {
                        return element[`_${name}`];
                    }
                });
            });
        }  
    }
};