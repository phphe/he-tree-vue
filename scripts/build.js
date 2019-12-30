// use bili to build lib
// vue-cli 3 support build as library, but don't support output as es module because of webpack
const bili = require('bili');
const fs = require('fs');
const package = require('../package.json');

const banner = `
/*!
* ${package.name} v${package.version}
* (c) ${package.author}
* Released under the ${package.license} License.
*/`.trim()

bili.write({
  input: './src/lib-entry.js',
  format: ['cjs','umd','umd-min','es'],
  banner: true,
  plugin: ['vue'],
  banner,
}).then(() => {
  console.log('Done!')
  fs.renameSync(`./dist/${package.name}.es.js`, `./dist/${package.name}.esm.js`)
})
