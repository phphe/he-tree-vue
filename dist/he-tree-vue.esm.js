/*!
 * he-tree-vue v1.2.3
 * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
 * Homepage: https://he-tree-vue.phphe.com
 * Released under the MIT License.
 */
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import { TreeData, strRand, findParent, hasClass, getOffset, getBoundingClientRect, elementsFromPoint, isDescendantOf, attachCache, removeEl, insertAfter, binarySearch, findNodeList, appendTo, insertBefore, prependTo, createElementFromHTML, addClass, waitTime, iterateAll, resolveValueOrGettter, arrayWithoutEnd, arrayLast } from 'helper-js';
import { updatablePropsEvenUnbound, hookHelper } from 'vue-functions';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.mjs';
import Vue from 'vue';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import draggableHelper from 'draggable-helper';

function cloneTreeData(treeData, opt) {
  return new TreeData(treeData).clone(opt);
}
function walkTreeData(treeData, handler, opt) {
  return new TreeData(treeData).walk(handler, opt);
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

var template = function template(h) {
  var _this = this;

  // convert undefined to empty str
  var noUndefined = function noUndefined(str) {
    return str ? str : '';
  }; // tree tpl, to render recursively


  var childrenListTpl = function childrenListTpl(nodes, parent, parentPath) {
    var indentStyle = {
      paddingLeft: parentPath.length * _this.indent + 'px'
    };

    var branchTpl = function branchTpl(node, index) {
      var path = [].concat(_toConsumableArray(parentPath), [index]);
      var transitionComponent = _this.foldingTransition || 'transition';

      var slotDefault = function slotDefault() {
        var original = function original() {
          if (_this.$scopedSlots.default) {
            return _this.$scopedSlots.default({
              node: node,
              index: index,
              path: path,
              tree: _this
            });
          } else if (_this.$slots.default) {
            return _this.$slots.default;
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
        nodebackStyle = _objectSpread({}, nodebackStyle, {}, node.$nodeBackStyle);
      }

      return h("div", {
        "class": "tree-branch ".concat(noUndefined(node.$branchClass), " ").concat(noUndefined(node.$hidden && 'he-tree--hidden')),
        "style": node.$branchStyle || {},
        "attrs": {
          "data-tree-node-path": path.join(',')
        }
      }, [h("div", {
        "class": "tree-node-back ".concat(noUndefined(node.$nodeBackClass)),
        "style": nodebackStyle || {}
      }, [h("div", {
        "class": "tree-node ".concat(noUndefined(node.$nodeClass)),
        "style": node.$nodeStyle || {}
      }, [slotDefault()])]), (node.children && node.children.length) > 0 && h(transitionComponent, {
        "attrs": {
          "name": _this.$props.foldingTransitionName
        }
      }, [!node.$folded && childrenListTpl(node.children, node, path)])]);
    };

    return h("div", {
      "class": "tree-children ".concat(noUndefined(parent === _this.rootNode && 'tree-root'), " ").concat(noUndefined(parent.$childrenClass)),
      "style": parent.$childrenStyle || {}
    }, [nodes.map(branchTpl)]);
  };

  return h("div", {
    "class": "he-tree ".concat(this.treeClass),
    "attrs": {
      "data-tree-id": this.treeId
    }
  }, [this.blockHeader && this.blockHeader(), childrenListTpl(this.rootNode.children, this.rootNode, []), this.blockFooter && this.blockFooter()]);
};

var trees = {};
var Tree = {
  render: template,
  mixins: [updatablePropsEvenUnbound({
    value: {
      $localName: 'treeData',
      required: true
    }
  }), hookHelper],
  props: {
    indent: {
      type: Number,
      default: 20
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
      treeId: strRand()
    };
  },
  // computed: {},
  watch: {
    treeData: {
      immediate: true,
      handler: function handler(treeData) {
        this._TreeDataHelper = new TreeData(this.treeData);
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
      _this2.$set(_this2.rootNode, 'children', _this2.treeData);
    };

    this.$watch('rootNode', updateRootNode, {
      immediate: true
    });
    this.$watch('treeData', updateRootNode, {
      immediate: true
    });
  },
  mounted: function mounted() {
    var _this3 = this;

    //
    this.treeId = strRand();
    this.$set(this.trees, this.treeId, this);
    this.$once('hook:beforeDestroy', function () {
      _this3.$delete(_this3.trees, _this3.treeId);
    });
  },
  // beforeDestroy() {},
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

/* script */
var __vue_script__ = Tree;
/* template */

/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = __vue_normalize__({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function foldAll(treeData) {
  walkTreeData(treeData, function (childNode) {
    Vue.set(childNode, '$folded', true);
  });
}
function unfoldAll(treeData) {
  walkTreeData(treeData, function (childNode) {
    Vue.set(childNode, '$folded', false);
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
  methods: {
    fold: function fold(node, path) {
      if (!node.$folded) {
        this.$set(node, '$folded', true);
        this.$emit('nodeFoldedChanged', node);
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
        this.$set(node, '$folded', false);
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

var check = {
  props: {},
  methods: {
    afterCheckChanged: function afterCheckChanged(node, path) {
      var _this = this;

      // update parent
      var nodes = this.getAllNodesByPath(path);
      var reversedParents = nodes.slice(0, nodes.length - 1);
      reversedParents.reverse();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = reversedParents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var parent = _step.value;
          this.$set(parent, '$checked', parent.children.every(function (child) {
            return child.$checked;
          }));
        } // update children

      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (node.children && node.children.length > 0) {
        walkTreeData(node.children, function (childNode) {
          _this.$set(childNode, '$checked', node.$checked);
        });
      }
    },
    check: function check(node, path) {
      this.$set(node, '$checked', true);
      this.afterCheckChanged(node, path);
    },
    uncheck: function uncheck(node, path) {
      this.$set(node, '$checked', false);
      this.afterCheckChanged(node, path);
    },
    toggleCheck: function toggleCheck(node, path) {
      this.$set(node, '$checked', !node.$checked);
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

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function makeTreeDraggable(treeEl) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  options = _objectSpread$2({}, options, {
    treeEl: treeEl
  });

  var _draggableHelper = draggableHelper(treeEl, {
    draggingClass: options.draggingClass,
    restoreDOMManuallyOndrop: true,
    clone: options.cloneWhenDrag,
    beforeDrag: function beforeDrag(startEvent, moveEvent, store, opt) {
      store.startTreeEl = treeEl;

      if (options.beforeDrag && options.beforeDrag(store, opt) === false) {
        return false;
      } // if the event target is a trigger


      var isTrigger = findParent(startEvent.target, function (el) {
        if (hasClass(el, options.triggerClass)) {
          return true;
        }

        if (el === store.startTreeEl || hasClass(el, options.branchClass)) {
          return 'break';
        }
      }, {
        withSelf: true
      });

      if (!isTrigger) {
        return false;
      } // _triggeredBy


      if (startEvent._triggeredBy) {
        return false;
      }

      startEvent._triggeredBy = store.startTree;
    },
    // get the element which will be moved
    getEl: function getEl(dragHandlerEl, store, opt) {
      var el = findParent(store.startEvent.target, function (el) {
        return hasClass(el, options.branchClass);
      }, {
        withSelf: true
      });
      return el;
    },
    drag: function drag(startEvent, moveEvent, store, opt) {
      store.dragBranchEl = store.el;
      var movingEl = store.el; // branch

      store.startPath = options.getPathByBranchEl(movingEl);

      if (options.ondrag && options.ondrag(store, opt) === false) {
        return false;
      }
    },
    moving: function moving(moveEvent, store, opt) {
      // return false in moving will prevent move animation; return undefined just prevent doAction
      store.oneMoveStore = {}; // life cycle: one move

      var movingEl = store.el; // branch
      // find closest branch and hovering tree

      var tree;
      var movingNode = movingEl.querySelector(".".concat(options.nodeClass));
      var movingNodeOf = getOffset(movingNode);
      var movingNodeRect = getBoundingClientRect(movingNode);

      if (options.draggingNodePositionMode === 'mouse') {
        // use mouse position as dragging node position
        movingNodeOf = {
          x: moveEvent.pageX,
          y: moveEvent.pageY
        };
        movingNodeRect = {
          x: moveEvent.clientX,
          y: moveEvent.clientY
        };
      }

      var elsBetweenMovingElAndTree = []; // including tree

      var elsToTree = []; // start from top, including tree
      // loop to find put els between movingEl and tree

      var movingElLooped; // 已循环到了movingEl

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = elementsFromPoint(movingNodeRect.x, movingNodeRect.y)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var itemEl = _step.value;

          if (movingElLooped) {
            elsBetweenMovingElAndTree.push(itemEl);
          } else if (itemEl === movingEl) {
            movingElLooped = true;
          }

          elsToTree.push(itemEl);

          if (hasClass(itemEl, options.treeClass)) {
            tree = itemEl;
            break;
          }
        } // this is an issue, sometimes, the movingEl is not in elementsFromPoint result

      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (!movingElLooped) {
        elsBetweenMovingElAndTree.push.apply(elsBetweenMovingElAndTree, elsToTree);
      }

      if (!tree) {
        // out of tree
        return;
      } // check tree if is covered, like modal


      var treeBeCoved;

      if (elsBetweenMovingElAndTree && elsBetweenMovingElAndTree[0]) {
        if (elsBetweenMovingElAndTree[0] !== tree && !isDescendantOf(elsBetweenMovingElAndTree[0], tree)) {
          treeBeCoved = true;
        }
      }

      if (treeBeCoved) {
        return;
      } // check if target tree right


      if (options.filterTargetTree(tree, store, opt) === false) {
        return;
      }

      store.targetTreeEl = tree; // info ========================================
      // life cycle: one move

      var info = {
        tree: function (_tree) {
          function tree() {
            return _tree.apply(this, arguments);
          }

          tree.toString = function () {
            return _tree.toString();
          };

          return tree;
        }(function () {
          return tree;
        }),
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

                if (child !== movingEl && hasClass(child, options.branchClass)) {
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
          var t = binarySearch(nodes, function (node) {
            return getOffset(node).y - movingNodeOf.y;
          }, null, null, true);

          if (t.hit) {
            found = t.value;
          } else {
            if (t.bigger) {
              found = nodes[t.index - 1] || t.value;
            } else {
              found = t.value;
            }
          }

          return found;
        },
        closestNodeOffset: function closestNodeOffset() {
          return getOffset(info.closestNode);
        },
        closestBranch: function closestBranch() {
          return findParent(info.closestNode, function (el) {
            return hasClass(el, options.branchClass);
          });
        },
        closestNext: function closestNext() {
          var next = info.closestBranch.nextSibling;

          while (next) {
            if (next !== movingEl && hasClass(next, options.branchClass) && !isElementHidden(next)) {
              return next;
            }

            next = next.nextSibling;
          }
        },
        closestPrev: function closestPrev() {
          var prev = info.closestBranch.previousSibling;

          while (prev) {
            if (prev !== movingEl && hasClass(prev, options.branchClass) && !isElementHidden(prev)) {
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
            if (prev !== movingEl && hasClass(prev, options.branchClass) && !isElementHidden(prev)) {
              cur = prev;
              found = true;
              break;
            }

            prev = prev.previousSibling;
          }

          if (!found) {
            cur = findParent(cur, function (el) {
              return hasClass(el, options.branchClass);
            });
          } //


          while (cur) {
            var curNode = cur.querySelector(".".concat(options.nodeClass));

            if (getOffset(curNode).x <= movingNodeOf.x) {
              break;
            }

            var hasNextBranch = void 0;
            var t = cur.nextSibling;

            while (t) {
              if (t !== movingEl && t !== store.placeholder && hasClass(t, options.branchClass) && !isElementHidden(t)) {
                hasNextBranch = true;
                break;
              }

              t = t.nextSibling;
            }

            if (hasNextBranch) {
              break;
            }

            var parent = findParent(cur, function (el) {
              return hasClass(el, options.branchClass);
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
          return info.closestBranch === findNodeList(info.root.children, function (el) {
            return el !== movingEl && !isElementHidden(el);
          });
        },
        'closest is top excluding placeholder': function closestIsTopExcludingPlaceholder() {
          return info.closestBranch === findNodeList(info.root.children, function (el) {
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
            return findNodeList(childrenEl.children, function (el) {
              return el !== movingEl && el !== store.placeholder && !isElementHidden(el);
            });
          }
        }
      }; // convert conditions result to Boolean

      Object.keys(conditions).forEach(function (key) {
        var old = conditions[key];

        conditions[key] = function () {
          return Boolean(old.call(this));
        };
      }); //

      attachCache(info, info);
      attachCache(conditions, conditions); // actions start ========================================

      var doAction = function doAction(name) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        if (!store._doActionQueue) {
          store._doActionQueue = Promise.resolve();
        }

        var queue = store._doActionQueue;
        store._doActionQueue = queue.then(
        /*#__PURE__*/
        _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee() {
          var actionRecords, action, r, placeholderPath, placeholderNodeBack;
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
                  // set indent of placeholder
                  placeholderPath = options.getPathByBranchEl(store.placeholder);
                  placeholderNodeBack = store.placeholder.querySelector(".".concat(options.nodeBackClass));
                  placeholderNodeBack.style.paddingLeft = (placeholderPath.length - 1) * options.indent + 'px'; // remove tempChildren if empty

                  if (store.tempChildren.children.length === 0) {
                    removeEl(store.tempChildren);
                  }

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        })));
      };

      var actions = {
        'nothing': function nothing() {
          return _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee2() {
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
          return _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee3() {
            return _regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    // no closest branch, just append to root
                    if (options.isTargetTreeRootDroppable(store)) {
                      appendTo(store.placeholder, info.root);
                    }

                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }))();
        },
        'insert before': function insertBefore$1() {
          return _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee4() {
            return _regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!options.isNodeParentDroppable(info.closestBranch, store.targetTreeEl)) {
                      _context4.next = 4;
                      break;
                    }

                    insertBefore(store.placeholder, info.closestBranch);
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
        'insert after': function insertAfter$1() {
          var branch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : info.closestBranch;
          return _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee5() {
            var moved, isFirstTriedAction;
            return _regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    if (!options.isNodeParentDroppable(branch, store.targetTreeEl)) {
                      _context5.next = 4;
                      break;
                    }

                    insertAfter(store.placeholder, branch);
                    _context5.next = 10;
                    break;

                  case 4:
                    _context5.next = 6;
                    return secondCase(getParentBranchByEl(branch));

                  case 6:
                    moved = _context5.sent;
                    isFirstTriedAction = !store.oneMoveStore.actionRecords || store.oneMoveStore.actionRecords.length === 1;

                    if (!(!moved && isFirstTriedAction)) {
                      _context5.next = 10;
                      break;
                    }

                    return _context5.abrupt("return", thirdCase(branch));

                  case 10:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5);
          }))();
        },
        prepend: function prepend() {
          return _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee6() {
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
          return _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee7() {
            return _regeneratorRuntime.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    if (!options.isNodeParentDroppable(info.aboveBranch, store.targetTreeEl)) {
                      _context7.next = 4;
                      break;
                    }

                    insertAfter(store.placeholder, info.aboveBranch);
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
          return _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee8() {
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
                    appendTo(store.placeholder, childrenEl);
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

      var secondCase =
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee9(branchEl) {
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

                  insertAfter(store.placeholder, targetEl);
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


      var thirdCase =
      /*#__PURE__*/
      function () {
        var _ref3 = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee10(branchEl) {
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

      var unfoldAndGetChildrenEl =
      /*#__PURE__*/
      function () {
        var _ref4 = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee11(branch) {
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
                    appendTo(childrenEl, branch);
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

      var tryUnfoldAndPrepend =
      /*#__PURE__*/
      function () {
        var _ref5 = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee13(branchEl) {
          var func, oneMoveStore;
          return _regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  func =
                  /*#__PURE__*/
                  function () {
                    var _ref6 = _asyncToGenerator(
                    /*#__PURE__*/
                    _regeneratorRuntime.mark(function _callee12() {
                      var childrenEl;
                      return _regeneratorRuntime.wrap(function _callee12$(_context12) {
                        while (1) {
                          switch (_context12.prev = _context12.next) {
                            case 0:
                              _context12.next = 2;
                              return unfoldAndGetChildrenEl(branchEl);

                            case 2:
                              childrenEl = _context12.sent;
                              prependTo(store.placeholder, childrenEl);

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
      //


      var checkPlaceholder = function checkPlaceholder() {
        if (!store.placeholder) {
          var placeholder = createElementFromHTML("\n            <div id=\"".concat(options.placeholderId, "\" class=\"").concat(options.branchClass, " ").concat(options.placeholderClass, "\">\n              <div class=\"").concat(options.nodeBackClass, " ").concat(options.placeholderNodeBackClass, "\">\n                <div class=\"").concat(options.nodeClass, " ").concat(options.placeholderNodeClass, "\">\n                </div>\n              </div>\n            </div>\n          "));
          insertAfter(placeholder, movingEl);
          store.placeholder = placeholder;
          options.afterPlaceholderCreated(store); // create a tree children el to use when can't get childrenEl

          var tempChildren = document.createElement('DIV');
          addClass(tempChildren, options.childrenClass);
          store.tempChildren = tempChildren;
        }
      }; //


      checkPlaceholder();
      doDraggableDecision({
        options: options,
        event: event,
        store: store,
        opt: opt,
        info: info,
        conditions: conditions,
        actions: actions,
        doAction: doAction
      });
    },
    drop: function () {
      var _drop = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee14(endEvent, store, opt) {
        var movingEl, placeholder, tempChildren, maskTree, pathChanged, isPathChanged;
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                isPathChanged = function _ref7() {
                  var startTree = store.startTree,
                      targetTree = store.targetTree,
                      startPath = store.startPath,
                      targetPath = store.targetPath;
                  return startTree !== targetTree || startPath.toString() !== targetPath.toString();
                };

                movingEl = store.el; // branch

                placeholder = store.placeholder, tempChildren = store.tempChildren; // use mask tree to avoid flick caused by DOM update in short time
                // 复制 targetTreeEl 作为遮罩, 避免短时间内更新DOM引起的闪烁

                if (placeholder) {
                  // placeholder not mounted is rarely
                  // create mask tree
                  maskTree = store.targetTreeEl.cloneNode(true);
                  store.targetTreeEl.style.display = 'none';
                  insertAfter(maskTree, store.targetTreeEl); //

                  store.targetPath = options.getPathByBranchEl(placeholder);
                  pathChanged = isPathChanged();
                  store.targetPathNotEqualToStartPath = pathChanged;
                  store.pathChangePrevented = false;

                  if (options.beforeDrop && options.beforeDrop(pathChanged, store, opt) === false) {
                    pathChanged = false;
                    store.pathChangePrevented = false;
                  }

                  store.pathChanged = pathChanged;
                  removeEl(placeholder);

                  if (tempChildren) {
                    removeEl(tempChildren);
                  }
                }

                store.restoreDOM();
                _context14.next = 7;
                return options.ondrop(store, opt);

              case 7:
                if (!maskTree) {
                  _context14.next = 12;
                  break;
                }

                _context14.next = 10;
                return waitTime(30);

              case 10:
                removeEl(maskTree);
                store.targetTreeEl.style.display = 'block';

              case 12:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      function drop(_x5, _x6, _x7) {
        return _drop.apply(this, arguments);
      }

      return drop;
    }()
  }),
      destroy = _draggableHelper.destroy,
      draggableHelperOptions = _draggableHelper.draggableHelperOptions;

  return {
    destroy: destroy,
    options: options,
    optionsUpdated: optionsUpdated
  };

  function getParentBranchByEl(el) {
    return findParent(el, function (el) {
      if (hasClass(el, options.branchClass)) {
        return true;
      }

      if (hasClass(el, options.rootClass)) {
        return 'break';
      }
    });
  }

  function optionsUpdated() {
    draggableHelperOptions.clone = options.cloneWhenDrag;
  }
}

function isElementHidden(el) {
  return el.offsetWidth === 0 && el.offsetHeight === 0;
}

var treesStore = {};
var script = {
  props: {
    triggerClass: {
      type: String,
      default: 'tree-node'
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
    } // top_left_corner, mouse

  },
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
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = iterateAll(allNodes, {
          reverse: true
        })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _step.value,
              _node = _step$value.value,
              index = _step$value.index;
          var currentPath = path.slice(0, index + 1);
          var draggableOpt = _node.$draggable !== undefined ? _node.$draggable : this.eachDraggable;
          var draggable = resolveValueOrGettter(draggableOpt, [currentPath, this, store]);

          if (draggable === undefined) {
            continue;
          } else {
            return draggable;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return true;
    },
    isNodeDroppable: function isNodeDroppable(node, path) {
      var store = this.treesStore.store;
      var allNodes = this.getAllNodesByPath(path);
      allNodes.unshift(this.rootNode);
      var droppableFinal, resolved;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = iterateAll(allNodes, {
          reverse: true
        })[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _step2.value,
              _node2 = _step2$value.value,
              index = _step2$value.index;
          var currentPath = path.slice(0, index + 1);
          var droppableOpt = _node2.$droppable !== undefined ? _node2.$droppable : this.eachDroppable;
          var droppable = resolveValueOrGettter(droppableOpt, [currentPath, this, store]);

          if (droppable === undefined) {
            continue;
          } else {
            droppableFinal = droppable;
            resolved = true;
            break;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
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
      findParent(branchEl, function (el) {
        if (hasClass(el, 'tree-root')) {
          parentPath = [];
          return true;
        }

        if (hasClass(el, 'tree-branch')) {
          parentPath = getAttrPath(el);
          return true;
        }
      });
      var index = 0;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = iterateAll(branchEl.parentElement.children)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _step3$value = _step3.value,
              el = _step3$value.value,
              index2 = _step3$value.index;

          if (hasClass(el, 'tree-branch') || hasClass(el, 'tree-placeholder')) {
            if (el === branchEl) {
              break;
            }

            index++;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
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
      unfoldWhenDragover: this.unfoldWhenDragover,
      unfoldWhenDragoverDelay: this.unfoldWhenDragoverDelay,
      draggingNodePositionMode: this.draggingNodePositionMode,
      cloneWhenDrag: this.cloneWhenDrag,
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
        var droppable = resolveValueOrGettter(store.targetTree.rootNode.$droppable, [store.targetTree, store]);

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
        var parentPath = arrayWithoutEnd(path, 1);
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
        var findPath = arrayWithoutEnd(path, 1);
        var cur = path;
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = tree.iteratePath(findPath, {
            reverse: true
          })[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
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
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        if (tree.isNodeDroppable(_this.rootNode, [])) {
          return tree.getBranchElByPath(cur);
        }
      },
      afterPlaceholderCreated: function afterPlaceholderCreated(store) {
        store.startTree.$emit('afterPlaceholderCreated', store);
      },
      getPathByBranchEl: function getPathByBranchEl(branchEl) {
        return _this.getPathByBranchEl(branchEl);
      },
      beforeDrag: function beforeDrag(store) {
        _this.treesStore.store = store;
        store.startTree = _this.getTreeVmByTreeEl(store.startTreeEl);
        var draggable = resolveValueOrGettter(store.startTree.draggable, [store.startTree, store]);

        if (!draggable) {
          return false;
        }
      },
      ondrag: function ondrag(store) {
        var startTree = store.startTree,
            dragBranchEl = store.dragBranchEl,
            startPath = store.startPath;
        var path = startTree.getPathByBranchEl(dragBranchEl);
        store.dragNode = startTree.getNodeByPath(path);

        if (_this.cloneWhenDrag) {
          store.dragNode = cloneTreeData(store.dragNode);
        }

        if (!startTree.isNodeDraggable(store.dragNode, path)) {
          return false;
        }

        if (startTree.hasHook('ondragstart') && startTree.executeHook('ondragstart', [startTree, store]) === false) {
          return false;
        }

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

        var targetTreeDroppable = resolveValueOrGettter(targetTree.droppable, [targetTree, store]);

        if (!targetTreeDroppable) {
          return false;
        }

        store.targetTree = targetTree;

        if (!resolveValueOrGettter(store.startTree === store.targetTree) && resolveValueOrGettter(_this._Draggable_unfoldTargetNode, [false, _this.treeData]) !== _this.rootNode.children) {
          return false;
        }
      },
      beforeDrop: function beforeDrop(pathChanged, store) {
        var targetTree = store.targetTree;

        if (targetTree.hasHook('ondragend') && targetTree.executeHook('ondragend', [targetTree, store]) === false) {
          return false;
        }

        targetTree.$emit('drop', store);

        _this.$root.$emit('he-tree-drop', store);
      },
      ondrop: function ondrop(store, t) {
        if (store.pathChanged) {
          var startTree = store.startTree,
              targetTree = store.targetTree,
              startPath = store.startPath,
              targetPath = store.targetPath,
              dragNode = store.dragNode;

          if (_this.cloneWhenDrag !== true) {
            // remove from start position
            var startParentPath = arrayWithoutEnd(startPath, 1);
            var startParent = startTree.getNodeByPath(startParentPath);
            var startSiblings = startParentPath.length === 0 ? startTree.treeData : startParent.children;
            var startIndex = arrayLast(startPath);
            startSiblings.splice(startIndex, 1); // update targetPath

            if (startTree === targetTree) {
              if (startPath.length <= targetPath.length) {
                var lenNoEnd = startPath.length - 1;
                var same = true;

                for (var i = 0; i < lenNoEnd; i++) {
                  var s = startPath[i];
                  var _t = targetPath[i];

                  if (s !== _t) {
                    same = false;
                    break;
                  }
                }

                if (same) {
                  var endIndex = startPath.length - 1;

                  if (startPath[endIndex] < targetPath[endIndex]) {
                    targetPath[endIndex] -= 1;
                  }
                }
              }
            }
          } // insert to target position


          var targetParentPath = arrayWithoutEnd(targetPath, 1);
          var targetParent = targetTree.getNodeByPath(targetParentPath);
          var targetSiblings;

          if (targetParentPath.length === 0) {
            targetSiblings = targetTree.treeData;
          } else {
            if (!targetParent.children) {
              _this.$set(targetParent, 'children', []);
            }

            targetSiblings = targetParent.children;
          }

          var targetIndex = arrayLast(targetPath);
          targetSiblings.splice(targetIndex, 0, dragNode); // emit event

          startTree.$emit('input', startTree.treeData);
          startTree.$emit('change');

          if (targetTree !== startTree) {
            targetTree.$emit('input', targetTree.treeData);
            targetTree.$emit('change');
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


    ['indent', 'triggerClass', 'unfoldWhenDragover', 'unfoldWhenDragoverDelay', 'draggingNodePositionMode', 'cloneWhenDrag'].forEach(function (name) {
      _this.$watch(name, function (value) {
        _makeTreeDraggable_obj.options[name] = value;

        _makeTreeDraggable_obj.optionsUpdated();
      });
    });
  }
};

/* script */
var __vue_script__$1 = script;
/* template */

/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = __vue_normalize__({}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

export { check as Check, __vue_component__$1 as Draggable, fold as Fold, __vue_component__ as Tree, cloneTreeData, foldAll, getPureTreeData, unfoldAll, walkTreeData };
