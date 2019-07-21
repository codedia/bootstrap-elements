const Version = {
    init(){
     document.addEventListener('DOMContentLoaded', this.onLoad.bind(this));
     },
     onLoad() {
         const versionElements = document.querySelectorAll('.be-version');
         if (versionElements) {
             versionElements.forEach(element => element.textContent = window.BootstrapElementsVersion);
         }
     },
}.init();