const fs = require('fs');
const path = require('path');
const packageJSON = require(path.resolve(__dirname,'../package.json'));

if (process.argv.length > 2 && process.argv[2] === '--dist') {
    let bejs = fs.readFileSync(path.resolve(__dirname, '../dist/bootstrap-elements.js'), 'utf8');
    bejs = bejs.replace(/\/\*\*.*?\*\//im,'');
    bejs = `/** Boostrap Elements version v${packageJSON.version} */ \n` + bejs;
    fs.writeFileSync(path.resolve(__dirname, '../dist/bootstrap-elements.js'), bejs, 'utf8');
}else{
    let js = fs.readFileSync(path.resolve(__dirname, '../src/version.js'), 'utf8');
    js = js.replace(/(window\.BootstrapElementsVersion.?=.?\')(.*?)(\')/im, `$1${packageJSON.version}$3`);
    fs.writeFileSync(path.resolve(__dirname, '../src/version.js'),js,'utf8');
}