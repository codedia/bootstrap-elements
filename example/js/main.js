const Main = {
    currentSection:'button-section',
    init() {
        document.addEventListener('DOMContentLoaded', this.onLoad.bind(this));
    },
    onLoad() {
        const sectionButtons = document.querySelectorAll('[section-toggle]');
        sectionButtons.forEach(link => {
            link.addEventListener('click', () => this.onSectionChange(link));
        });
    },
    onSectionChange(link){
        const sectionId = link.getAttribute('section-toggle');
        document.querySelector(`#${this.currentSection}`).classList.remove('show');
        document.querySelector(`[section-toggle=${this.currentSection}]`).classList.remove('active');
        link.classList.add('active');
        document.querySelector(`#${sectionId}`).classList.add('show');
        this.currentSection = sectionId;
    }
}
Main.init();