const {filterBuilds, build} = require('C:/Users/phphe/projects/rollup-helper/index.js')

let builds = require('./config').getAllBuilds()
builds = filterBuilds(builds)
build(builds)
