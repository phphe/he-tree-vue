/*!
 * he-tree-vue v1.2.0
 * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
 * Homepage: https://he-tree-vue.phphe.com
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var hp = require('helper-js');
var vf = require('vue-functions');
var __vue_normalize__ = _interopDefault(require('vue-runtime-helpers/dist/normalize-component.js'));
var Vue = _interopDefault(require('vue'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var draggableHelper = _interopDefault(require('draggable-helper'));

function cloneTreeData(treeData, opt) {
  return new hp.TreeData(treeData).clone(opt);
}
function walkTreeData(treeData, handler, opt) {
  return new hp.TreeData(treeData).walk(handler, opt);
}
function getPureTreeData(treeData) {
  const opt = {
    afterNodeCreated: newNode => {
      Object.keys(newNode).forEach(key => {
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

const template = function template(h) {
  // convert undefined to empty str
  const noUndefined = str => str ? str : ''; // tree tpl, to render recursively


  const childrenListTpl = (nodes, parent, parentPath) => {
    const indentStyle = {
      paddingLeft: parentPath.length * this.indent + 'px'
    };

    const branchTpl = (node, index) => {
      const path = [...parentPath, index];
      const transitionComponent = this.foldingTransition || 'transition';

      const slotDefault = () => {
        const original = () => {
          if (this.$scopedSlots.default) {
            return this.$scopedSlots.default({
              node,
              index,
              path,
              tree: this
            });
          } else if (this.$slots.default) {
            return this.$slots.default;
          } else {
            return node.text;
          }
        };

        if (this.overrideSlotDefault) {
          return this.overrideSlotDefault({
            node,
            index,
            path,
            tree: this
          }, original);
        } else {
          return original();
        }
      };

      let nodebackStyle = indentStyle;

      if (node.$nodeBackStyle) {
        nodebackStyle = _objectSpread({}, nodebackStyle, {}, node.$nodeBackStyle);
      }

      return h("div", {
        "class": `tree-branch ${noUndefined(node.$branchClass)} ${noUndefined(node.$hidden && 'he-tree--hidden')}`,
        "style": node.$branchStyle || {},
        "attrs": {
          "data-tree-node-path": path.join(',')
        }
      }, [h("div", {
        "class": `tree-node-back ${noUndefined(node.$nodeBackClass)}`,
        "style": nodebackStyle || {}
      }, [h("div", {
        "class": `tree-node ${noUndefined(node.$nodeClass)}`,
        "style": node.$nodeStyle || {}
      }, [slotDefault()])]), (node.children && node.children.length) > 0 && h(transitionComponent, {
        "attrs": {
          "name": this.$props.foldingTransitionName
        }
      }, [!node.$folded && childrenListTpl(node.children, node, path)])]);
    };

    return h("div", {
      "class": `tree-children ${noUndefined(parent === this.rootNode && 'tree-root')} ${noUndefined(parent.$childrenClass)}`,
      "style": parent.$childrenStyle || {}
    }, [nodes.map(branchTpl)]);
  };

  return h("div", {
    "class": `he-tree ${this.treeClass}`,
    "attrs": {
      "data-tree-id": this.treeId
    }
  }, [this.blockHeader && this.blockHeader(), childrenListTpl(this.rootNode.children, this.rootNode, []), this.blockFooter && this.blockFooter()]);
};

const trees = {};
const Tree = {
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
    rootNode: {
      default: is => ({})
    }
  },

  // components: {},
  data() {
    return {
      trees,
      treeClass: '',
      treeId: hp.strRand()
    };
  },

  // computed: {},
  watch: {
    treeData: {
      immediate: true,

      handler(treeData) {
        this._TreeDataHelper = new hp.TreeData(this.treeData);
      }

    }
  },
  methods: {
    iteratePath(path, opt) {
      return this._TreeDataHelper.iteratePath(path, opt);
    },

    getTreeVmByTreeEl(treeEl) {
      return this.trees[treeEl.getAttribute('data-tree-id')];
    },

    getAllNodesByPath(path) {
      return this._TreeDataHelper.getAllNodes(path);
    },

    getNodeByPath(path) {
      return this._TreeDataHelper.getNode(path);
    },

    getPathByBranchEl(branchEl) {
      return branchEl.getAttribute('data-tree-node-path').split(',').map(v => parseInt(v));
    },

    getBranchElByPath(path) {
      return this.$el.querySelector(`[data-tree-node-path='${path.join(',')}']`);
    },

    getNodeByBranchEl(branchEl) {
      return this.getNodeByPath(this.getPathByBranchEl(branchEl));
    },

    getNodeParentByPath(path) {
      return this._TreeDataHelper.getNodeParent(path);
    },

    removeNodeByPath(path) {
      return this._TreeDataHelper.removeNode(path);
    },

    walkTreeData(handler, opt) {
      return walkTreeData(this.treeData, handler, opt);
    },

    cloneTreeData(opt) {
      return cloneTreeData(this.treeData, opt);
    },

    // return cloned new tree data without property witch starts with `$`
    getPureTreeData() {
      return getPureTreeData(this.treeData);
    }

  },

  created() {
    //
    const updateRootNode = () => {
      this.$set(this.rootNode, 'children', this.treeData);
    };

    this.$watch('rootNode', updateRootNode, {
      immediate: true
    });
    this.$watch('treeData', updateRootNode, {
      immediate: true
    });
  },

  mounted() {
    //
    this.treeId = hp.strRand();
    this.$set(this.trees, this.treeId, this);
    this.$once('hook:beforeDestroy', () => {
      this.$delete(this.trees, this.treeId);
    });
  },

  // beforeDestroy() {},
  //
  mixPlugins(plugins) {
    const MixedTree = {
      name: 'Tree',
      extends: Tree,
      mixins: plugins,
      mixPlugins: this.mixPlugins
    };
    return MixedTree;
  }

};

/* script */
const __vue_script__ = Tree;
/* template */

/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = __vue_normalize__({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function foldAll(treeData) {
  walkTreeData(treeData, childNode => {
    Vue.set(childNode, '$folded', true);
  });
}
function unfoldAll(treeData) {
  walkTreeData(treeData, childNode => {
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
    fold(node, path) {
      if (!node.$folded) {
        this.$set(node, '$folded', true);
      }
    },

    unfold(node, path, opt = {}) {
      opt = _objectSpread$1({
        foldOthers: false
      }, opt);

      if (opt.foldOthers) {
        this.foldAll();
      }

      if (node.$folded) {
        this.$set(node, '$folded', false);
      }
    },

    toggleFold(node, path, opt) {
      if (node.$folded) {
        this.unfold(node, path, opt);
      } else {
        this.fold(node, path, opt);
      }
    },

    foldAll() {
      this.walkTreeData(childNode => {
        this.fold(childNode);
      });
    },

    unfoldAll() {
      this.walkTreeData(childNode => {
        this.unfold(childNode, {
          unfoldParent: false
        });
      });
    }

  },

  mounted() {
    if (this.foldAllAfterMounted) {
      this.foldAll();
    }
  }

};

var check = {
  props: {},
  methods: {
    afterCheckChanged(node, path) {
      // update parent
      const nodes = this.getAllNodesByPath(path);
      const reversedParents = nodes.slice(0, nodes.length - 1);
      reversedParents.reverse();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = reversedParents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          const parent = _step.value;
          this.$set(parent, '$checked', parent.children.every(child => child.$checked));
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
        walkTreeData(node.children, childNode => {
          this.$set(childNode, '$checked', node.$checked);
        });
      }
    },

    check(node, path) {
      this.$set(node, '$checked', true);
      this.afterCheckChanged(node, path);
    },

    uncheck(node, path) {
      this.$set(node, '$checked', false);
      this.afterCheckChanged(node, path);
    },

    toggleCheck(node, path) {
      this.$set(node, '$checked', !node.$checked);
      this.afterCheckChanged(node, path);
    }

  }
};

function doDraggableDecision ({
  conditions,
  doAction
}) {
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

function makeTreeDraggable(treeEl, options = {}) {
  options = _objectSpread$2({}, options, {
    treeEl
  });

  const _draggableHelper = draggableHelper(treeEl, {
    draggingClass: options.draggingClass,
    restoreDOMManuallyOndrop: true,
    clone: options.cloneWhenDrag,

    beforeDrag(startEvent, moveEvent, store, opt) {
      store.startTreeEl = treeEl;

      if (options.beforeDrag && options.beforeDrag(store, opt) === false) {
        return false;
      } // if the event target is a trigger


      const isTrigger = hp.findParent(startEvent.target, el => {
        if (hp.hasClass(el, options.triggerClass)) {
          return true;
        }

        if (el === store.startTreeEl || hp.hasClass(el, options.branchClass)) {
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
    getEl: (dragHandlerEl, store, opt) => {
      const el = hp.findParent(store.startEvent.target, el => hp.hasClass(el, options.branchClass), {
        withSelf: true
      });
      return el;
    },
    drag: (startEvent, moveEvent, store, opt) => {
      store.dragBranchEl = store.el;
      const movingEl = store.el; // branch

      store.startPath = options.getPathByBranchEl(movingEl);

      if (options.ondrag && options.ondrag(store, opt) === false) {
        return false;
      }
    },
    moving: (moveEvent, store, opt) => {
      // return false in moving will prevent move animation; return undefined just prevent doAction
      store.oneMoveStore = {}; // life cycle: one move

      const movingEl = store.el; // branch
      // find closest branch and hovering tree

      let tree;
      const movingNode = movingEl.querySelector(`.${options.nodeClass}`);
      let movingNodeOf = hp.getOffset(movingNode);
      let movingNodeRect = hp.getBoundingClientRect(movingNode);

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

      const elsBetweenMovingElAndTree = []; // including tree

      const elsToTree = []; // start from top, including tree
      // loop to find put els between movingEl and tree

      let movingElLooped; // 已循环到了movingEl

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = hp.elementsFromPoint(movingNodeRect.x, movingNodeRect.y)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          const itemEl = _step.value;

          if (movingElLooped) {
            elsBetweenMovingElAndTree.push(itemEl);
          } else if (itemEl === movingEl) {
            movingElLooped = true;
          }

          elsToTree.push(itemEl);

          if (hp.hasClass(itemEl, options.treeClass)) {
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
        elsBetweenMovingElAndTree.push(...elsToTree);
      }

      if (!tree) {
        // out of tree
        return;
      } // check tree if is covered, like modal


      let treeBeCoved;

      if (elsBetweenMovingElAndTree && elsBetweenMovingElAndTree[0]) {
        if (elsBetweenMovingElAndTree[0] !== tree && !hp.isDescendantOf(elsBetweenMovingElAndTree[0], tree)) {
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

      const info = {
        tree: function (_tree) {
          function tree() {
            return _tree.apply(this, arguments);
          }

          tree.toString = function () {
            return _tree.toString();
          };

          return tree;
        }(() => tree),
        root: () => info.tree.querySelector(`.${options.childrenClass}`),
        closestNode: () => {
          const nodes = []; // all visible nodes sort by y

          const walkToGetNodes = branch => {
            //
            if (branch !== info.tree) {
              const node = branch.querySelector(`.${options.nodeClass}`);

              if (node && !isElementHidden(node)) {
                nodes.push(node);
              }
            } //


            const childrenEl = branch.querySelector(`.${options.childrenClass}`);

            if (childrenEl) {
              for (let i = 0; i < childrenEl.children.length; i++) {
                const child = childrenEl.children[i];

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


          let found;
          const t = hp.binarySearch(nodes, node => hp.getOffset(node).y - movingNodeOf.y, null, null, true);

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
        closestNodeOffset: () => hp.getOffset(info.closestNode),
        closestBranch: () => hp.findParent(info.closestNode, el => hp.hasClass(el, options.branchClass)),
        closestNext: () => {
          let next = info.closestBranch.nextSibling;

          while (next) {
            if (next !== movingEl && hp.hasClass(next, options.branchClass) && !isElementHidden(next)) {
              return next;
            }

            next = next.nextSibling;
          }
        },
        closestPrev: () => {
          let prev = info.closestBranch.previousSibling;

          while (prev) {
            if (prev !== movingEl && hp.hasClass(prev, options.branchClass) && !isElementHidden(prev)) {
              return prev;
            }

            prev = prev.previousSibling;
          }
        },
        aboveBranch: () => {
          // find above from branch to root
          // closestBranch must be placeholder
          if (info.closestBranch !== store.placeholder) {
            return;
          }

          if (conditions['closest has next']) {
            return;
          } // find placeholder prev or parent


          let cur = info.closestBranch;
          let prev = cur.previousSibling;
          let found;

          while (prev) {
            if (prev !== movingEl && hp.hasClass(prev, options.branchClass) && !isElementHidden(prev)) {
              cur = prev;
              found = true;
              break;
            }

            prev = prev.previousSibling;
          }

          if (!found) {
            cur = hp.findParent(cur, el => hp.hasClass(el, options.branchClass));
          } //


          while (cur) {
            const curNode = cur.querySelector(`.${options.nodeClass}`);

            if (hp.getOffset(curNode).x <= movingNodeOf.x) {
              break;
            }

            let hasNextBranch;
            let t = cur.nextSibling;

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

            const parent = hp.findParent(cur, el => hp.hasClass(el, options.branchClass));

            if (!parent) {
              break;
            }

            cur = parent;
          }

          return cur;
        }
      }; // conditions ========================================
      // life cycle: one move

      const conditions = {
        'no closest': () => !info.closestNode,
        'closest is top': () => info.closestBranch === hp.findNodeList(info.root.children, el => el !== movingEl && !isElementHidden(el)),
        'closest is top excluding placeholder': () => info.closestBranch === hp.findNodeList(info.root.children, el => el !== movingEl && el !== store.placeholder && !isElementHidden(el)),
        'on closest middle': () => movingNodeOf.y < info.closestNodeOffset.y + info.closestNode.offsetHeight / 2,
        'at closest indent right': () => movingNodeOf.x > info.closestNodeOffset.x + options.indent,
        'at closest left': () => movingNodeOf.x < info.closestNodeOffset.x,
        'closest is placeholder': () => info.closestBranch === store.placeholder,
        'no aboveBranch': () => !info.aboveBranch,
        'closest has next': () => info.closestNext,
        'closest has prev': () => info.closestPrev,
        'closest has children excluding placeholder movingEl': () => {
          const childrenEl = info.closestBranch.querySelector(`.${options.childrenClass}`);

          if (childrenEl) {
            return hp.findNodeList(childrenEl.children, el => el !== movingEl && el !== store.placeholder && !isElementHidden(el));
          }
        }
      }; // convert conditions result to Boolean

      Object.keys(conditions).forEach(key => {
        const old = conditions[key];

        conditions[key] = function () {
          return Boolean(old.call(this));
        };
      }); //

      hp.attachCache(info, info);
      hp.attachCache(conditions, conditions); // actions start ========================================

      const doAction = (name, ...args) => {
        if (!store._doActionQueue) {
          store._doActionQueue = Promise.resolve();
        }

        const queue = store._doActionQueue;
        store._doActionQueue = queue.then(
        /*#__PURE__*/
        _asyncToGenerator(function* () {
          // record tried actions in one move
          if (!store.oneMoveStore.actionRecords) {
            store.oneMoveStore.actionRecords = [];
          }

          const actionRecords = store.oneMoveStore.actionRecords; //

          const action = actions[name];
          const r = action(...args);
          actionRecords.push(name);
          yield r; // set indent of placeholder

          const placeholderPath = options.getPathByBranchEl(store.placeholder);
          const placeholderNodeBack = store.placeholder.querySelector(`.${options.nodeBackClass}`);
          placeholderNodeBack.style.paddingLeft = (placeholderPath.length - 1) * options.indent + 'px'; // remove tempChildren if empty

          if (store.tempChildren.children.length === 0) {
            hp.removeEl(store.tempChildren);
          }
        }));
      };

      const actions = {
        'nothing'() {
          return _asyncToGenerator(function* () {})();
        },

        // do nothing
        'append to root'() {
          return _asyncToGenerator(function* () {
            // no closest branch, just append to root
            if (options.isTargetTreeRootDroppable(store)) {
              hp.appendTo(store.placeholder, info.root);
            }
          })();
        },

        'insert before'() {
          return _asyncToGenerator(function* () {
            if (options.isNodeParentDroppable(info.closestBranch, store.targetTreeEl)) {
              hp.insertBefore(store.placeholder, info.closestBranch);
            } else {
              return secondCase(getParentBranchByEl(info.closestBranch));
            }
          })();
        },

        'insert after'(branch = info.closestBranch) {
          return _asyncToGenerator(function* () {
            if (options.isNodeParentDroppable(branch, store.targetTreeEl)) {
              hp.insertAfter(store.placeholder, branch);
            } else {
              const moved = yield secondCase(getParentBranchByEl(branch));
              const isFirstTriedAction = !store.oneMoveStore.actionRecords || store.oneMoveStore.actionRecords.length === 1;

              if (!moved && isFirstTriedAction) {
                return thirdCase(branch);
              }
            }
          })();
        },

        prepend() {
          return _asyncToGenerator(function* () {
            if (info.closestBranch === store.placeholder) {
              return;
            }

            if (options.ifNodeFolded(info.closestBranch, store) && !options.unfoldWhenDragover) {
              return doAction('insert after', info.closestBranch);
            } else {
              if (options.isNodeDroppable(info.closestBranch, store.targetTreeEl)) {
                yield tryUnfoldAndPrepend(info.closestBranch);
              } else {
                return secondCase(info.closestBranch);
              }
            }
          })();
        },

        'after above'() {
          return _asyncToGenerator(function* () {
            if (options.isNodeParentDroppable(info.aboveBranch, store.targetTreeEl)) {
              hp.insertAfter(store.placeholder, info.aboveBranch);
            } else {
              return secondCase(getParentBranchByEl(info.aboveBranch));
            }
          })();
        },

        'append to prev'() {
          return _asyncToGenerator(function* () {
            if (info.closestPrev === store.placeholder) {
              return;
            }

            if (options.ifNodeFolded(info.closestPrev, store)) {
              return doAction('insert after', info.closestPrev);
            } else {
              if (options.isNodeDroppable(info.closestPrev, store.targetTreeEl)) {
                const childrenEl = yield unfoldAndGetChildrenEl(info.closestPrev);
                hp.appendTo(store.placeholder, childrenEl);
              } else {
                return secondCase(info.closestPrev);
              }
            }
          })();
        }

      }; // second case for actions, when target position not droppable
      // return true if moved

      const secondCase =
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(function* (branchEl) {
          if (branchEl) {
            const targetEl = options._findClosestDroppablePosition(branchEl, store.targetTreeEl);

            if (targetEl) {
              hp.insertAfter(store.placeholder, targetEl);
              return true;
            }
          }
        });

        return function secondCase(_x) {
          return _ref2.apply(this, arguments);
        };
      }(); // when action is after, first case and second case invalid, try prepend
      // 当操作是'after', 第一种第二种情况无效时, 尝试prepend


      const thirdCase =
      /*#__PURE__*/
      function () {
        var _ref3 = _asyncToGenerator(function* (branchEl) {
          // the third case
          if (!options.ifNodeFolded(branchEl, store) && options.isNodeDroppable(branchEl, store.targetTreeEl)) {
            yield tryUnfoldAndPrepend(branchEl);
          }
        });

        return function thirdCase(_x2) {
          return _ref3.apply(this, arguments);
        };
      }();

      const unfoldAndGetChildrenEl =
      /*#__PURE__*/
      function () {
        var _ref4 = _asyncToGenerator(function* (branch) {
          yield options.unfoldTargetNodeByEl(branch, store);
          let childrenEl = branch.querySelector(`.${options.childrenClass}`);

          if (!childrenEl) {
            childrenEl = store.tempChildren;
            hp.appendTo(childrenEl, branch);
          }

          return childrenEl;
        });

        return function unfoldAndGetChildrenEl(_x3) {
          return _ref4.apply(this, arguments);
        };
      }();

      const tryUnfoldAndPrepend =
      /*#__PURE__*/
      function () {
        var _ref5 = _asyncToGenerator(function* (branchEl) {
          const func =
          /*#__PURE__*/
          function () {
            var _ref6 = _asyncToGenerator(function* () {
              const childrenEl = yield unfoldAndGetChildrenEl(branchEl);
              hp.prependTo(store.placeholder, childrenEl);
            });

            return function func() {
              return _ref6.apply(this, arguments);
            };
          }();

          if (options.ifNodeFolded(branchEl, store)) {
            // delay if node folded
            let oneMoveStore = store.oneMoveStore;
            setTimeout(() => {
              // check if expired
              if (oneMoveStore === store.oneMoveStore) {
                func();
              }
            }, options.unfoldWhenDragoverDelay);
          } else {
            yield func();
          }
        });

        return function tryUnfoldAndPrepend(_x4) {
          return _ref5.apply(this, arguments);
        };
      }(); // actions end ========================================
      //


      const checkPlaceholder = () => {
        if (!store.placeholder) {
          const placeholder = hp.createElementFromHTML(`
            <div id="${options.placeholderId}" class="${options.branchClass} ${options.placeholderClass}">
              <div class="${options.nodeBackClass} ${options.placeholderNodeBackClass}">
                <div class="${options.nodeClass} ${options.placeholderNodeClass}">
                </div>
              </div>
            </div>
          `);
          hp.insertAfter(placeholder, movingEl);
          store.placeholder = placeholder;
          options.afterPlaceholderCreated(store); // create a tree children el to use when can't get childrenEl

          const tempChildren = document.createElement('DIV');
          hp.addClass(tempChildren, options.childrenClass);
          store.tempChildren = tempChildren;
        }
      }; //


      checkPlaceholder();
      doDraggableDecision({
        options,
        event,
        store,
        opt,
        info,
        conditions,
        actions,
        doAction
      });
    },
    drop: function () {
      var _drop = _asyncToGenerator(function* (endEvent, store, opt) {
        const movingEl = store.el; // branch

        const placeholder = store.placeholder,
              tempChildren = store.tempChildren; // use mask tree to avoid flick caused by DOM update in short time
        // 复制 targetTreeEl 作为遮罩, 避免短时间内更新DOM引起的闪烁

        let maskTree;

        if (placeholder) {
          // placeholder not mounted is rarely
          // create mask tree
          maskTree = store.targetTreeEl.cloneNode(true);
          store.targetTreeEl.style.display = 'none';
          hp.insertAfter(maskTree, store.targetTreeEl); //

          store.targetPath = options.getPathByBranchEl(placeholder);
          let pathChanged = isPathChanged();
          store.targetPathNotEqualToStartPath = pathChanged;
          store.pathChangePrevented = false;

          if (options.beforeDrop && options.beforeDrop(pathChanged, store, opt) === false) {
            pathChanged = false;
            store.pathChangePrevented = false;
          }

          store.pathChanged = pathChanged;
          hp.removeEl(placeholder);

          if (tempChildren) {
            hp.removeEl(tempChildren);
          }
        }

        store.restoreDOM();
        yield options.ondrop(store, opt); // remove mask tree

        if (maskTree) {
          yield hp.waitTime(30);
          hp.removeEl(maskTree);
          store.targetTreeEl.style.display = 'block';
        } //


        function isPathChanged() {
          const startTree = store.startTree,
                targetTree = store.targetTree,
                startPath = store.startPath,
                targetPath = store.targetPath;
          return startTree !== targetTree || startPath.toString() !== targetPath.toString();
        }
      });

      function drop(_x5, _x6, _x7) {
        return _drop.apply(this, arguments);
      }

      return drop;
    }()
  }),
        destroy = _draggableHelper.destroy,
        draggableHelperOptions = _draggableHelper.draggableHelperOptions;

  return {
    destroy,
    options,
    optionsUpdated
  };

  function getParentBranchByEl(el) {
    return hp.findParent(el, el => {
      if (hp.hasClass(el, options.branchClass)) {
        return true;
      }

      if (hp.hasClass(el, options.rootClass)) {
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

const treesStore = {};
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
  data() {
    return {
      treesStore
    };
  },

  // computed: {},
  // watch: {},
  methods: {
    _Draggable_unfoldTargetNodeByEl(branchEl, store) {
      const targetTree = store.targetTree;
      const path = targetTree.getPathByBranchEl(branchEl);
      const node = targetTree.getNodeByPath(path);
      targetTree.unfold && targetTree.unfold(node, path);
      return new Promise((resolve, reject) => {
        targetTree.$nextTick(() => {
          resolve();
        });
      });
    },

    isNodeDraggable(node, path) {
      const store = this.treesStore.store;
      const allNodes = this.getAllNodesByPath(path);
      allNodes.unshift(this.rootNode);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = hp.iterateAll(allNodes, {
          reverse: true
        })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          const _step$value = _step.value,
                node = _step$value.value,
                index = _step$value.index;
          const currentPath = path.slice(0, index + 1);
          const draggableOpt = node.$draggable !== undefined ? node.$draggable : this.eachDraggable;
          const draggable = hp.resolveValueOrGettter(draggableOpt, [currentPath, this, store]);

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

    isNodeDroppable(node, path) {
      const store = this.treesStore.store;
      const allNodes = this.getAllNodesByPath(path);
      allNodes.unshift(this.rootNode);
      let droppableFinal, resolved;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = hp.iterateAll(allNodes, {
          reverse: true
        })[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          const _step2$value = _step2.value,
                node = _step2$value.value,
                index = _step2$value.index;
          const currentPath = path.slice(0, index + 1);
          const droppableOpt = node.$droppable !== undefined ? node.$droppable : this.eachDroppable;
          const droppable = hp.resolveValueOrGettter(droppableOpt, [currentPath, this, store]);

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
          droppableFinal,
          node,
          path,
          store
        });
      }

      return droppableFinal;
    },

    // override
    getPathByBranchEl(branchEl) {
      const getAttrPath = el => {
        const pathStr = el.getAttribute('data-tree-node-path');

        if (pathStr) {
          return pathStr.split(',').map(v => parseInt(v));
        }
      };

      const path = getAttrPath(branchEl);

      if (path) {
        return path;
      } // placeholder path


      let parentPath;
      hp.findParent(branchEl, el => {
        if (hp.hasClass(el, 'tree-root')) {
          parentPath = [];
          return true;
        }

        if (hp.hasClass(el, 'tree-branch')) {
          parentPath = getAttrPath(el);
          return true;
        }
      });
      let index = 0;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = hp.iterateAll(branchEl.parentElement.children)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          const _step3$value = _step3.value,
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

      return [...parentPath, index];
    }

  },

  // created() {},
  mounted() {
    const options = this._draggableOptions = {
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
      placeholderId: `he_tree_drag_placeholder`,
      ifNodeFolded: (branchEl, store) => {
        const targetTree = store.targetTree;
        const node = targetTree.getNodeByBranchEl(branchEl);
        return node.$folded;
      },
      isTargetTreeRootDroppable: store => {
        const droppable = hp.resolveValueOrGettter(store.targetTree.rootNode.$droppable, [store.targetTree, store]);

        if (droppable !== undefined) {
          return droppable;
        }

        return true;
      },
      unfoldTargetNodeByEl: (...args) => this._Draggable_unfoldTargetNodeByEl(...args),
      isNodeParentDroppable: (branchEl, treeEl) => {
        const tree = this.getTreeVmByTreeEl(treeEl);
        const path = tree.getPathByBranchEl(branchEl);
        const parentPath = hp.arrayWithoutEnd(path, 1);
        const parent = tree.getNodeByPath(parentPath);
        return tree.isNodeDroppable(parent, parentPath);
      },
      isNodeDroppable: (branchEl, treeEl) => {
        const tree = this.getTreeVmByTreeEl(treeEl);
        const path = tree.getPathByBranchEl(branchEl);
        const node = tree.getNodeByPath(path);
        return tree.isNodeDroppable(node, path);
      },
      _findClosestDroppablePosition: (branchEl, treeEl) => {
        const tree = this.getTreeVmByTreeEl(treeEl);
        const path = tree.getPathByBranchEl(branchEl);
        const findPath = hp.arrayWithoutEnd(path, 1);
        let cur = path;
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = tree.iteratePath(findPath, {
            reverse: true
          })[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            const _step4$value = _step4.value,
                  node = _step4$value.node,
                  path = _step4$value.path;

            if (tree.isNodeDroppable(node, path)) {
              return tree.getBranchElByPath(cur);
            } else {
              cur = path;
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

        if (tree.isNodeDroppable(this.rootNode, [])) {
          return tree.getBranchElByPath(cur);
        }
      },
      afterPlaceholderCreated: store => {
        store.startTree.$emit('afterPlaceholderCreated', store);
      },
      getPathByBranchEl: branchEl => this.getPathByBranchEl(branchEl),
      beforeDrag: store => {
        this.treesStore.store = store;
        store.startTree = this.getTreeVmByTreeEl(store.startTreeEl);
        const draggable = hp.resolveValueOrGettter(store.startTree.draggable, [store.startTree, store]);

        if (!draggable) {
          return false;
        }
      },
      ondrag: store => {
        const startTree = store.startTree,
              dragBranchEl = store.dragBranchEl,
              startPath = store.startPath;
        const path = startTree.getPathByBranchEl(dragBranchEl);
        store.dragNode = startTree.getNodeByPath(path);

        if (this.cloneWhenDrag) {
          store.dragNode = cloneTreeData(store.dragNode);
        }

        if (!startTree.isNodeDraggable(store.dragNode, path)) {
          return false;
        }

        if (startTree.hasHook('ondragstart') && startTree.executeHook('ondragstart', [startTree, store]) === false) {
          return false;
        }

        store.startTree.$emit('drag', store);
        this.$root.$emit('he-tree-drag', store);
      },
      filterTargetTree: (targetTreeEl, store) => {
        const targetTree = this.getTreeVmByTreeEl(targetTreeEl);
        const startTree = store.startTree;

        if (startTree !== targetTree) {
          if (this._internal_hook_filterTargetTree) {
            if (this._internal_hook_filterTargetTree(targetTree, store) === false) {
              return false;
            }
          } else {
            return false;
          }
        }

        const targetTreeDroppable = hp.resolveValueOrGettter(targetTree.droppable, [targetTree, store]);

        if (!targetTreeDroppable) {
          return false;
        }

        store.targetTree = targetTree;

        if (!hp.resolveValueOrGettter(store.startTree === store.targetTree) && hp.resolveValueOrGettter(this._Draggable_unfoldTargetNode, [false, this.treeData]) !== this.rootNode.children) {
          return false;
        }
      },
      beforeDrop: (pathChanged, store) => {
        const targetTree = store.targetTree;

        if (targetTree.hasHook('ondragend') && targetTree.executeHook('ondragend', [targetTree, store]) === false) {
          return false;
        }

        targetTree.$emit('drop', store);
        this.$root.$emit('he-tree-drop', store);
      },
      ondrop: (store, t) => {
        if (store.pathChanged) {
          const startTree = store.startTree,
                targetTree = store.targetTree,
                startPath = store.startPath,
                targetPath = store.targetPath,
                dragNode = store.dragNode;

          if (this.cloneWhenDrag !== true) {
            // remove from start position
            const startParentPath = hp.arrayWithoutEnd(startPath, 1);
            const startParent = startTree.getNodeByPath(startParentPath);
            const startSiblings = startParentPath.length === 0 ? startTree.treeData : startParent.children;
            const startIndex = hp.arrayLast(startPath);
            startSiblings.splice(startIndex, 1); // update targetPath

            if (startTree === targetTree) {
              if (startPath.length <= targetPath.length) {
                const lenNoEnd = startPath.length - 1;
                let same = true;

                for (let i = 0; i < lenNoEnd; i++) {
                  const s = startPath[i];
                  const t = targetPath[i];

                  if (s !== t) {
                    same = false;
                    break;
                  }
                }

                if (same) {
                  const endIndex = startPath.length - 1;

                  if (startPath[endIndex] < targetPath[endIndex]) {
                    targetPath[endIndex] -= 1;
                  }
                }
              }
            }
          } // insert to target position


          const targetParentPath = hp.arrayWithoutEnd(targetPath, 1);
          const targetParent = targetTree.getNodeByPath(targetParentPath);
          let targetSiblings;

          if (targetParentPath.length === 0) {
            targetSiblings = targetTree.treeData;
          } else {
            if (!targetParent.children) {
              this.$set(targetParent, 'children', []);
            }

            targetSiblings = targetParent.children;
          }

          const targetIndex = hp.arrayLast(targetPath);
          targetSiblings.splice(targetIndex, 0, dragNode); // emit event

          startTree.$emit('input', startTree.treeData);
          startTree.$emit('change');

          if (targetTree !== startTree) {
            targetTree.$emit('input', targetTree.treeData);
            targetTree.$emit('change');
          }

          return new Promise((resolve, reject) => {
            targetTree.$nextTick(() => {
              resolve();
            });
          });
        }
      }
    };

    const _makeTreeDraggable_obj = this._makeTreeDraggable_obj = makeTreeDraggable(this.$el, options); // watch props and update options


    ['indent', 'triggerClass', 'unfoldWhenDragover', 'unfoldWhenDragoverDelay', 'draggingNodePositionMode', 'cloneWhenDrag'].forEach(name => {
      this.$watch(name, value => {
        _makeTreeDraggable_obj.options[name] = value;

        _makeTreeDraggable_obj.optionsUpdated();
      });
    });
  }

};

/* script */
const __vue_script__$1 = script;
/* template */

/* style */

const __vue_inject_styles__$1 = undefined;
/* scoped */

const __vue_scope_id__$1 = undefined;
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = __vue_normalize__({}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

exports.Check = check;
exports.Draggable = __vue_component__$1;
exports.Fold = fold;
exports.Tree = __vue_component__;
exports.cloneTreeData = cloneTreeData;
exports.foldAll = foldAll;
exports.getPureTreeData = getPureTreeData;
exports.unfoldAll = unfoldAll;
exports.walkTreeData = walkTreeData;
