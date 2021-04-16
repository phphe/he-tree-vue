/*!
 * he-tree-vue v3.0.3
 * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
 * Homepage: https://he-tree-vue.phphe.com
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var vue = require('vue');
var _toConsumableArray = _interopDefault(require('@babel/runtime/helpers/toConsumableArray'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var hp = require('helper-js');
var vf = require('vue-functions');
var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var draggableHelper = _interopDefault(require('draggable-helper'));

function cloneTreeData(treeData, opt) {
  return new hp.TreeData(treeData).clone(opt);
}
function walkTreeData(treeData, handler, opt) {
  return new hp.TreeData(treeData).walk(handler, opt);
}
function getPureTreeData(treeData) {
  var opt = {
    afterNodeCreated: function afterNodeCreated(newNode) {
      Object.keys(newNode).forEach(function (key) {
        if (key[0] === '$') {
          delete newNode[key];
        }
      });
    }
  };
  return cloneTreeData(treeData, opt);
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var template = function template() {
  var _this = this;

  // convert undefined to empty str
  var noUndefined = function noUndefined(str) {
    return str ? str : '';
  }; // tree tpl, to render recursively


  var childrenListTpl = function childrenListTpl(nodes, parent, parentPath) {
    var indentStyle = _defineProperty({}, !_this.rtl ? 'paddingLeft' : 'paddingRight', parentPath.length * _this.indent + 'px');

    var branchTpl = function branchTpl(node, index) {
      var path = [].concat(_toConsumableArray(parentPath), [index]);
      var transitionComponent = _this.foldingTransition || 'transition';

      var slotDefault = function slotDefault() {
        var original = function original() {
          if (_this.$slots.default) {
            return _this.$slots.default({
              node: node,
              index: index,
              path: path,
              tree: _this
            });
          } else {
            return node.text;
          }
        };

        if (_this.overrideSlotDefault) {
          return _this.overrideSlotDefault({
            node: node,
            index: index,
            path: path,
            tree: _this
          }, original);
        } else {
          return original();
        }
      };

      var nodebackStyle = indentStyle;

      if (node.$nodeBackStyle) {
        nodebackStyle = _objectSpread(_objectSpread({}, nodebackStyle), node.$nodeBackStyle);
      }

      return vue.createVNode("div", {
        "class": "tree-branch ".concat(noUndefined(node.$branchClass), " ").concat(noUndefined(node.$hidden && 'he-tree--hidden')),
        "style": node.$branchStyle || {},
        "data-tree-node-path": path.join(',')
      }, [vue.createVNode("div", {
        "class": "tree-node-back ".concat(noUndefined(node.$nodeBackClass)),
        "style": nodebackStyle || {}
      }, [vue.createVNode("div", {
        "class": "tree-node ".concat(noUndefined(node.$nodeClass)),
        "style": node.$nodeStyle || {}
      }, [slotDefault()])]), (node.children && node.children.length) > 0 && vue.createVNode(transitionComponent, {
        "name": _this.$props.foldingTransitionName
      }, {
        default: function _default() {
          return [!node.$folded && childrenListTpl(node.children, node, path)];
        }
      })]);
    };

    return vue.createVNode("div", {
      "class": "tree-children ".concat(noUndefined(parent === _this.rootNode && 'tree-root'), " ").concat(noUndefined(parent.$childrenClass)),
      "style": parent.$childrenStyle || {}
    }, [nodes.map(branchTpl)]);
  };

  return vue.createVNode("div", {
    "class": "he-tree ".concat(this.treeClass, " ").concat(noUndefined(this.rtl && 'he-tree--rtl')),
    "data-tree-id": this.treeId
  }, [this.blockHeader && this.blockHeader(), childrenListTpl(this.rootNode.children, this.rootNode, []), this.blockFooter && this.blockFooter()]);
};

var trees = {};
var Tree = {
  render: template,
  mixins: [vf.updatablePropsEvenUnbound({
    value: {
      $localName: 'treeData',
      required: true
    }
  }), vf.hookHelper],
  props: {
    indent: {
      type: Number,
      default: 20
    },
    rtl: {
      type: Boolean
    },
    rootNode: {
      default: function _default(is) {
        return {};
      }
    }
  },
  // components: {},
  data: function data() {
    return {
      trees: trees,
      treeClass: '',
      treeId: hp.randString(),
      // hooks of render
      blockHeader: null,
      blockFooter: null,
      overrideSlotDefault: null
    };
  },
  // computed: {},
  watch: {
    treeData: {
      immediate: true,
      handler: function handler(treeData) {
        this._TreeDataHelper = new hp.TreeData(this.treeData);
      }
    }
  },
  methods: {
    iteratePath: function iteratePath(path, opt) {
      return this._TreeDataHelper.iteratePath(path, opt);
    },
    getTreeVmByTreeEl: function getTreeVmByTreeEl(treeEl) {
      return this.trees[treeEl.getAttribute('data-tree-id')];
    },
    getAllNodesByPath: function getAllNodesByPath(path) {
      return this._TreeDataHelper.getAllNodes(path);
    },
    getNodeByPath: function getNodeByPath(path) {
      return this._TreeDataHelper.getNode(path);
    },
    getPathByBranchEl: function getPathByBranchEl(branchEl) {
      return branchEl.getAttribute('data-tree-node-path').split(',').map(function (v) {
        return parseInt(v);
      });
    },
    getBranchElByPath: function getBranchElByPath(path) {
      return this.$el.querySelector("[data-tree-node-path='".concat(path.join(','), "']"));
    },
    getNodeByBranchEl: function getNodeByBranchEl(branchEl) {
      return this.getNodeByPath(this.getPathByBranchEl(branchEl));
    },
    getNodeParentByPath: function getNodeParentByPath(path) {
      return this._TreeDataHelper.getNodeParent(path);
    },
    removeNodeByPath: function removeNodeByPath(path) {
      return this._TreeDataHelper.removeNode(path);
    },
    walkTreeData: function walkTreeData$1(handler, opt) {
      return walkTreeData(this.treeData, handler, opt);
    },
    cloneTreeData: function cloneTreeData$1(opt) {
      return cloneTreeData(this.treeData, opt);
    },
    // return cloned new tree data without property witch starts with `$`
    getPureTreeData: function getPureTreeData$1() {
      return getPureTreeData(this.treeData);
    }
  },
  created: function created() {
    var _this2 = this;

    //
    var updateRootNode = function updateRootNode() {
      _this2.rootNode.children = _this2.treeData;
    };

    this.$watch('rootNode', updateRootNode, {
      immediate: true
    });
    this.$watch('treeData', updateRootNode, {
      immediate: true
    });
  },
  mounted: function mounted() {
    //
    this.treeId = hp.randString();
    this.trees[this.treeId] = this;
  },
  beforeUnmount: function beforeUnmount() {
    delete this.trees[this.treeId];
  },
  //
  mixPlugins: function mixPlugins(plugins) {
    var MixedTree = {
      name: 'Tree',
      extends: Tree,
      mixins: plugins,
      mixPlugins: this.mixPlugins
    };
    return MixedTree;
  }
};

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function foldAll(treeData) {
  walkTreeData(treeData, function (childNode) {
    childNode.$folded = true;
  });
}
function unfoldAll(treeData) {
  walkTreeData(treeData, function (childNode) {
    childNode.$folded = false;
  });
}
var fold = {
  props: {
    foldingTransitionName: {
      type: String
    },
    foldingTransition: {},
    foldAllAfterMounted: {
      type: Boolean
    }
  },
  emits: ['nodeFoldedChanged', 'node-folded-changed'],
  methods: {
    fold: function fold(node, path) {
      if (!node.$folded) {
        node['$folded'] = true;
        this.$emit('nodeFoldedChanged', node);
        this.$emit('node-folded-changed', node);
      }
    },
    unfold: function unfold(node, path) {
      var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      opt = _objectSpread$1({
        foldOthers: false
      }, opt);

      if (opt.foldOthers) {
        this.foldAll();
      }

      if (node.$folded) {
        node['$folded'] = false;
        this.$emit('nodeFoldedChanged', node);
      }
    },
    toggleFold: function toggleFold(node, path, opt) {
      if (node.$folded) {
        this.unfold(node, path, opt);
      } else {
        this.fold(node, path, opt);
      }
    },
    foldAll: function foldAll() {
      var _this = this;

      this.walkTreeData(function (childNode) {
        _this.fold(childNode);
      });
    },
    unfoldAll: function unfoldAll() {
      var _this2 = this;

      this.walkTreeData(function (childNode) {
        _this2.unfold(childNode, {
          unfoldParent: false
        });
      });
    }
  },
  mounted: function mounted() {
    if (this.foldAllAfterMounted) {
      this.foldAll();
    }
  }
};

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var check = {
  props: {},
  methods: {
    afterCheckChanged: function afterCheckChanged(node, path) {
      // update parent
      var nodes = this.getAllNodesByPath(path);
      var reversedParents = nodes.slice(0, nodes.length - 1);
      reversedParents.reverse();

      var _iterator = _createForOfIteratorHelper(reversedParents),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var parent = _step.value;
          parent['$checked'] = parent.children.every(function (child) {
            return child.$checked;
          });
        } // update children

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (node.children && node.children.length > 0) {
        walkTreeData(node.children, function (childNode) {
          childNode['$checked'] = node.$checked;
        });
      }
    },
    check: function check(node, path) {
      node['$checked'] = true;
      this.afterCheckChanged(node, path);
    },
    uncheck: function uncheck(node, path) {
      node['$checked'] = false;
      this.afterCheckChanged(node, path);
    },
    toggleCheck: function toggleCheck(node, path) {
      node['$checked'] = !node.$checked;
      this.afterCheckChanged(node, path);
    }
  }
};

function doDraggableDecision (_ref) {
  var conditions = _ref.conditions,
      doAction = _ref.doAction;

  // decision start =================================
  if (conditions['no closest'] === true) {
    doAction('append to root');
  } else if (conditions['no closest'] === false) {
    if (conditions['closest is top'] === true) {
      if (conditions['on closest middle'] === true) {
        doAction('insert before');
      } else if (conditions['on closest middle'] === false) {
        if (conditions['at closest indent right'] === true) {
          doAction('prepend');
        } else if (conditions['at closest indent right'] === false) {
          if (conditions['closest is placeholder'] === true) {
            doAction('insert after');
          } else if (conditions['closest is placeholder'] === false) {
            if (conditions['closest has children excluding placeholder movingEl'] === true) {
              doAction('prepend');
            } else if (conditions['closest has children excluding placeholder movingEl'] === false) {
              doAction('insert after');
            }
          }
        }
      }
    } else if (conditions['closest is top'] === false) {
      if (conditions['on closest middle'] === true) {
        if (conditions['at closest indent right'] === false) {
          if (conditions['at closest left'] === false) {
            if (conditions['closest is placeholder'] === false) {
              if (conditions['closest has next'] === true) {
                if (conditions['closest has children excluding placeholder movingEl'] === false) {
                  doAction('insert after');
                } else if (conditions['closest has children excluding placeholder movingEl'] === true) {
                  doAction('prepend');
                }
              } else if (conditions['closest has next'] === false) {
                if (conditions['closest has children excluding placeholder movingEl'] === true) {
                  doAction('prepend');
                } else if (conditions['closest has children excluding placeholder movingEl'] === false) {
                  doAction('insert after');
                }
              }
            } else if (conditions['closest is placeholder'] === true) {
              doAction('nothing');
            }
          } else if (conditions['at closest left'] === true) {
            if (conditions['closest is placeholder'] === true) {
              if (conditions['no aboveBranch'] === true) {
                doAction('nothing');
              } else if (conditions['no aboveBranch'] === false) {
                doAction('after above');
              }
            } else if (conditions['closest is placeholder'] === false) {
              if (conditions['closest has children excluding placeholder movingEl'] === false) {
                doAction('insert after');
              } else if (conditions['closest has children excluding placeholder movingEl'] === true) {
                doAction('prepend');
              }
            }
          }
        } else if (conditions['at closest indent right'] === true) {
          if (conditions['closest is placeholder'] === false) {
            if (conditions['closest has next'] === true) {
              if (conditions['closest has children excluding placeholder movingEl'] === false) {
                doAction('prepend');
              } else if (conditions['closest has children excluding placeholder movingEl'] === true) {
                if (conditions['closest is top excluding placeholder'] === true) {
                  doAction('insert before');
                } else if (conditions['closest is top excluding placeholder'] === false) {
                  doAction('prepend');
                }
              }
            } else if (conditions['closest has next'] === false) {
              doAction('prepend');
            }
          } else if (conditions['closest is placeholder'] === true) {
            if (conditions['no aboveBranch'] === true) {
              if (conditions['closest has prev'] === false) {
                doAction('nothing');
              } else if (conditions['closest has prev'] === true) {
                doAction('append to prev');
              }
            } else if (conditions['no aboveBranch'] === false) {
              if (conditions['closest has prev'] === true) {
                doAction('append to prev');
              } else if (conditions['closest has prev'] === false) {
                doAction('nothing');
              }
            }
          }
        }
      } else if (conditions['on closest middle'] === false) {
        if (conditions['at closest indent right'] === false) {
          if (conditions['at closest left'] === false) {
            if (conditions['closest is placeholder'] === false) {
              if (conditions['closest has children excluding placeholder movingEl'] === true) {
                doAction('prepend');
              } else if (conditions['closest has children excluding placeholder movingEl'] === false) {
                doAction('insert after');
              }
            } else if (conditions['closest is placeholder'] === true) {
              doAction('nothing');
            }
          } else if (conditions['at closest left'] === true) {
            if (conditions['closest is placeholder'] === true) {
              if (conditions['no aboveBranch'] === false) {
                doAction('after above');
              } else if (conditions['no aboveBranch'] === true) {
                doAction('nothing');
              }
            } else if (conditions['closest is placeholder'] === false) {
              if (conditions['closest has next'] === false) {
                if (conditions['closest has children excluding placeholder movingEl'] === false) {
                  doAction('insert after');
                } else if (conditions['closest has children excluding placeholder movingEl'] === true) {
                  doAction('prepend');
                }
              } else if (conditions['closest has next'] === true) {
                if (conditions['closest has children excluding placeholder movingEl'] === true) {
                  doAction('prepend');
                } else if (conditions['closest has children excluding placeholder movingEl'] === false) {
                  doAction('insert after');
                }
              }
            }
          }
        } else if (conditions['at closest indent right'] === true) {
          if (conditions['closest is placeholder'] === true) {
            if (conditions['no aboveBranch'] === true) {
              if (conditions['closest has prev'] === false) {
                doAction('nothing');
              } else if (conditions['closest has prev'] === true) {
                doAction('append to prev');
              }
            } else if (conditions['no aboveBranch'] === false) {
              if (conditions['closest has prev'] === true) {
                doAction('append to prev');
              } else if (conditions['closest has prev'] === false) {
                doAction('nothing');
              }
            }
          } else if (conditions['closest is placeholder'] === false) {
            doAction('prepend');
          }
        }
      }
    }
  } // decision end =================================

}

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function makeTreeDraggable(treeEl) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  options = _objectSpread$2(_objectSpread$2({}, options), {}, {
    treeEl: treeEl
  });

  var _draggableHelper = draggableHelper(treeEl, {
    triggerClassName: options.triggerClass,
    triggerBySelf: options.triggerBySelf,
    draggingClassName: options.draggingClass,
    clone: options.cloneWhenDrag,
    edgeScroll: options.edgeScroll,
    edgeScrollTriggerMargin: options.edgeScrollTriggerMargin,
    edgeScrollSpeed: options.edgeScrollSpeed,
    edgeScrollTriggerMode: options.edgeScrollTriggerMode,
    edgeScrollSpecifiedContainerX: options.edgeScrollSpecifiedContainerX,
    edgeScrollSpecifiedContainerY: options.edgeScrollSpecifiedContainerY,
    rtl: options.rtl,
    preventTextSelection: options.preventTextSelection,
    updateMovedElementStyleManually: true,
    getMovedOrClonedElement: function getMovedOrClonedElement(directTriggerElement, store) {
      // find closest branch from parents
      var el = hp.findParent(store.triggerElement, function (el) {
        return hp.hasClass(el, options.branchClass);
      }, {
        withSelf: true
      });
      return el;
    },
    beforeFirstMove: function beforeFirstMove(store, dhOptions) {
      store.startTreeEl = treeEl;
      store.dragBranchEl = store.movedElement;
      store.startPath = options.getPathByBranchEl(store.movedOrClonedElement);

      if (options.beforeFirstMove && options.beforeFirstMove(store, dhOptions) === false) {
        return false;
      }
    },
    beforeMove: function beforeMove(store, dhOptions) {
      var updatePlaceholderIndent = function updatePlaceholderIndent() {
        // set indent of placeholder
        var placeholderPath = options.getPathByBranchEl(store.placeholder);
        var placeholderNodeBack = store.placeholder.querySelector(".".concat(options.nodeBackClass));
        placeholderNodeBack.style[!options.rtl ? 'paddingLeft' : 'paddingRight'] = (placeholderPath.length - 1) * options.indent + 'px'; // remove tempChildren if empty

        if (store.tempChildren.children.length === 0) {
          hp.removeEl(store.tempChildren);
        }
      }; // first move
      // 第一次移动


      if (store.movedCount === 0) {
        // create placeholder
        // 创建占位元素
        var placeholder = hp.createElementFromHTML("\n          <div id=\"".concat(options.placeholderId, "\" class=\"").concat(options.branchClass, " ").concat(options.placeholderClass, "\">\n            <div class=\"").concat(options.nodeBackClass, " ").concat(options.placeholderNodeBackClass, "\">\n              <div class=\"").concat(options.nodeClass, " ").concat(options.placeholderNodeClass, "\">\n              </div>\n            </div>\n          </div>\n        "));
        hp.insertAfter(placeholder, store.movedOrClonedElement);
        store.placeholder = placeholder;
        options.afterPlaceholderCreated(store); // create a tree children el to use when can't get childrenEl

        var tempChildren = document.createElement('DIV');
        hp.addClass(tempChildren, options.childrenClass);
        store.tempChildren = tempChildren; // update placeholder indent. update moved element style

        updatePlaceholderIndent();
        store.updateMovedElementStyle(); // skip first move
        // 跳过第一次移动

        return;
      } // 


      store.updateMovedElementStyle(); // 

      store.oneMoveStore = {}; // life cycle: one move

      var movingEl = store.movedElement; // branch
      // find closest branch and hovering tree

      var _tree;

      var movingNode = movingEl.querySelector(".".concat(options.nodeClass)); // movingNodeOf and movingNodeRect are not always real. when RTL, there 'x' is top right. when draggingNodePositionMode is mouse, there x and y are mouse position. So don't calc them with their width or height.
      // movingNodeOf 和 movingNodeRect并非一直如字面意义是movingNode真实坐标. RTL时, x坐标是右上角. draggingNodePositionMode是mouse时, x和y是鼠标坐标.

      var movingNodeOf = hp.getOffset(movingNode);
      var movingNodeRect = hp.getBoundingClientRect(movingNode);

      if (options.draggingNodePositionMode === 'mouse') {
        // use mouse position as dragging node position
        var moveEvent = store.moveEvent;
        movingNodeOf = {
          x: moveEvent.pageX,
          y: moveEvent.pageY
        };
        movingNodeRect = {
          x: moveEvent.clientX,
          y: moveEvent.clientY
        };
      } else if (options.rtl) {
        movingNodeOf.x += movingNode.offsetWidth;
        movingNodeRect.x += movingNode.offsetWidth;
      } // find tree with elementsFromPoint


      var found;
      var firstElement;

      var _iterator = _createForOfIteratorHelper$1(hp.elementsFromPoint(movingNodeRect.x, movingNodeRect.y)),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var itemEl = _step.value;

          if (!firstElement) {
            firstElement = itemEl;
          }

          if (hp.hasClass(itemEl, options.treeClass)) {
            found = itemEl;
            break;
          }
        } // check if the found element is covered by other elements

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (firstElement !== found && !hp.isDescendantOf(firstElement, found)) {
        found = null;
      }

      _tree = found;

      if (!_tree) {
        // out of tree or tree is covered by other elements
        return;
      } // check if target tree right


      if (options.filterTargetTree(_tree, store, dhOptions) === false) {
        return;
      }

      store.targetTreeEl = _tree; // info ========================================
      // life cycle: one move

      var info = {
        tree: function tree() {
          return _tree;
        },
        root: function root() {
          return info.tree.querySelector(".".concat(options.childrenClass));
        },
        closestNode: function closestNode() {
          var nodes = []; // all visible nodes sort by y

          var walkToGetNodes = function walkToGetNodes(branch) {
            //
            if (branch !== info.tree) {
              var node = branch.querySelector(".".concat(options.nodeClass));

              if (node && !isElementHidden(node)) {
                nodes.push(node);
              }
            } //


            var childrenEl = branch.querySelector(".".concat(options.childrenClass));

            if (childrenEl) {
              for (var i = 0; i < childrenEl.children.length; i++) {
                var child = childrenEl.children[i];

                if (child !== movingEl && hp.hasClass(child, options.branchClass)) {
                  walkToGetNodes(child);
                }
              }
            }
          };

          walkToGetNodes(info.tree); //

          if (nodes.length === 0) {
            return;
          } //


          var found;
          var t = hp.binarySearch(nodes, function (node) {
            return hp.getOffset(node).y - movingNodeOf.y;
          }, {
            returnNearestIfNoHit: true
          });

          if (t.hit) {
            found = t.value;
          } else {
            if (t.greater) {
              found = nodes[t.index - 1] || t.value;
            } else {
              found = t.value;
            }
          }

          return found;
        },
        closestNodeOffset: function closestNodeOffset() {
          return hp.getOffset(info.closestNode);
        },
        closestBranch: function closestBranch() {
          return hp.findParent(info.closestNode, function (el) {
            return hp.hasClass(el, options.branchClass);
          });
        },
        closestNext: function closestNext() {
          var next = info.closestBranch.nextSibling;

          while (next) {
            if (next !== movingEl && hp.hasClass(next, options.branchClass) && !isElementHidden(next)) {
              return next;
            }

            next = next.nextSibling;
          }
        },
        closestPrev: function closestPrev() {
          var prev = info.closestBranch.previousSibling;

          while (prev) {
            if (prev !== movingEl && hp.hasClass(prev, options.branchClass) && !isElementHidden(prev)) {
              return prev;
            }

            prev = prev.previousSibling;
          }
        },
        aboveBranch: function aboveBranch() {
          // find above from branch to root
          // closestBranch must be placeholder
          if (info.closestBranch !== store.placeholder) {
            return;
          }

          if (conditions['closest has next']) {
            return;
          } // find placeholder prev or parent


          var cur = info.closestBranch;
          var prev = cur.previousSibling;
          var found;

          while (prev) {
            if (prev !== movingEl && hp.hasClass(prev, options.branchClass) && !isElementHidden(prev)) {
              cur = prev;
              found = true;
              break;
            }

            prev = prev.previousSibling;
          }

          if (!found) {
            cur = hp.findParent(cur, function (el) {
              return hp.hasClass(el, options.branchClass);
            });
          } //


          while (cur) {
            var curNode = cur.querySelector(".".concat(options.nodeClass));

            if (!options.rtl) {
              if (hp.getOffset(curNode).x <= movingNodeOf.x) {
                break;
              }
            } else {
              if (hp.getOffset(curNode).x + curNode.offsetWidth >= movingNodeOf.x) {
                break;
              }
            }

            var hasNextBranch = void 0;
            var t = cur.nextSibling;

            while (t) {
              if (t !== movingEl && t !== store.placeholder && hp.hasClass(t, options.branchClass) && !isElementHidden(t)) {
                hasNextBranch = true;
                break;
              }

              t = t.nextSibling;
            }

            if (hasNextBranch) {
              break;
            }

            var parent = hp.findParent(cur, function (el) {
              return hp.hasClass(el, options.branchClass);
            });

            if (!parent) {
              break;
            }

            cur = parent;
          }

          return cur;
        }
      }; // conditions ========================================
      // life cycle: one move

      var conditions = {
        'no closest': function noClosest() {
          return !info.closestNode;
        },
        'closest is top': function closestIsTop() {
          return info.closestBranch === hp.findNodeList(info.root.children, function (el) {
            return el !== movingEl && !isElementHidden(el);
          });
        },
        'closest is top excluding placeholder': function closestIsTopExcludingPlaceholder() {
          return info.closestBranch === hp.findNodeList(info.root.children, function (el) {
            return el !== movingEl && el !== store.placeholder && !isElementHidden(el);
          });
        },
        'on closest middle': function onClosestMiddle() {
          return movingNodeOf.y < info.closestNodeOffset.y + info.closestNode.offsetHeight / 2;
        },
        'at closest indent right': function atClosestIndentRight() {
          return movingNodeOf.x > info.closestNodeOffset.x + options.indent;
        },
        'at closest left': function atClosestLeft() {
          return movingNodeOf.x < info.closestNodeOffset.x;
        },
        'closest is placeholder': function closestIsPlaceholder() {
          return info.closestBranch === store.placeholder;
        },
        'no aboveBranch': function noAboveBranch() {
          return !info.aboveBranch;
        },
        'closest has next': function closestHasNext() {
          return info.closestNext;
        },
        'closest has prev': function closestHasPrev() {
          return info.closestPrev;
        },
        'closest has children excluding placeholder movingEl': function closestHasChildrenExcludingPlaceholderMovingEl() {
          var childrenEl = info.closestBranch.querySelector(".".concat(options.childrenClass));

          if (childrenEl) {
            return hp.findNodeList(childrenEl.children, function (el) {
              return el !== movingEl && el !== store.placeholder && !isElementHidden(el);
            });
          }
        }
      }; // fix for rtl

      if (options.rtl) {
        Object.assign(conditions, {
          'at closest indent right': function atClosestIndentRight() {
            return movingNodeOf.x < info.closestNodeOffset.x + info.closestNode.offsetWidth - options.indent;
          },
          // at indent left
          'at closest left': function atClosestLeft() {
            return movingNodeOf.x > info.closestNodeOffset.x + info.closestNode.offsetWidth;
          } // at right

        });
      } // convert conditions result to Boolean


      Object.keys(conditions).forEach(function (key) {
        var old = conditions[key];

        conditions[key] = function () {
          return Boolean(old.call(this));
        };
      }); //

      hp.attachCache(info, info);
      hp.attachCache(conditions, conditions);
      store.oneMoveStore.info = info;
      store.oneMoveStore.conditions = conditions; // actions start ========================================

      var doAction = function doAction(name) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        if (!store._doActionQueue) {
          store._doActionQueue = Promise.resolve();
        }

        var queue = store._doActionQueue;
        store._doActionQueue = queue.then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
          var actionRecords, action, r;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  // record tried actions in one move
                  if (!store.oneMoveStore.actionRecords) {
                    store.oneMoveStore.actionRecords = [];
                  }

                  actionRecords = store.oneMoveStore.actionRecords; //

                  action = actions[name];
                  r = action.apply(void 0, args);
                  actionRecords.push(name);
                  _context.next = 7;
                  return r;

                case 7:
                  updatePlaceholderIndent();

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        })));
      };

      var actions = {
        'nothing': function nothing() {
          return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }))();
        },
        // do nothing
        'append to root': function appendToRoot() {
          return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
            return _regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    // no closest branch, just append to root
                    if (options.isTargetTreeRootDroppable(store)) {
                      hp.appendTo(store.placeholder, info.root);
                    }

                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }))();
        },
        'insert before': function insertBefore() {
          return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
            return _regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!options.isNodeParentDroppable(info.closestBranch, store.targetTreeEl)) {
                      _context4.next = 4;
                      break;
                    }

                    hp.insertBefore(store.placeholder, info.closestBranch);
                    _context4.next = 5;
                    break;

                  case 4:
                    return _context4.abrupt("return", secondCase(getParentBranchByEl(info.closestBranch)));

                  case 5:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          }))();
        },
        'insert after': function insertAfter() {
          var _arguments = arguments;
          return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
            var branch, moved, isFirstTriedAction;
            return _regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    branch = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : info.closestBranch;

                    if (!options.isNodeParentDroppable(branch, store.targetTreeEl)) {
                      _context5.next = 5;
                      break;
                    }

                    hp.insertAfter(store.placeholder, branch);
                    _context5.next = 11;
                    break;

                  case 5:
                    _context5.next = 7;
                    return secondCase(getParentBranchByEl(branch));

                  case 7:
                    moved = _context5.sent;
                    isFirstTriedAction = !store.oneMoveStore.actionRecords || store.oneMoveStore.actionRecords.length === 1;

                    if (!(!moved && isFirstTriedAction)) {
                      _context5.next = 11;
                      break;
                    }

                    return _context5.abrupt("return", thirdCase(branch));

                  case 11:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5);
          }))();
        },
        prepend: function prepend() {
          return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6() {
            return _regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    if (!(info.closestBranch === store.placeholder)) {
                      _context6.next = 2;
                      break;
                    }

                    return _context6.abrupt("return");

                  case 2:
                    if (!(options.ifNodeFolded(info.closestBranch, store) && !options.unfoldWhenDragover)) {
                      _context6.next = 6;
                      break;
                    }

                    return _context6.abrupt("return", doAction('insert after', info.closestBranch));

                  case 6:
                    if (!options.isNodeDroppable(info.closestBranch, store.targetTreeEl)) {
                      _context6.next = 11;
                      break;
                    }

                    _context6.next = 9;
                    return tryUnfoldAndPrepend(info.closestBranch);

                  case 9:
                    _context6.next = 12;
                    break;

                  case 11:
                    return _context6.abrupt("return", secondCase(info.closestBranch));

                  case 12:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6);
          }))();
        },
        'after above': function afterAbove() {
          return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7() {
            return _regeneratorRuntime.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    if (!options.isNodeParentDroppable(info.aboveBranch, store.targetTreeEl)) {
                      _context7.next = 4;
                      break;
                    }

                    hp.insertAfter(store.placeholder, info.aboveBranch);
                    _context7.next = 5;
                    break;

                  case 4:
                    return _context7.abrupt("return", secondCase(getParentBranchByEl(info.aboveBranch)));

                  case 5:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7);
          }))();
        },
        'append to prev': function appendToPrev() {
          return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8() {
            var childrenEl;
            return _regeneratorRuntime.wrap(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    if (!(info.closestPrev === store.placeholder)) {
                      _context8.next = 2;
                      break;
                    }

                    return _context8.abrupt("return");

                  case 2:
                    if (!options.ifNodeFolded(info.closestPrev, store)) {
                      _context8.next = 6;
                      break;
                    }

                    return _context8.abrupt("return", doAction('insert after', info.closestPrev));

                  case 6:
                    if (!options.isNodeDroppable(info.closestPrev, store.targetTreeEl)) {
                      _context8.next = 13;
                      break;
                    }

                    _context8.next = 9;
                    return unfoldAndGetChildrenEl(info.closestPrev);

                  case 9:
                    childrenEl = _context8.sent;
                    hp.appendTo(store.placeholder, childrenEl);
                    _context8.next = 14;
                    break;

                  case 13:
                    return _context8.abrupt("return", secondCase(info.closestPrev));

                  case 14:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee8);
          }))();
        }
      }; // second case for actions, when target position not droppable
      // return true if moved

      var secondCase = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9(branchEl) {
          var targetEl;
          return _regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  if (!branchEl) {
                    _context9.next = 5;
                    break;
                  }

                  targetEl = options._findClosestDroppablePosition(branchEl, store.targetTreeEl);

                  if (!targetEl) {
                    _context9.next = 5;
                    break;
                  }

                  hp.insertAfter(store.placeholder, targetEl);
                  return _context9.abrupt("return", true);

                case 5:
                case "end":
                  return _context9.stop();
              }
            }
          }, _callee9);
        }));

        return function secondCase(_x) {
          return _ref2.apply(this, arguments);
        };
      }(); // when action is after, first case and second case invalid, try prepend
      // 当操作是'after', 第一种第二种情况无效时, 尝试prepend


      var thirdCase = /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10(branchEl) {
          return _regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  if (!(!options.ifNodeFolded(branchEl, store) && options.isNodeDroppable(branchEl, store.targetTreeEl))) {
                    _context10.next = 3;
                    break;
                  }

                  _context10.next = 3;
                  return tryUnfoldAndPrepend(branchEl);

                case 3:
                case "end":
                  return _context10.stop();
              }
            }
          }, _callee10);
        }));

        return function thirdCase(_x2) {
          return _ref3.apply(this, arguments);
        };
      }();

      var unfoldAndGetChildrenEl = /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee11(branch) {
          var childrenEl;
          return _regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  _context11.next = 2;
                  return options.unfoldTargetNodeByEl(branch, store);

                case 2:
                  childrenEl = branch.querySelector(".".concat(options.childrenClass));

                  if (!childrenEl) {
                    childrenEl = store.tempChildren;
                    hp.appendTo(childrenEl, branch);
                  }

                  return _context11.abrupt("return", childrenEl);

                case 5:
                case "end":
                  return _context11.stop();
              }
            }
          }, _callee11);
        }));

        return function unfoldAndGetChildrenEl(_x3) {
          return _ref4.apply(this, arguments);
        };
      }();

      var tryUnfoldAndPrepend = /*#__PURE__*/function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee13(branchEl) {
          var func, oneMoveStore;
          return _regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  func = /*#__PURE__*/function () {
                    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee12() {
                      var childrenEl;
                      return _regeneratorRuntime.wrap(function _callee12$(_context12) {
                        while (1) {
                          switch (_context12.prev = _context12.next) {
                            case 0:
                              _context12.next = 2;
                              return unfoldAndGetChildrenEl(branchEl);

                            case 2:
                              childrenEl = _context12.sent;
                              hp.prependTo(store.placeholder, childrenEl);

                            case 4:
                            case "end":
                              return _context12.stop();
                          }
                        }
                      }, _callee12);
                    }));

                    return function func() {
                      return _ref6.apply(this, arguments);
                    };
                  }();

                  if (!options.ifNodeFolded(branchEl, store)) {
                    _context13.next = 6;
                    break;
                  }

                  // delay if node folded
                  oneMoveStore = store.oneMoveStore;
                  setTimeout(function () {
                    // check if expired
                    if (oneMoveStore === store.oneMoveStore) {
                      func();
                    }
                  }, options.unfoldWhenDragoverDelay);
                  _context13.next = 8;
                  break;

                case 6:
                  _context13.next = 8;
                  return func();

                case 8:
                case "end":
                  return _context13.stop();
              }
            }
          }, _callee13);
        }));

        return function tryUnfoldAndPrepend(_x4) {
          return _ref5.apply(this, arguments);
        };
      }(); // actions end ========================================


      doDraggableDecision({
        options: options,
        event: store.moveEvent,
        store: store,
        opt: dhOptions,
        info: info,
        conditions: conditions,
        actions: actions,
        doAction: doAction
      });
    },
    afterMove: function afterMove(store, dhOptions) {
      options.afterMove && options.afterMove(store, dhOptions);
    },
    beforeDrop: function () {
      var _beforeDrop = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee14(store, dhOptions) {
        var endEvent, movingEl, placeholder, tempChildren, movedCount, targetTreeEl, startTreeEl, maskTree, maskTree2, pathChanged, isPathChanged;
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                isPathChanged = function _isPathChanged() {
                  var startTree = store.startTree,
                      targetTree = store.targetTree,
                      startPath = store.startPath,
                      targetPath = store.targetPath;

                  if (startTree === targetTree && startPath.length === targetPath.length) {
                    if (startPath.toString() === targetPath.toString()) {
                      return false;
                    } else {
                      // downward same-level move, the end of targetPath is 1 more than real value 
                      // 同级向下移动时, targetPath的末位比真实值大1
                      var t = startPath.slice(0);
                      t[t.length - 1]++;

                      if (t.toString() === targetPath.toString()) {
                        return false;
                      }
                    }
                  }

                  return true;
                };

                endEvent = store.endEvent;
                movingEl = store.movedElement; // branch

                placeholder = store.placeholder, tempChildren = store.tempChildren, movedCount = store.movedCount, targetTreeEl = store.targetTreeEl, startTreeEl = store.startTreeEl; // use mask tree to avoid flick caused by DOM update in short time
                // 复制 targetTreeEl 作为遮罩, 避免短时间内更新DOM引起的闪烁

                if (targetTreeEl) {
                  // No targetTreeEl mean no valid move.
                  // targetTreeEl不存在意味着没有有效移动.
                  // create mask tree
                  maskTree = targetTreeEl.cloneNode(true);
                  targetTreeEl.style.display = 'none';
                  hp.insertAfter(maskTree, targetTreeEl);

                  if (startTreeEl !== targetTreeEl) {
                    maskTree2 = startTreeEl.cloneNode(true);
                    startTreeEl.style.display = 'none';
                    hp.insertAfter(maskTree2, startTreeEl);
                  } //


                  store.targetPath = options.getPathByBranchEl(placeholder);
                  pathChanged = isPathChanged();
                  store.targetPathNotEqualToStartPath = pathChanged;
                  store.pathChangePrevented = false;

                  if (options.beforeDrop && options.beforeDrop(pathChanged, store, dhOptions) === false) {
                    pathChanged = false;
                    store.pathChangePrevented = false;
                  }

                  store.pathChanged = pathChanged;
                } // destroy placeholder and tempChildren


                hp.removeEl(placeholder);

                if (tempChildren) {
                  hp.removeEl(tempChildren);
                }

                store.updateMovedElementStyle(); // 

                _context14.next = 10;
                return options.afterDrop(store, dhOptions);

              case 10:
                if (!maskTree) {
                  _context14.next = 16;
                  break;
                }

                _context14.next = 13;
                return hp.waitTime(30);

              case 13:
                hp.removeEl(maskTree);
                targetTreeEl.style.display = 'block';

                if (maskTree2) {
                  hp.removeEl(maskTree2);
                  startTreeEl.style.display = 'block';
                }

              case 16:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      function beforeDrop(_x5, _x6) {
        return _beforeDrop.apply(this, arguments);
      }

      return beforeDrop;
    }()
  }),
      destroy = _draggableHelper.destroy,
      draggableHelperOptions = _draggableHelper.options;

  return {
    destroy: destroy,
    options: options,
    optionsUpdated: optionsUpdated
  };

  function getParentBranchByEl(el) {
    return hp.findParent(el, function (el) {
      if (hp.hasClass(el, options.branchClass)) {
        return true;
      }

      if (hp.hasClass(el, options.rootClass)) {
        return 'break';
      }
    });
  }

  function optionsUpdated() {
    Object.assign(draggableHelperOptions, {
      triggerClassName: options.triggerClass,
      triggerBySelf: options.triggerBySelf,
      draggingClassName: options.draggingClass,
      clone: options.cloneWhenDrag,
      // edgeScroll
      edgeScroll: options.edgeScroll,
      edgeScrollTriggerMargin: options.edgeScrollTriggerMargin,
      edgeScrollSpeed: options.edgeScrollSpeed,
      edgeScrollTriggerMode: options.edgeScrollTriggerMode,
      // 
      rtl: options.rtl,
      preventTextSelection: options.preventTextSelection
    });
  }
}

function isElementHidden(el) {
  return el.offsetWidth === 0 && el.offsetHeight === 0;
}

function _createForOfIteratorHelper$2(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var treesStore = {};
var Draggable_vue = {
  props: {
    triggerClass: {
      type: [String, Array],
      default: 'tree-node'
    },
    triggerBySelf: {
      type: Boolean
    },
    draggable: {
      type: [Boolean, Function],
      default: true
    },
    droppable: {
      type: [Boolean, Function],
      default: true
    },
    eachDraggable: {
      type: [Function]
    },
    // type: [Boolean, Function]
    eachDroppable: {
      type: [Function]
    },
    // type: [Boolean, Function]
    ondragstart: {
      type: Function
    },
    ondragend: {
      type: Function
    },
    unfoldWhenDragover: {
      type: Boolean,
      default: true
    },
    unfoldWhenDragoverDelay: {
      type: Number,
      default: 30
    },
    draggingNodePositionMode: {
      type: String,
      default: 'top_left_corner'
    },
    // top_left_corner, mouse
    edgeScroll: {
      type: Boolean
    },
    edgeScrollTriggerMargin: {
      type: Number,
      default: 50
    },
    edgeScrollSpeed: {
      type: Number,
      default: 0.35
    },
    edgeScrollTriggerMode: {
      type: String,
      default: 'top_left_corner'
    },
    edgeScrollSpecifiedContainerX: {},
    // HTMLElement || ((store) => HTMLElement)
    edgeScrollSpecifiedContainerY: {},
    // HTMLElement || ((store) => HTMLElement)
    preventTextSelection: {
      type: Boolean,
      default: true
    }
  },
  emits: ['afterPlaceholderCreated', 'after-placeholder-created', 'before-first-move', 'drag', 'he-tree-drag', 'after-move', 'he-tree-before-drop', 'input', 'change', 'drop', 'he-tree-drop'],
  // components: {},
  data: function data() {
    return {
      treesStore: treesStore
    };
  },
  // computed: {},
  // watch: {},
  methods: {
    _Draggable_unfoldTargetNodeByEl: function _Draggable_unfoldTargetNodeByEl(branchEl, store) {
      var targetTree = store.targetTree;
      var path = targetTree.getPathByBranchEl(branchEl);
      var node = targetTree.getNodeByPath(path);
      targetTree.unfold && targetTree.unfold(node, path);
      return new Promise(function (resolve, reject) {
        targetTree.$nextTick(function () {
          resolve();
        });
      });
    },
    isNodeDraggable: function isNodeDraggable(node, path) {
      var store = this.treesStore.store;
      var allNodes = this.getAllNodesByPath(path);
      allNodes.unshift(this.rootNode);

      var _iterator = _createForOfIteratorHelper$2(hp.iterateAll(allNodes, {
        reverse: true
      })),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _step.value,
              _node = _step$value.value,
              index = _step$value.index;
          var currentPath = path.slice(0, index + 1);
          var draggableOpt = _node.$draggable !== undefined ? _node.$draggable : this.eachDraggable;
          var draggable = hp.resolveValueOrGettter(draggableOpt, [currentPath, this, store]);

          if (draggable === undefined) {
            continue;
          } else {
            return draggable;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return true;
    },
    isNodeDroppable: function isNodeDroppable(node, path) {
      var store = this.treesStore.store;
      var allNodes = this.getAllNodesByPath(path);
      allNodes.unshift(this.rootNode);
      var droppableFinal, resolved;

      var _iterator2 = _createForOfIteratorHelper$2(hp.iterateAll(allNodes, {
        reverse: true
      })),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _step2.value,
              _node2 = _step2$value.value,
              index = _step2$value.index;
          var currentPath = path.slice(0, index + 1);
          var droppableOpt = _node2.$droppable !== undefined ? _node2.$droppable : this.eachDroppable;
          var droppable = hp.resolveValueOrGettter(droppableOpt, [currentPath, this, store]);

          if (droppable === undefined) {
            continue;
          } else {
            droppableFinal = droppable;
            resolved = true;
            break;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (!resolved) {
        droppableFinal = true;
      }

      if (this._internal_hook_isNodeDroppable) {
        return this._internal_hook_isNodeDroppable({
          droppableFinal: droppableFinal,
          node: node,
          path: path,
          store: store
        });
      }

      return droppableFinal;
    },
    // override
    getPathByBranchEl: function getPathByBranchEl(branchEl) {
      var store = this.treesStore.store;

      var getAttrPath = function getAttrPath(el) {
        var pathStr = el.getAttribute('data-tree-node-path');

        if (pathStr) {
          return pathStr.split(',').map(function (v) {
            return parseInt(v);
          });
        }
      };

      var path = getAttrPath(branchEl);

      if (path) {
        return path;
      } // placeholder path


      var parentPath;
      hp.findParent(branchEl, function (el) {
        if (hp.hasClass(el, 'tree-root')) {
          parentPath = [];
          return true;
        }

        if (hp.hasClass(el, 'tree-branch')) {
          parentPath = getAttrPath(el);
          return true;
        }
      });
      var index = 0;

      var _iterator3 = _createForOfIteratorHelper$2(hp.iterateAll(branchEl.parentElement.children)),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _step3$value = _step3.value,
              el = _step3$value.value,
              index2 = _step3$value.index;

          if (hp.hasClass(el, 'tree-branch') || hp.hasClass(el, 'tree-placeholder')) {
            if (el === branchEl) {
              break;
            }

            index++;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return [].concat(_toConsumableArray(parentPath), [index]);
    }
  },
  // created() {},
  mounted: function mounted() {
    var _this = this;

    var options = this._draggableOptions = {
      indent: this.indent,
      triggerClass: this.triggerClass,
      triggerBySelf: this.triggerBySelf,
      unfoldWhenDragover: this.unfoldWhenDragover,
      unfoldWhenDragoverDelay: this.unfoldWhenDragoverDelay,
      draggingNodePositionMode: this.draggingNodePositionMode,
      cloneWhenDrag: this.cloneWhenDrag,
      edgeScroll: this.edgeScroll,
      edgeScrollTriggerMargin: this.edgeScrollTriggerMargin,
      edgeScrollSpeed: this.edgeScrollSpeed,
      edgeScrollTriggerMode: this.edgeScrollTriggerMode,
      edgeScrollSpecifiedContainerX: this.edgeScrollSpecifiedContainerX,
      edgeScrollSpecifiedContainerY: this.edgeScrollSpecifiedContainerY,
      rtl: this.rtl,
      preventTextSelection: this.preventTextSelection,
      treeClass: 'he-tree',
      rootClass: 'tree-root',
      childrenClass: 'tree-children',
      branchClass: 'tree-branch',
      nodeClass: 'tree-node',
      nodeBackClass: 'tree-node-back',
      placeholderClass: 'tree-placeholder',
      placeholderNodeBackClass: 'tree-placeholder-node-back',
      placeholderNodeClass: 'tree-placeholder-node',
      draggingClass: 'dragging',
      placeholderId: "he_tree_drag_placeholder",
      ifNodeFolded: function ifNodeFolded(branchEl, store) {
        var targetTree = store.targetTree;
        var node = targetTree.getNodeByBranchEl(branchEl);
        return node.$folded;
      },
      isTargetTreeRootDroppable: function isTargetTreeRootDroppable(store) {
        var droppable = hp.resolveValueOrGettter(store.targetTree.rootNode.$droppable, [store.targetTree, store]);

        if (droppable !== undefined) {
          return droppable;
        }

        return true;
      },
      unfoldTargetNodeByEl: function unfoldTargetNodeByEl() {
        return _this._Draggable_unfoldTargetNodeByEl.apply(_this, arguments);
      },
      isNodeParentDroppable: function isNodeParentDroppable(branchEl, treeEl) {
        var tree = _this.getTreeVmByTreeEl(treeEl);

        var path = tree.getPathByBranchEl(branchEl);
        var parentPath = hp.arrayWithoutEnd(path, 1);
        var parent = tree.getNodeByPath(parentPath);
        return tree.isNodeDroppable(parent, parentPath);
      },
      isNodeDroppable: function isNodeDroppable(branchEl, treeEl) {
        var tree = _this.getTreeVmByTreeEl(treeEl);

        var path = tree.getPathByBranchEl(branchEl);
        var node = tree.getNodeByPath(path);
        return tree.isNodeDroppable(node, path);
      },
      _findClosestDroppablePosition: function _findClosestDroppablePosition(branchEl, treeEl) {
        var tree = _this.getTreeVmByTreeEl(treeEl);

        var path = tree.getPathByBranchEl(branchEl);
        var findPath = hp.arrayWithoutEnd(path, 1);
        var cur = path;

        var _iterator4 = _createForOfIteratorHelper$2(tree.iteratePath(findPath, {
          reverse: true
        })),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _step4$value = _step4.value,
                node = _step4$value.node,
                _path = _step4$value.path;

            if (tree.isNodeDroppable(node, _path)) {
              return tree.getBranchElByPath(cur);
            } else {
              cur = _path;
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        if (tree.isNodeDroppable(_this.rootNode, [])) {
          return tree.getBranchElByPath(cur);
        }
      },
      afterPlaceholderCreated: function afterPlaceholderCreated(store) {
        store.startTree.$emit('afterPlaceholderCreated', store);
        store.startTree.$emit('after-placeholder-created', store);
      },
      getPathByBranchEl: function getPathByBranchEl(branchEl) {
        return _this.getPathByBranchEl(branchEl);
      },
      beforeFirstMove: function beforeFirstMove(store) {
        _this.treesStore.store = store;
        store.startTree = _this.getTreeVmByTreeEl(store.startTreeEl);
        var draggable = hp.resolveValueOrGettter(store.startTree.draggable, [store.startTree, store]);

        if (!draggable) {
          return false;
        }

        var startTree = store.startTree,
            dragBranchEl = store.dragBranchEl,
            startPath = store.startPath;
        store.dragNode = startTree.getNodeByPath(startPath);

        if (_this.cloneWhenDrag) {
          store.dragNode = cloneTreeData(store.dragNode);
        }

        if (!startTree.isNodeDraggable(store.dragNode, startPath)) {
          return false;
        }

        if (startTree.hasHook('ondragstart') && startTree.executeHook('ondragstart', [startTree, store]) === false) {
          return false;
        }

        store.startTree.$emit('before-first-move', store);
        store.startTree.$emit('drag', store);

        _this.$root.$emit('he-tree-drag', store);
      },
      filterTargetTree: function filterTargetTree(targetTreeEl, store) {
        var targetTree = _this.getTreeVmByTreeEl(targetTreeEl);

        var startTree = store.startTree;

        if (startTree !== targetTree) {
          if (_this._internal_hook_filterTargetTree) {
            if (_this._internal_hook_filterTargetTree(targetTree, store) === false) {
              return false;
            }
          } else {
            return false;
          }
        }

        var targetTreeDroppable = hp.resolveValueOrGettter(targetTree.droppable, [targetTree, store]);

        if (!targetTreeDroppable) {
          return false;
        }

        store.targetTree = targetTree;

        if (!hp.resolveValueOrGettter(store.startTree === store.targetTree) && hp.resolveValueOrGettter(_this._Draggable_unfoldTargetNode, [false, _this.treeData]) !== _this.rootNode.children) {
          return false;
        }
      },
      afterMove: function afterMove(store) {
        store.startTree.$emit('after-move', store);
      },
      beforeDrop: function beforeDrop(pathChanged, store) {
        var targetTree = store.targetTree;

        if (targetTree.hasHook('ondragend') && targetTree.executeHook('ondragend', [targetTree, store]) === false) {
          return false;
        }

        _this.$root.$emit('he-tree-before-drop', store);
      },
      afterDrop: function afterDrop(store, t) {
        if (store.pathChanged) {
          var startTree = store.startTree,
              targetTree = store.targetTree,
              startPath = store.startPath,
              dragNode = store.dragNode;
          var targetPath = store.targetPath;

          if (_this.cloneWhenDrag !== true) {
            // remove from start position
            var startParentPath = hp.arrayWithoutEnd(startPath, 1);
            var startParent = startTree.getNodeByPath(startParentPath);
            var startSiblings = startParentPath.length === 0 ? startTree.treeData : startParent.children;
            var startIndex = hp.arrayLast(startPath);
            startSiblings.splice(startIndex, 1); // remove node from the starting position may affect the target path.
            // example
            //  startPath   targetPath
            //  [0]         [1]
            //  [0]         [1, 0]
            //  [3, 1]      [3, 3]
            //  [3, 1]      [3, 3, 5]
            // above targetPaths should be transformed to [0], [0, 0] [3, 2] [3, 2, 5]

            if (startTree === targetTree) {
              if (startPath.length <= targetPath.length) {
                var sw = startPath.slice(0, startPath.length - 1); // without end

                var tw = targetPath.slice(0, sw.length); // same length with sw

                if (sw.toString() === tw.toString()) {
                  var endIndex = sw.length;

                  if (startPath[endIndex] < targetPath[endIndex]) {
                    targetPath = targetPath.slice(0); // create a copy of targetPath

                    targetPath[endIndex] -= 1;
                  } else if (startPath[endIndex] === targetPath[endIndex]) {
                    console.error('Draggable.afterDrop: That is impossible!');
                  }
                }
              }
            }
          } // insert to target position


          var targetParentPath = hp.arrayWithoutEnd(targetPath, 1);
          var targetParent = targetTree.getNodeByPath(targetParentPath);
          var targetSiblings;

          if (targetParentPath.length === 0) {
            targetSiblings = targetTree.treeData;
          } else {
            if (!targetParent.children) {
              targetParent['children'] = [];
            }

            targetSiblings = targetParent.children;
          }

          var targetIndex = hp.arrayLast(targetPath);
          targetSiblings.splice(targetIndex, 0, dragNode); // emit event

          startTree.$emit('input', startTree.treeData);
          startTree.$emit('change', store);
          targetTree.$emit('drop', store);

          _this.$root.$emit('he-tree-drop', store);

          if (targetTree !== startTree) {
            targetTree.$emit('input', targetTree.treeData);
            targetTree.$emit('change', store);
          }

          return new Promise(function (resolve, reject) {
            targetTree.$nextTick(function () {
              resolve();
            });
          });
        }
      }
    };

    var _makeTreeDraggable_obj = this._makeTreeDraggable_obj = makeTreeDraggable(this.$el, options); // watch props and update options


    ['indent', 'triggerClass', 'triggerBySelf', 'unfoldWhenDragover', 'unfoldWhenDragoverDelay', 'draggingNodePositionMode', 'cloneWhenDrag', 'edgeScroll', 'edgeScrollTriggerMargin', 'edgeScrollSpeed', 'edgeScrollTriggerMode', 'edgeScrollSpecifiedContainerY', 'edgeScrollSpecifiedContainerY', 'rtl', 'preventTextSelection'].forEach(function (name) {
      _this.$watch(name, function (value) {
        _makeTreeDraggable_obj.options[name] = value;

        _makeTreeDraggable_obj.optionsUpdated();
      });
    });
  }
};

exports.Check = check;
exports.Draggable = Draggable_vue;
exports.Fold = fold;
exports.Tree = Tree;
exports.cloneTreeData = cloneTreeData;
exports.foldAll = foldAll;
exports.getPureTreeData = getPureTreeData;
exports.unfoldAll = unfoldAll;
exports.walkTreeData = walkTreeData;
