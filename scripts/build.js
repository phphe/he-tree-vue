"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rogo_1 = require("rogo");
const path = require("path");
const babel = require('rollup-plugin-babel');
const node = require("@rollup/plugin-node-resolve");
const cjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const rollup_plugin_terser_1 = require("rollup-plugin-terser"); // to minify bundle
const vue = require("rollup-plugin-vue");
const postcss = require('rollup-plugin-postcss');
const pkg = require("../package.json");
// quick config
const input = 'src/index.js';
const outDir = 'dist';
const outputName = pkg.name; // the built file name is outDir/outputName.format.js
const moduleName = (0, rogo_1.camelize)(pkg.name); // for umd, amd
const extractCssPath = path.resolve(outDir, `${outputName}.css`);
const globals = {
    vue: 'Vue',
};
const getBabelConfig = () => ({
    // .babelrc
    presets: [
        ['@vue/cli-plugin-babel/preset', {
                useBuiltIns: false,
                polyfills: [],
                targets: { browsers: 'defaults' }, // default browsers, coverage 90%
            }],
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        ['@babel/plugin-proposal-optional-chaining', { 'loose': false }],
    ],
    // for rollup babel plugin
    runtimeHelpers: true,
    exclude: [/@babel\/runtime/, /@babel\\runtime/, /regenerator-runtime/],
    extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue', '.ts', '.tsx'],
    babelrc: false,
});
const esmBabelConfig = getBabelConfig();
const cjsBabelConfig = getBabelConfig();
cjsBabelConfig.plugins.push(['module-extension', { mjs: 'js' }]); // replace .mjs to .js
const umdBabelConfig = getBabelConfig();
exports.default = [
    // esm
    {
        input,
        external: (source) => (0, rogo_1.belongsTo)(source, Object.keys(pkg.dependencies || {})) || (0, rogo_1.belongsTo)(source, Object.keys(pkg.peerDependencies || {})),
        plugins: [
            vue(),
            postcss({ extract: extractCssPath }),
            babel(esmBabelConfig),
            node(), cjs(), json(),
        ],
        output: {
            file: path.resolve(outDir, `${outputName}.esm.js`),
            format: 'esm',
            banner: getBanner(pkg),
            sourcemap: false,
        },
    },
    // cjs
    {
        input,
        external: (source) => (0, rogo_1.belongsTo)(source, Object.keys(pkg.dependencies || {})) || (0, rogo_1.belongsTo)(source, Object.keys(pkg.peerDependencies || {})),
        plugins: [
            vue(),
            postcss({ extract: extractCssPath }),
            babel(cjsBabelConfig),
            node(), cjs(), json(),
        ],
        output: {
            file: path.resolve(outDir, `${outputName}.cjs.js`),
            format: 'cjs',
            banner: getBanner(pkg),
            sourcemap: false,
        },
    },
    // umd
    {
        input,
        external: (source) => (0, rogo_1.belongsTo)(source, Object.keys(pkg.peerDependencies || {})),
        plugins: [
            vue(),
            postcss({ extract: extractCssPath }),
            babel(umdBabelConfig),
            node(), cjs(), json(),
        ],
        output: {
            file: path.resolve(outDir, `${outputName}.js`),
            format: 'umd',
            banner: getBanner(pkg),
            sourcemap: false,
            name: moduleName,
            globals,
        },
    },
    // umd min
    {
        input,
        external: (source) => (0, rogo_1.belongsTo)(source, Object.keys(pkg.peerDependencies || {})),
        plugins: [
            vue(),
            postcss({ extract: extractCssPath }),
            babel(umdBabelConfig),
            node(), cjs(), json(),
            (0, rollup_plugin_terser_1.terser)(), // to minify bundle
        ],
        output: {
            file: path.resolve(outDir, `${outputName}.min.js`),
            format: 'umd',
            banner: getBanner(pkg),
            sourcemap: false,
            name: moduleName,
            globals,
        },
    },
];
if (process.argv.includes('--report')) {
    (0, rogo_1.report)(outDir);
}
function getBanner(pkg) {
    return `
/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${pkg.author}
 * Homepage: ${pkg.homepage}
 * Released under the ${pkg.license} License.
 */`.trim();
}
