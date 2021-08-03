"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rogo_1 = require("rogo");
const path = require("path");
const babel = require("rollup-plugin-babel");
const node = require("@rollup/plugin-node-resolve");
const cjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const rollup_plugin_terser_1 = require("rollup-plugin-terser"); // to minify bundle
const typescript = require("rollup-plugin-typescript2");
const vue = require("rollup-plugin-vue");
const postcss = require("rollup-plugin-postcss");
const pkg = require("../package.json");
const external = ["tslib"];
// quick config
const input = "src/index.ts";
const outDir = "dist";
const outputName = pkg.name; // the built file name is outDir/outputName.format.js
const moduleName = rogo_1.camelize(pkg.name); // for umd, amd
const extractCssPath = path.resolve(outDir, `${outputName}.css`);
const getBabelConfig = () => ({
    // .babelrc
    presets: [
        [
            "@vue/cli-plugin-babel/preset",
            {
                useBuiltIns: false,
                polyfills: [],
                targets: { browsers: "defaults" },
            },
        ],
    ],
    plugins: [
        "@babel/plugin-transform-runtime",
        ["@babel/plugin-proposal-optional-chaining", { loose: false }],
    ],
    // for rollup babel plugin
    runtimeHelpers: true,
    exclude: [/@babel\/runtime/, /@babel\\runtime/, /regenerator-runtime/],
    extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".vue", ".ts", ".tsx"],
    babelrc: false,
});
const esmBabelConfig = getBabelConfig();
const cjsBabelConfig = getBabelConfig();
cjsBabelConfig.plugins.push(["module-extension", { mjs: "js" }]); // replace .mjs to .js
const umdBabelConfig = getBabelConfig();
exports.default = [
    // esm
    {
        input,
        external: (source) => rogo_1.belongsTo(source, Object.keys(pkg.dependencies || {})) ||
            rogo_1.belongsTo(source, Object.keys(pkg.peerDependencies || {})) ||
            rogo_1.belongsTo(source, external),
        plugins: [
            vue(),
            postcss({ extract: extractCssPath }),
            typescript(),
            babel(esmBabelConfig),
            node(),
            cjs(),
            json(),
        ],
        output: {
            dir: `${outDir}/esm`,
            format: "esm",
            banner: getBanner(pkg),
            sourcemap: false,
        },
    },
    // cjs
    {
        input,
        external: (source) => rogo_1.belongsTo(source, Object.keys(pkg.dependencies || {})) ||
            rogo_1.belongsTo(source, Object.keys(pkg.peerDependencies || {})) ||
            rogo_1.belongsTo(source, external),
        plugins: [
            vue(),
            postcss({ extract: extractCssPath }),
            typescript(),
            babel(cjsBabelConfig),
            node(),
            cjs(),
            json(),
        ],
        output: {
            dir: `${outDir}/cjs`,
            format: "cjs",
            banner: getBanner(pkg),
            sourcemap: false,
        },
    },
    // umd
    {
        input,
        external: (source) => rogo_1.belongsTo(source, Object.keys(pkg.peerDependencies || {})),
        plugins: [
            vue(),
            postcss({ extract: extractCssPath }),
            typescript(),
            babel(umdBabelConfig),
            node(),
            cjs(),
            json(),
        ],
        output: {
            dir: `${outDir}/umd`,
            format: "umd",
            banner: getBanner(pkg),
            sourcemap: false,
            name: moduleName,
        },
    },
    // umd min
    {
        input,
        external: (source) => rogo_1.belongsTo(source, Object.keys(pkg.peerDependencies || {})),
        plugins: [
            vue(),
            postcss({ extract: extractCssPath }),
            typescript(),
            babel(umdBabelConfig),
            node(),
            cjs(),
            json(),
            rollup_plugin_terser_1.terser(),
        ],
        output: {
            dir: `${outDir}/umd-min`,
            format: "umd",
            banner: getBanner(pkg),
            sourcemap: false,
            name: moduleName,
        },
    },
];
if (process.argv.includes("--report")) {
    rogo_1.report(outDir);
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
