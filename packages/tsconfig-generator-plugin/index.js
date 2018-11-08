const path = require('path');
const fs   = require('fs');

class TSConfigGenerator {

    constructor(options) {
        options       = Object.assign({
            fractal: null,
            tsConfig: null,
            fileName: null
        }, options);
        this.fractal  = options.fractal;
        this.tsconfig = options.tsConfig;
        this.fileName = options.fileName;
    }

    generate(callback = null) {
        const baseUrl = this.tsconfig.compilerOptions.baseUrl.replace('./', '') + '/';

        this.fractal.components.load().then((components) => {
            let map = {};
            components.flattenDeep().each((item) => {
                const handle      = item.handle.replace('--default', '');
                map[`@${handle}`] = [path.relative(__dirname, path.resolve(path.parse(item.viewPath).dir, path.parse(item.viewPath).name)).replace(/\\/g, '/').replace('../../', '').replace(baseUrl, '')];
            });

            this.tsconfig.compilerOptions.paths = map;

            fs.writeFile(this.fileName, JSON.stringify(this.tsconfig, null, 2) + '\n', (err) => {
                if (err) {
                    return console.log(err);
                }

                if (typeof callback === 'function') {
                    callback();
                }
            });
        });
    }

    apply(compiler) {
        this.fractal.components.on('updated', (event) => {
            if (event.isTemplate && ['add', 'unlink'].includes(event.event)) {
                this.generate();
            }
        });

        compiler.hooks.beforeCompile.tapAsync('TSConfigGenerator', (compiler, callback) => {
            this.generate(callback);
        });
    }

}

module.exports = TSConfigGenerator;
