const {camelCase} = require('helper-js');
const minimist = require('minimist');
const path = require('path')
const fs = require('fs')
const pkg = require('../package.json')
const resolve = p => path.resolve(__dirname, '../', p)

const argv = minimist(process.argv.slice(5))

const options = {
  input: fs.existsSync(resolve('src/index.js')) ? resolve(`src/index.js`) : resolve(`src/${pkg.name}.js`),
  outputName: pkg.name,
  moduleName: camelCase(pkg.name),
}

const builds = {
  'cjs': {
    entry: options.input,
    dest: resolve(`dist/${options.outputName}.cjs.js`),
    format: 'cjs',
    plugins: {babel: babelTargetEsmodules()},
  },
  'esm': {
    entry: options.input,
    dest: resolve(`dist/${options.outputName}.esm.js`),
    format: 'es',
    plugins: {babel: babelTargetEsmodules()},
  },
  'umd': {
    entry: options.input,
    dest: resolve(`dist/${options.outputName}.js`),
    format: 'umd',
    moduleName: options.moduleName,
  },
  'umd-min': {
    entry: options.input,
    dest: resolve(`dist/${options.outputName}.min.js`),
    format: 'umd',
    moduleName: options.moduleName,
    sourcemap: false,
  },
}

function genConfig (name) {
  const opts = builds[name]
  let format = opts.format
  if (format === 'es') {
    format = 'esm'
  }
  const isZip = opts.dest.includes('min.js')
  if (isZip) {
    format += '-min'
  }
  const extractCSS = format === 'umd'
  const config = {
    input: opts.entry,
    plugins: {
      vue: true,
      babel: {
        runtimeHelpers: true,
      },
      ...opts.plugins,
    },
    output: {
      format,
      moduleName: options.moduleName,
      fileName: opts.dest,
      // there is a bug if extractCSS false, this code will in esm and cjs: import styleInject from '../../../../../node_modules/_style-inject@0.3.0@style-inject/dist/style-inject.es.js';
      extractCSS: opts.extractCSS === undefined || opts.extractCSS,
      sourceMap: Boolean(opts.sourcemap || opts.sourceMap),
    },
    banner: opts.banner || defaultBanner(pkg),
  }
  return config
}
if (argv.target) {
  module.exports = genConfig(argv.target)
} else {
  exports.getBuild = genConfig
  exports.originalBuilds = builds
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}

function babelTargetEsmodules() {
  return {
    runtimeHelpers: true,
    babelrc: false,
    presets: [
      ['@vue/cli-plugin-babel/preset', {
        useBuiltIns: false,
        polyfills: [],
        targets: {
          esmodules: true,
        },
      }],
    ]
  }
}
function defaultBanner(pkg) {
  return `
/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${pkg.author}
 * Released under the ${pkg.license} License.
 */`.trim()
}
