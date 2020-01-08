/*!
 * he-tree-vue v1.0.0-beta
 * (c) phphe <phphe@outlook.com> (https://github.com/phphe) Homepage: https://he-tree-vue.phphe.com
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var hp = require('helper-js');
var vf = require('vue-functions');
var __vue_normalize__ = _interopDefault(require('vue-runtime-helpers/dist/normalize-component.mjs'));
var draggableHelper = _interopDefault(require('draggable-helper'));

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function cloneTreeData(treeData, opt) {
  return new hp.TreeData(treeData).clone(opt);
}
function walkTreeData(treeData, handler, opt) {
  return new hp.TreeData(treeData).walk(handler, opt);
}
function getPureTreeData(treeData) {
  var opt = {
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

var template = function template(h) {
  // convert undefined to empty str
  var noUndefined = str => str ? str : ''; // tree tpl, to render recursively


  var childrenListTpl = (nodes, parent, parentPath) => {
    var indentStyle = {
      paddingLeft: parentPath.length * this.indent + 'px'
    };

    var branchTpl = (node, index) => {
      var path = [...parentPath, index];
      var transitionComponent = this.foldingTransition || 'transition';

      var slotDefault = () => {
        var original = () => {
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

      var nodebackStyle = indentStyle;

      if (node.$nodeBackStyle) {
        nodebackStyle = _objectSpread2({}, nodebackStyle, {}, node.$nodeBackStyle);
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
          "name": this.$props.foldingTransitionName
        }
      }, [!node.$folded && childrenListTpl(node.children, node, path)])]);
    };

    return h("div", {
      "class": "tree-children ".concat(noUndefined(parent === this.rootNode && 'tree-root'), " ").concat(noUndefined(parent.$childrenClass)),
      "style": parent.$childrenStyle || {}
    }, [nodes.map(branchTpl)]);
  };

  return h("div", {
    "class": "he-tree ".concat(this.treeClass),
    "attrs": {
      "data-tree-id": this._uid
    }
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
    rootNode: {
      default: is => ({})
    }
  },

  // components: {},
  data() {
    return {
      trees,
      treeClass: ''
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
      return this.$el.querySelector("[data-tree-node-path='".concat(path.join(','), "']"));
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
    var updateRootNode = () => {
      this.$set(this.rootNode, 'children', this.treeData);
    };

    this.$watch('rootNode', updateRootNode, {
      immediate: true
    });
    this.$watch('treeData', updateRootNode, {
      immediate: true
    }); //

    this.$set(this.trees, this._uid, this);
    this.$once('hook:beforeDestroy', () => {
      this.$delete(this.trees, this._uid);
    });
  },

  // mounted() {},
  // beforeDestroy() {},
  //
  mixPlugins(plugins) {
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

    unfold(node, path) {
      var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      opt = _objectSpread2({
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
      var nodes = this.getAllNodesByPath(path);
      var reversedParents = nodes.slice(0, nodes.length - 1);
      reversedParents.reverse();

      for (var parent of reversedParents) {
        this.$set(parent, '$checked', parent.children.every(child => child.$checked));
      } // update children


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

function doDraggableDecision (_ref) {
  var {
    conditions,
    doAction
  } = _ref;

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

function makeTreeDraggable(treeEl) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  options = _objectSpread2({}, options, {
    treeEl
  });
  var {
    destroy,
    draggableHelperOptions
  } = draggableHelper(treeEl, {
    draggingClass: options.draggingClass,
    restoreDOMManuallyOndrop: true,
    clone: options.cloneWhenDrag,

    beforeDrag(startEvent, moveEvent, store, opt) {
      store.startTreeEl = treeEl;

      if (options.beforeDrag && options.beforeDrag(store, opt) === false) {
        return false;
      } // if the event target is a trigger


      var isTrigger = hp.findParent(startEvent.target, el => {
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
      var el = hp.findParent(store.startEvent.target, el => hp.hasClass(el, options.branchClass), {
        withSelf: true
      });
      return el;
    },
    drag: (startEvent, moveEvent, store, opt) => {
      store.dragBranchEl = store.el;
      var movingEl = store.el; // branch

      store.startPath = options.getPathByBranchEl(movingEl);

      if (options.ondrag && options.ondrag(store, opt) === false) {
        return false;
      }
    },
    moving: (moveEvent, store, opt) => {
      // return false in moving will prevent move animation; return undefined just prevent doAction
      store.oneMoveStore = {}; // life cycle: one move

      var movingEl = store.el; // branch
      // find closest branch and hovering tree

      var _tree;

      var movingNode = movingEl.querySelector(".".concat(options.nodeClass));
      var movingNodeOf = hp.getOffset(movingNode);
      var movingNodeRect = hp.getBoundingClientRect(movingNode);
      var elsBetweenMovingElAndTree = []; // including tree

      var elsToTree = []; // start from top, including tree
      // loop to find put els between movingEl and tree

      var movingElLooped; // 已循环到了movingEl

      for (var itemEl of hp.elementsFromPoint(movingNodeRect.x, movingNodeRect.y)) {
        if (movingElLooped) {
          elsBetweenMovingElAndTree.push(itemEl);
        } else if (itemEl === movingEl) {
          movingElLooped = true;
        }

        elsToTree.push(itemEl);

        if (hp.hasClass(itemEl, options.treeClass)) {
          _tree = itemEl;
          break;
        }
      } // this is an issue, sometimes, the movingEl is not in elementsFromPoint result


      if (!movingElLooped) {
        elsBetweenMovingElAndTree.push(...elsToTree);
      }

      if (!_tree) {
        // out of tree
        return;
      } // check tree if is covered, like modal


      var treeBeCoved;

      if (elsBetweenMovingElAndTree && elsBetweenMovingElAndTree[0]) {
        if (elsBetweenMovingElAndTree[0] !== _tree && !hp.isDescendantOf(elsBetweenMovingElAndTree[0], _tree)) {
          treeBeCoved = true;
        }
      }

      if (treeBeCoved) {
        return;
      } // check if target tree right


      if (options.filterTargetTree(_tree, store, opt) === false) {
        return;
      }

      store.targetTreeEl = _tree; // info ========================================
      // life cycle: one move

      var info = {
        tree: () => _tree,
        root: () => info.tree.querySelector(".".concat(options.childrenClass)),
        closestNode: () => {
          var nodes = []; // all visible nodes sort by y

          var walkToGetNodes = branch => {
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
          var t = hp.binarySearch(nodes, node => hp.getOffset(node).y - movingNodeOf.y, null, null, true);

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
          var next = info.closestBranch.nextSibling;

          while (next) {
            if (next !== movingEl && hp.hasClass(next, options.branchClass) && !isElementHidden(next)) {
              return next;
            }

            next = next.nextSibling;
          }
        },
        closestPrev: () => {
          var prev = info.closestBranch.previousSibling;

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
            cur = hp.findParent(cur, el => hp.hasClass(el, options.branchClass));
          } //


          while (cur) {
            var curNode = cur.querySelector(".".concat(options.nodeClass));

            if (hp.getOffset(curNode).x <= movingNodeOf.x) {
              break;
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

            var parent = hp.findParent(cur, el => hp.hasClass(el, options.branchClass));

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
          var childrenEl = info.closestBranch.querySelector(".".concat(options.childrenClass));

          if (childrenEl) {
            return hp.findNodeList(childrenEl.children, el => el !== movingEl && el !== store.placeholder && !isElementHidden(el));
          }
        }
      }; // convert conditions result to Boolean

      Object.keys(conditions).forEach(key => {
        var old = conditions[key];

        conditions[key] = function () {
          return Boolean(old.call(this));
        };
      }); //

      hp.attachCache(info, info);
      hp.attachCache(conditions, conditions); // actions start ========================================

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
        _asyncToGenerator(function* () {
          // record tried actions in one move
          if (!store.oneMoveStore.actionRecords) {
            store.oneMoveStore.actionRecords = [];
          }

          var {
            actionRecords
          } = store.oneMoveStore; //

          var action = actions[name];
          var r = action(...args);
          actionRecords.push(name);
          yield r; // set indent of placeholder

          var placeholderPath = options.getPathByBranchEl(store.placeholder);
          var placeholderNodeBack = store.placeholder.querySelector(".".concat(options.nodeBackClass));
          placeholderNodeBack.style.paddingLeft = (placeholderPath.length - 1) * options.indent + 'px'; // remove tempChildren if empty

          if (store.tempChildren.children.length === 0) {
            hp.removeEl(store.tempChildren);
          }
        }));
      };

      var actions = {
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

        'insert after'() {
          var _arguments = arguments;
          return _asyncToGenerator(function* () {
            var branch = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : info.closestBranch;

            if (options.isNodeParentDroppable(branch, store.targetTreeEl)) {
              hp.insertAfter(store.placeholder, branch);
            } else {
              var moved = yield secondCase(getParentBranchByEl(branch));
              var isFirstTriedAction = !store.oneMoveStore.actionRecords || store.oneMoveStore.actionRecords.length === 1;

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
                var childrenEl = yield unfoldAndGetChildrenEl(info.closestBranch);
                hp.prependTo(store.placeholder, childrenEl);
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

            if (options.ifNodeFolded(info.closestPrev, store) && !options.unfoldWhenDragover) {
              return doAction('insert after', info.closestPrev);
            } else {
              if (options.isNodeDroppable(info.closestPrev, store.targetTreeEl)) {
                var childrenEl = yield unfoldAndGetChildrenEl(info.closestPrev);
                hp.appendTo(store.placeholder, childrenEl);
              } else {
                return secondCase(info.closestPrev);
              }
            }
          })();
        }

      }; // second case for actions, when target position not droppable
      // return true if moved

      var secondCase =
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(function* (branchEl) {
          if (branchEl) {
            var targetEl = options._findClosestDroppablePosition(branchEl, store.targetTreeEl);

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


      var thirdCase =
      /*#__PURE__*/
      function () {
        var _ref3 = _asyncToGenerator(function* (branchEl) {
          // the third case
          if (options.isNodeDroppable(branchEl, store.targetTreeEl)) {
            var childrenEl = yield unfoldAndGetChildrenEl(branchEl);
            hp.prependTo(store.placeholder, childrenEl);
          }
        });

        return function thirdCase(_x2) {
          return _ref3.apply(this, arguments);
        };
      }();

      var unfoldAndGetChildrenEl =
      /*#__PURE__*/
      function () {
        var _ref4 = _asyncToGenerator(function* (branch) {
          yield options.unfoldTargetNodeByEl(branch, store);
          var childrenEl = branch.querySelector(".".concat(options.childrenClass));

          if (!childrenEl) {
            childrenEl = store.tempChildren;
            hp.appendTo(childrenEl, branch);
          }

          return childrenEl;
        });

        return function unfoldAndGetChildrenEl(_x3) {
          return _ref4.apply(this, arguments);
        };
      }(); // actions end ========================================
      //


      var checkPlaceholder = () => {
        if (!store.placeholder) {
          var placeholder = hp.createElementFromHTML("\n            <div id=\"".concat(options.placeholderId, "\" class=\"").concat(options.branchClass, " ").concat(options.placeholderClass, "\">\n              <div class=\"").concat(options.nodeBackClass, " ").concat(options.placeholderNodeBackClass, "\">\n                <div class=\"").concat(options.nodeClass, " ").concat(options.placeholderNodeClass, "\">\n                </div>\n              </div>\n            </div>\n          "));
          hp.insertAfter(placeholder, movingEl);
          store.placeholder = placeholder;
          options.afterPlaceholderCreated(store); // create a tree children el to use when can't get childrenEl

          var tempChildren = document.createElement('DIV');
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
        var movingEl = store.el; // branch

        var {
          placeholder,
          tempChildren
        } = store; // use mask tree to avoid flick caused by DOM update in short time
        // 复制 targetTreeEl 作为遮罩, 避免短时间内更新DOM引起的闪烁

        var maskTree;

        if (placeholder) {
          // placeholder not mounted is rarely
          // create mask tree
          maskTree = store.targetTreeEl.cloneNode(true);
          store.targetTreeEl.style.display = 'none';
          hp.insertAfter(maskTree, store.targetTreeEl); //

          store.targetPath = options.getPathByBranchEl(placeholder);
          var pathChanged = isPathChanged();
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
          var {
            startTree,
            targetTree,
            startPath,
            targetPath
          } = store;
          return startTree !== targetTree || startPath.toString() !== targetPath.toString();
        }
      });

      function drop(_x4, _x5, _x6) {
        return _drop.apply(this, arguments);
      }

      return drop;
    }()
  });
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
      type: [Boolean, Function]
    },
    eachDroppable: {
      type: [Boolean, Function]
    },
    ondragstart: {
      type: Function
    },
    ondragend: {
      type: Function
    },
    unfoldWhenDragover: {
      type: Boolean,
      default: true
    }
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
      var {
        targetTree
      } = store;
      var path = targetTree.getPathByBranchEl(branchEl);
      var node = targetTree.getNodeByPath(path);
      targetTree.unfold && targetTree.unfold(node, path);
      return new Promise((resolve, reject) => {
        targetTree.$nextTick(() => {
          resolve();
        });
      });
    },

    isNodeDraggable(node, path) {
      var {
        store
      } = this.treesStore;
      var allNodes = this.getAllNodesByPath(path);
      allNodes.unshift(this.rootNode);

      for (var {
        value: _node,
        index
      } of hp.iterateAll(allNodes, {
        reverse: true
      })) {
        var currentPath = path.slice(0, index + 1);
        var draggableOpt = _node.$draggable !== undefined ? _node.$draggable : this.eachDraggable;
        var draggable = hp.resolveValueOrGettter(draggableOpt, [currentPath, this, store]);

        if (draggable === undefined) {
          continue;
        } else {
          return draggable;
        }
      }

      return true;
    },

    isNodeDroppable(node, path) {
      var {
        store
      } = this.treesStore;
      var allNodes = this.getAllNodesByPath(path);
      allNodes.unshift(this.rootNode);
      var droppableFinal, resolved;

      for (var {
        value: _node2,
        index
      } of hp.iterateAll(allNodes, {
        reverse: true
      })) {
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
      var getAttrPath = el => {
        var pathStr = el.getAttribute('data-tree-node-path');

        if (pathStr) {
          return pathStr.split(',').map(v => parseInt(v));
        }
      };

      var path = getAttrPath(branchEl);

      if (path) {
        return path;
      } // placeholder path


      var parentPath;
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
      var index = 0;

      for (var {
        value: el,
        index: index2
      } of hp.iterateAll(branchEl.parentElement.children)) {
        if (hp.hasClass(el, 'tree-branch') || hp.hasClass(el, 'tree-placeholder')) {
          if (el === branchEl) {
            break;
          }

          index++;
        }
      }

      return [...parentPath, index];
    }

  },

  // created() {},
  mounted() {
    var _this = this;

    var options = this._draggableOptions = {
      indent: this.indent,
      triggerClass: this.triggerClass,
      unfoldWhenDragover: this.unfoldWhenDragover,
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
      ifNodeFolded: (branchEl, store) => {
        var {
          targetTree
        } = store;
        var node = targetTree.getNodeByBranchEl(branchEl);
        return node.$folded;
      },
      isTargetTreeRootDroppable: store => {
        var droppable = hp.resolveValueOrGettter(store.targetTree.rootNode.$droppable, [store.targetTree, store]);

        if (droppable !== undefined) {
          return droppable;
        }

        return true;
      },
      unfoldTargetNodeByEl: function unfoldTargetNodeByEl() {
        return _this._Draggable_unfoldTargetNodeByEl(...arguments);
      },
      isNodeParentDroppable: (branchEl, treeEl) => {
        var tree = this.getTreeVmByTreeEl(treeEl);
        var path = tree.getPathByBranchEl(branchEl);
        var parentPath = hp.arrayWithoutEnd(path, 1);
        var parent = tree.getNodeByPath(parentPath);
        return tree.isNodeDroppable(parent, parentPath);
      },
      isNodeDroppable: (branchEl, treeEl) => {
        var tree = this.getTreeVmByTreeEl(treeEl);
        var path = tree.getPathByBranchEl(branchEl);
        var node = tree.getNodeByPath(path);
        return tree.isNodeDroppable(node, path);
      },
      _findClosestDroppablePosition: (branchEl, treeEl) => {
        var tree = this.getTreeVmByTreeEl(treeEl);
        var path = tree.getPathByBranchEl(branchEl);
        var findPath = hp.arrayWithoutEnd(path, 1);
        var cur = path;

        for (var {
          node,
          path: _path
        } of this.iteratePath(findPath, {
          reverse: true
        })) {
          if (tree.isNodeDroppable(node, _path)) {
            return tree.getBranchElByPath(cur);
          } else {
            cur = _path;
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
        var draggable = hp.resolveValueOrGettter(store.startTree.draggable, [store.startTree, store]);

        if (!draggable) {
          return false;
        }
      },
      ondrag: store => {
        var {
          startTree,
          dragBranchEl,
          startPath
        } = store;
        var path = startTree.getPathByBranchEl(dragBranchEl);
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
        var targetTree = this.getTreeVmByTreeEl(targetTreeEl);
        var {
          startTree
        } = store;

        if (startTree !== targetTree) {
          if (this._internal_hook_filterTargetTree) {
            if (this._internal_hook_filterTargetTree(targetTree, store) === false) {
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

        if (!hp.resolveValueOrGettter(store.startTree === store.targetTree) && hp.resolveValueOrGettter(this._Draggable_unfoldTargetNode, [false, this.treeData]) !== this.rootNode.children) {
          return false;
        }
      },
      beforeDrop: (pathChanged, store) => {
        var {
          targetTree
        } = store;

        if (targetTree.hasHook('ondragend') && targetTree.executeHook('ondragend', [targetTree, store]) === false) {
          return false;
        }

        targetTree.$emit('drop', store);
        this.$root.$emit('he-tree-drop', store);
      },
      ondrop: (store, t) => {
        if (store.pathChanged) {
          var {
            startTree,
            targetTree,
            startPath,
            targetPath,
            dragNode
          } = store;

          if (this.cloneWhenDrag !== true) {
            // remove from start position
            var startParentPath = hp.arrayWithoutEnd(startPath, 1);
            var startParent = startTree.getNodeByPath(startParentPath);
            var startSiblings = startParentPath.length === 0 ? startTree.treeData : startParent.children;
            var startIndex = hp.arrayLast(startPath);
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


          var targetParentPath = hp.arrayWithoutEnd(targetPath, 1);
          var targetParent = targetTree.getNodeByPath(targetParentPath);
          var targetSiblings;

          if (targetParentPath.length === 0) {
            targetSiblings = targetTree.treeData;
          } else {
            if (!targetParent.children) {
              this.$set(targetParent, 'children', []);
            }

            targetSiblings = targetParent.children;
          }

          var targetIndex = hp.arrayLast(targetPath);
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

    var _makeTreeDraggable_obj = this._makeTreeDraggable_obj = makeTreeDraggable(this.$el, options); // watch props and update options


    ['indent', 'triggerClass', 'unfoldWhenDragover', 'cloneWhenDrag'].forEach(name => {
      this.$watch(name, value => {
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

exports.Check = check;
exports.Draggable = __vue_component__$1;
exports.Fold = fold;
exports.Tree = __vue_component__;
exports.cloneTreeData = cloneTreeData;
exports.getPureTreeData = getPureTreeData;
exports.walkTreeData = walkTreeData;
