const pkg = require('./package.json');
module.exports = {
  banner: `
/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${pkg.author} homepage: ${pkg.homepage}
 * Released under the ${pkg.license} License.
 */`.trim(),
}
