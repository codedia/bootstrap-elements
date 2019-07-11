const path = require('path');
const fs = require('fs');
const CSSToJS = {
    source:'',
    out:'',
    init(){
        if(process.argv.length > 2) {
            this.source = path.resolve(process.cwd(),process.argv[2]);
            this.out = path.resolve(process.cwd(), process.argv[3]);
            console.log(this.source,this.out);
            this.getFile();
        }
    },
    getFile(){
        const css = fs.readFileSync(this.source, 'utf8');
        const content = `const BootstrapCSS = \`${css.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm,'').replace(/\\/gm,'\\\\')}\``;
        fs.writeFileSync(this.out,content,'utf8');
    }
}.init();