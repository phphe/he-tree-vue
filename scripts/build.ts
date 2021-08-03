import { belongsTo, report, camelize } from "rogo";
import * as rollup from "rollup";
import * as path from "path";
const babel = require("rollup-plugin-babel");
const node = require("@rollup/plugin-node-resolve");
const cjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
import { terser } from "rollup-plugin-terser"; // to minify bundle
const typescript = require("rollup-plugin-typescript2");
const vue = require("rollup-plugin-vue");
const postcss = require("rollup-plugin-postcss");
const pkg = require("../package.json");
const external = ["tslib"];

// quick config
const input = "src/index.ts";
const outDir = "dist";
const outputName = pkg.name; // the built file name is outDir/outputName.format.js
const moduleName = camelize(pkg.name); // for umd, amd
const extractCssPath = path.resolve(outDir, `${outputName}.css`);

const getBabelConfig = () => ({
  // .babelrc
  presets: [
    [
      "@vue/cli-plugin-babel/preset",
      {
        useBuiltIns: false,
        polyfills: [],
        targets: { browsers: "defaults" }, // default browsers, coverage 90%
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

const esmBabelConfig = <any>getBabelConfig();

const cjsBabelConfig = <any>getBabelConfig();
cjsBabelConfig.plugins.push(["module-extension", { mjs: "js" }]); // replace .mjs to .js

const umdBabelConfig = <any>getBabelConfig();

export default <rollup.RollupOptions[]>[
  // esm
  {
    input,
    external: (source) =>
      belongsTo(source, Object.keys(pkg.dependencies || {})) ||
      belongsTo(source, Object.keys(pkg.peerDependencies || {})) ||
      belongsTo(source, external),
    plugins: [
      vue(),
      postcss({ extract: extractCssPath }),
      typescript(), // node must be in front of typescript. babel must behind typescript.
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
    external: (source) =>
      belongsTo(source, Object.keys(pkg.dependencies || {})) ||
      belongsTo(source, Object.keys(pkg.peerDependencies || {})) ||
      belongsTo(source, external),
    plugins: [
      vue(),
      postcss({ extract: extractCssPath }),
      typescript(), // node must be in front of typescript. babel must behind typescript.
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
    external: (source) =>
      belongsTo(source, Object.keys(pkg.peerDependencies || {})),
    plugins: [
      vue(),
      postcss({ extract: extractCssPath }),
      typescript(), // node must be in front of typescript. babel must behind typescript.
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
    external: (source) =>
      belongsTo(source, Object.keys(pkg.peerDependencies || {})),
    plugins: [
      vue(),
      postcss({ extract: extractCssPath }),
      typescript(), // node must be in front of typescript. babel must behind typescript.
      babel(umdBabelConfig),
      node(),
      cjs(),
      json(),
      terser(), // to minify bundle
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
  report(outDir);
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
