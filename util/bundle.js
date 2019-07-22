const glob = require('glob');
const fs = require('fs');
const ES6ClassMinify = require('es6-class-minify').ES6ClassMinify;
var UglifyJS = require('uglify-es');

const ConcatFiles = {
    content:'',
    init(){
        this.getFilePaths();
        this.getFilePaths(true);
        this.saveCSS();
    },
    getFilePaths(ignoreCSS){
        this.content = '';
        const ignore = ignoreCSS ? ['src/bootstrap-css.js']: [];
        glob('src/**/*.js', { 'ignore': ignore }, (err, files) => {
            files.forEach(file => this.addFile(file));
            this.save(ignoreCSS);
        });
    },
    addFile(file){
        this.content += fs.readFileSync(file, 'utf8') + '\n';
    },
    save(ignoreCSS){
        fs.writeFileSync(`dist/bootstrap-elements${ignoreCSS ? '-lite' : ''}.js`,this.content,'utf8');
        this.content = '';
    },
    saveCSS(){
       const content = fs.readFileSync('src/bootstrap-css.js', 'utf8') ;
        fs.writeFileSync('dist/bootstrap-elements.css.js', content, 'utf8');
    }
}.init();
