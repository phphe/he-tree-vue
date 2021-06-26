# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.11.beta](https://github.com/phphe/he-tree-vue/compare/v2.0.10...v2.0.11.beta) (2021-06-26)


### Bug Fixes

* **draggable plugin:** correct the value of store.targetPath ([21a5bf7](https://github.com/phphe/he-tree-vue/commit/21a5bf700048e90ed03a31397c797aa41c104fbe))

### [2.0.10](https://github.com/phphe/he-tree-vue/compare/v2.0.9...v2.0.10) (2021-04-16)


### Bug Fixes

* **draggable plugin:** fix node insert error after drop ([337a09b](https://github.com/phphe/he-tree-vue/commit/337a09baf8ef88532c102a3e414905e7e3e850aa)), closes [#51](https://github.com/phphe/he-tree-vue/issues/51)

### [2.0.9](https://github.com/phphe/he-tree-vue/compare/v2.0.8...v2.0.9) (2021-04-12)


### Bug Fixes

* **draggable plugin:** wrong result when move downwards in same level ([cb64dac](https://github.com/phphe/he-tree-vue/commit/cb64dac830c6b2b5e962a556895e3cfd8bddb2a6)), closes [#50](https://github.com/phphe/he-tree-vue/issues/50)

### [2.0.8](https://github.com/phphe/he-tree-vue/compare/v2.0.7...v2.0.8) (2021-03-30)


### Bug Fixes

* **draggable plugin:** decrease delay before remove mask tree ([d9074c2](https://github.com/phphe/he-tree-vue/commit/d9074c27e848139186ad9a694d6da70f6e2a4517))
* **draggable plugin:** fix change event ([7c6e1e7](https://github.com/phphe/he-tree-vue/commit/7c6e1e7ba17d26ff76e323d73085063e5b3578c7))

### [2.0.7](https://github.com/phphe/he-tree-vue/compare/v2.0.7-beta.3...v2.0.7) (2020-12-13)

### [2.0.7-beta.3](https://github.com/phphe/he-tree-vue/compare/v2.0.7-beta.2...v2.0.7-beta.3) (2020-12-13)

### [2.0.7-beta.2](https://github.com/phphe/he-tree-vue/compare/v2.0.7-beta.1...v2.0.7-beta.2) (2020-12-13)

### [2.0.7-beta.1](https://github.com/phphe/he-tree-vue/compare/v2.0.6...v2.0.7-beta.1) (2020-12-13)

### [2.0.6](https://github.com/phphe/he-tree-vue/compare/v2.0.5...v2.0.6) (2020-12-13)


### Features

* **draggable plugin:** add alias after-placeholder-created for event afterPlaceholderCreated ([9c64bcc](https://github.com/phphe/he-tree-vue/commit/9c64bcce6a576beb49bebd56c4126057466da366))
* **fold plugin:** add alias node-folded-changed for event nodeFoldedChanged ([b70fc80](https://github.com/phphe/he-tree-vue/commit/b70fc80a40b035aad2cbd79d0f40b990375074a6))


### Bug Fixes

* **draggable plugin:** update dependence draggable-helper ([de98c11](https://github.com/phphe/he-tree-vue/commit/de98c114e1a22cf32d0521c86d016779028c50cd))

### [2.0.5](https://github.com/phphe/he-tree-vue/compare/v2.0.5-beta.1...v2.0.5) (2020-11-26)

### [2.0.5-beta.1](https://github.com/phphe/he-tree-vue/compare/v2.0.4-beta2...v2.0.5-beta.1) (2020-11-26)

### [2.0.4-beta2](https://github.com/phphe/he-tree-vue/compare/v2.0.4-beta1...v2.0.4-beta2) (2020-09-29)


### Features

* **draggable plugin:** add prop: edgeScrollSpecifiedContainerX, edgeScrollSpecifiedContainerY ([ae18703](https://github.com/phphe/he-tree-vue/commit/ae187039baf5ecb99d2006183254441bbfb2d644))

### [2.0.4-beta1](https://github.com/phphe/he-tree-vue/compare/v2.0.3...v2.0.4-beta1) (2020-09-29)


### Features

* **draggable plugin:** add event after-move ([b6aa068](https://github.com/phphe/he-tree-vue/commit/b6aa068b5eff1260808fc5401e44f2d5a8287fef))

### [2.0.3](https://github.com/phphe/he-tree-vue/compare/v2.0.1...v2.0.3) (2020-08-08)


### Features

* **draggable plugin:** up draggable-helper,add opt preventTextSelection fix about stacking context ([9df8670](https://github.com/phphe/he-tree-vue/commit/9df8670fa95b7bbdb4cac72cb533bccffdb90a36))


### Bug Fixes

* **draggable plugin:** update dependence draggable-helper to 5.0.3 ([7cc19de](https://github.com/phphe/he-tree-vue/commit/7cc19deb1cb5360f85898bbf8414a24c93668c31))

### [2.0.1](https://github.com/phphe/he-tree-vue/compare/v2.0.0...v2.0.1) (2020-06-11)

## 2.0.0 (2020-06-11)


### Features

* **base tree, draggable plugin:** RTL support ([bbdcba4](https://github.com/phphe/he-tree-vue/commit/bbdcba4b1eceef6596e3628f1dd5180ddc4dc090)), closes [#17](https://github.com/phphe/he-tree-vue/issues/17)
* **draggable plugin:** add option triggerBySelf ([b0be699](https://github.com/phphe/he-tree-vue/commit/b0be699d27f309d634a25aa2a88a074d5d6693b4))
* **draggable plugin:** edge scroll ([843510e](https://github.com/phphe/he-tree-vue/commit/843510e1d66e1e66abf4c9643490fd8d65fe514e))


### Bug Fixes

* **base tree, draggable plugin:** update the usage of hp.binarySearch and hp.strRand ([877afc3](https://github.com/phphe/he-tree-vue/commit/877afc30983e1049d66438814f514e6ac5b27e51))
* **draggable plugin:** add event before-drop, move drop event to correct position ([2bad9f7](https://github.com/phphe/he-tree-vue/commit/2bad9f7ea91ae70380a6015acd4a3c1bfc109b62))
* **draggable plugin:** fix logic ([3ca59ea](https://github.com/phphe/he-tree-vue/commit/3ca59eae745a1ebca79a4054b896fed9288d0bd3))
* **type definition:** update type definition for v2 ([f66a38a](https://github.com/phphe/he-tree-vue/commit/f66a38a0131a8b42375f88f9fc75c8a906ed18e7))