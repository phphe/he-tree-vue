const pkg = require('./package.json');
module.exports = {
  banner: `
/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${pkg.author} homepage: ${pkg.homepage}
 * Released under the ${pkg.license} License.
 */`.trim(),
  handleBuilds(builds) {
    // 
    const oldCJSExternal = builds.cjs.external
    builds.cjs.external = builds.esm.external = source => {
      if (source === 'vue') {
        return true
      } else {
        return oldCJSExternal(source)
      }
    }
    // umd
    builds.umd.external = builds['umd-min'].external = ['vue']
  },
}
