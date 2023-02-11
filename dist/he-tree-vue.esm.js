/*!
 * he-tree-vue v3.1.2
 * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
 * Homepage: https://he-tree-vue.phphe.com
 * Released under the MIT License.
 */
import { createVNode } from 'vue';
import { TreeData, randString, findParent, hasClass, createElementFromHTML, insertAfter, addClass, getOffset, getBoundingClientRect, elementsFromPoint, isDescendantOf, attachCache, removeEl, waitTime, binarySearch, findNodeList, appendTo, insertBefore, prependTo, iterateAll, resolveValueOrGettter, arrayWithoutEnd, arrayLast } from 'helper-js';
import { updatablePropsEvenUnbound, hookHelper } from 'vue-functions';
import draggableHelper from 'draggable-helper';

function cloneTreeData(treeData, opt) {
  return new TreeData(treeData).clone(opt);
}
function walkTreeData(treeData, handler, opt) {
  return new TreeData(treeData).walk(handler, opt);
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

const template = function () {
  // convert undefined to empty str
  const noUndefined = str => str ? str : '';
  // tree tpl, to render recursively
  const childrenListTpl = (nodes, parent, parentPath) => {
    const indentStyle = {
      [!this.rtl ? 'paddingLeft' : 'paddingRight']: parentPath.length * this.indent + 'px'
    };
    const branchTpl = (node, index) => {
      const path = [...parentPath, index];
      const transitionComponent = this.foldingTransition || 'transition';
      const slotDefault = () => {
        const original = () => {
          if (this.$slots.default) {
            return this.$slots.default({
              node,
              index,
              path,
              tree: this
            });
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
        nodebackStyle = {
          ...nodebackStyle,
          ...node.$nodeBackStyle
        };
      }
      return createVNode("div", {
        "class": `tree-branch ${noUndefined(node.$branchClass)} ${noUndefined(node.$hidden && 'he-tree--hidden')}`,
        "style": node.$branchStyle || {},
        "data-tree-node-path": path.join(',')
      }, [createVNode("div", {
        "class": `tree-node-back ${noUndefined(node.$nodeBackClass)}`,
        "style": nodebackStyle || {}
      }, [createVNode("div", {
        "class": `tree-node ${noUndefined(node.$nodeClass)}`,
        "style": node.$nodeStyle || {}
      }, [slotDefault()])]), (node.children && node.children.length) > 0 && createVNode(transitionComponent, {
        "name": this.$props.foldingTransitionName
      }, {
        default: () => [!node.$folded && childrenListTpl(node.children, node, path)]
      })]);
    };
    return createVNode("div", {
      "class": `tree-children ${noUndefined(parent === this.rootNode && 'tree-root')} ${noUndefined(parent.$childrenClass)}`,
      "style": parent.$childrenStyle || {}
    }, [nodes.map(branchTpl)]);
  };
  return createVNode("div", {
    "class": `he-tree ${this.treeClass} ${noUndefined(this.rtl && 'he-tree--rtl')}`,
    "data-tree-id": this.treeId
  }, [this.blockHeader && this.blockHeader(), childrenListTpl(this.rootNode.children, this.rootNode, []), this.blockFooter && this.blockFooter()]);
};
const trees = {};
const Tree = {
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
    rtl: {
      type: Boolean
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
      treeId: randString(),
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
      handler(treeData) {
        this._TreeDataHelper = new TreeData(this.treeData);
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
      this.rootNode.children = this.treeData;
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
    this.treeId = randString();
    this.trees[this.treeId] = this;
  },
  beforeUnmount() {
    delete this.trees[this.treeId];
  },
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

function foldAll(treeData) {
  walkTreeData(treeData, childNode => {
    childNode.$folded = true;
  });
}
function unfoldAll(treeData) {
  walkTreeData(treeData, childNode => {
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
    fold(node, path) {
      if (!node.$folded) {
        node['$folded'] = true;
        this.$emit('nodeFoldedChanged', node);
        this.$emit('node-folded-changed', node);
      }
    },
    unfold(node, path, opt = {}) {
      opt = {
        foldOthers: false,
        ...opt
      };
      if (opt.foldOthers) {
        this.foldAll();
      }
      if (node.$folded) {
        node['$folded'] = false;
        this.$emit('nodeFoldedChanged', node);
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
      for (const parent of reversedParents) {
        parent['$checked'] = parent.children.every(child => child.$checked);
      }
      // update children
      if (node.children && node.children.length > 0) {
        walkTreeData(node.children, childNode => {
          childNode['$checked'] = node.$checked;
        });
      }
    },
    check(node, path) {
      node['$checked'] = true;
      this.afterCheckChanged(node, path);
    },
    uncheck(node, path) {
      node['$checked'] = false;
      this.afterCheckChanged(node, path);
    },
    toggleCheck(node, path) {
      node['$checked'] = !node.$checked;
      this.afterCheckChanged(node, path);
    }
  }
};

// arg {options, event, store, opt, info, conditions, actions, doAction}
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
  }
  // decision end =================================
}

// in follow code, options belongs to makeTreeDraggable, opt belongs to draggableHelper
function makeTreeDraggable(treeEl, options = {}) {
  options = {
    // indent: 20,
    // triggerClass: 'tree-node',
    // triggerBySelf: false,
    // unfoldWhenDragover
    // unfoldWhenDragoverDelay
    // draggingNodePositionMode
    // getTriggerEl optional
    // rootClass: 'tree-root',
    // childrenClass: 'tree-children',
    // branchClass: 'tree-branch',
    // nodeClass: 'tree-node',
    // nodeBackClass: 'tree-node-back',
    // placeholderClass: 'tree-placeholder',
    // placeholderNodeBackClass: 'tree-placeholder-node-back',
    // placeholderNodeClass: 'tree-placeholder-node',
    // draggingClass: 'dragging',
    // placeholderId
    // unfoldTargetNodeByEl
    // getPathByBranchEl
    // edgeScroll: false,
    // edgeScrollTriggerMargin: 50,
    // edgeScrollSpeed: 0.35,
    // edgeScrollTriggerMode: 'top_left_corner',
    // edgeScrol: 'top_left_corner',
    // edgeScrollSpecifiedContainerX?: HTMLElement,
    // edgeScrollSpecifiedContainerY?: HTMLElement,
    // rtl: false
    // preventTextSelection: boolean
    ...options,
    treeEl
  };
  const {
    destroy,
    options: draggableHelperOptions
  } = draggableHelper(treeEl, {
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
    getMovedOrClonedElement: (directTriggerElement, store) => {
      // find closest branch from parents
      const el = findParent(store.triggerElement, el => hasClass(el, options.branchClass), {
        withSelf: true
      });
      return el;
    },
    beforeFirstMove(store, dhOptions) {
      store.startTreeEl = treeEl;
      store.dragBranchEl = store.movedElement;
      store.startPath = options.getPathByBranchEl(store.movedOrClonedElement);
      if (options.beforeFirstMove && options.beforeFirstMove(store, dhOptions) === false) {
        return false;
      }
    },
    beforeMove: (store, dhOptions) => {
      const updatePlaceholderIndent = () => {
        // set indent of placeholder
        const placeholderPath = options.getPathByBranchEl(store.placeholder);
        const placeholderNodeBack = store.placeholder.querySelector(`.${options.nodeBackClass}`);
        placeholderNodeBack.style[!options.rtl ? 'paddingLeft' : 'paddingRight'] = (placeholderPath.length - 1) * options.indent + 'px';
        // remove tempChildren if empty
        if (store.tempChildren.children.length === 0) {
          removeEl(store.tempChildren);
        }
      };
      // first move
      // 第一次移动
      if (store.movedCount === 0) {
        // create placeholder
        // 创建占位元素
        const placeholder = createElementFromHTML(`
          <div id="${options.placeholderId}" class="${options.branchClass} ${options.placeholderClass}">
            <div class="${options.nodeBackClass} ${options.placeholderNodeBackClass}">
              <div class="${options.nodeClass} ${options.placeholderNodeClass}">
              </div>
            </div>
          </div>
        `);
        insertAfter(placeholder, store.movedOrClonedElement);
        store.placeholder = placeholder;
        options.afterPlaceholderCreated(store);
        // create a tree children el to use when can't get childrenEl
        const tempChildren = document.createElement('DIV');
        addClass(tempChildren, options.childrenClass);
        store.tempChildren = tempChildren;
        // update placeholder indent. update moved element style
        updatePlaceholderIndent();
        store.updateMovedElementStyle();
        // skip first move
        // 跳过第一次移动
        return;
      }
      // 
      store.updateMovedElementStyle();
      // 
      store.oneMoveStore = {}; // life cycle: one move
      const movingEl = store.movedElement; // branch
      // find closest branch and hovering tree
      let tree;
      const movingNode = movingEl.querySelector(`.${options.nodeClass}`);
      // movingNodeOf and movingNodeRect are not always real. when RTL, there 'x' is top right. when draggingNodePositionMode is mouse, there x and y are mouse position. So don't calc them with their width or height.
      // movingNodeOf 和 movingNodeRect并非一直如字面意义是movingNode真实坐标. RTL时, x坐标是右上角. draggingNodePositionMode是mouse时, x和y是鼠标坐标.
      let movingNodeOf = getOffset(movingNode);
      let movingNodeRect = getBoundingClientRect(movingNode);
      if (options.draggingNodePositionMode === 'mouse') {
        // use mouse position as dragging node position
        const {
          moveEvent
        } = store;
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
      }
      // find tree with elementsFromPoint
      let found;
      let firstElement;
      for (const itemEl of elementsFromPoint(movingNodeRect.x, movingNodeRect.y)) {
        if (!firstElement) {
          firstElement = itemEl;
        }
        if (hasClass(itemEl, options.treeClass)) {
          found = itemEl;
          break;
        }
      }
      // check if the found element is covered by other elements
      if (firstElement !== found && !isDescendantOf(firstElement, found)) {
        found = null;
      }
      tree = found;
      if (!tree) {
        // out of tree or tree is covered by other elements
        return;
      }
      // check if target tree right
      if (options.filterTargetTree(tree, store, dhOptions) === false) {
        return;
      }
      store.targetTreeEl = tree;
      // info ========================================
      // life cycle: one move
      const info = {
        tree: () => tree,
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
            }
            //
            const childrenEl = branch.querySelector(`.${options.childrenClass}`);
            if (childrenEl) {
              for (let i = 0; i < childrenEl.children.length; i++) {
                const child = childrenEl.children[i];
                if (child !== movingEl && hasClass(child, options.branchClass)) {
                  walkToGetNodes(child);
                }
              }
            }
          };
          walkToGetNodes(info.tree);
          //
          if (nodes.length === 0) {
            return;
          }
          //
          let found;
          const t = binarySearch(nodes, node => getOffset(node).y - movingNodeOf.y, {
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
        closestNodeOffset: () => getOffset(info.closestNode),
        closestBranch: () => findParent(info.closestNode, el => hasClass(el, options.branchClass)),
        closestNext: () => {
          let next = info.closestBranch.nextSibling;
          while (next) {
            if (next !== movingEl && hasClass(next, options.branchClass) && !isElementHidden(next)) {
              return next;
            }
            next = next.nextSibling;
          }
        },
        closestPrev: () => {
          let prev = info.closestBranch.previousSibling;
          while (prev) {
            if (prev !== movingEl && hasClass(prev, options.branchClass) && !isElementHidden(prev)) {
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
          }
          // find placeholder prev or parent
          let cur = info.closestBranch;
          let prev = cur.previousSibling;
          let found;
          while (prev) {
            if (prev !== movingEl && hasClass(prev, options.branchClass) && !isElementHidden(prev)) {
              cur = prev;
              found = true;
              break;
            }
            prev = prev.previousSibling;
          }
          if (!found) {
            cur = findParent(cur, el => hasClass(el, options.branchClass));
          }
          //
          while (cur) {
            const curNode = cur.querySelector(`.${options.nodeClass}`);
            if (!options.rtl) {
              if (getOffset(curNode).x <= movingNodeOf.x) {
                break;
              }
            } else {
              if (getOffset(curNode).x + curNode.offsetWidth >= movingNodeOf.x) {
                break;
              }
            }
            let hasNextBranch;
            let t = cur.nextSibling;
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
            const parent = findParent(cur, el => hasClass(el, options.branchClass));
            if (!parent) {
              break;
            }
            cur = parent;
          }
          return cur;
        }
      };
      // conditions ========================================
      // life cycle: one move
      const conditions = {
        'no closest': () => !info.closestNode,
        'closest is top': () => info.closestBranch === findNodeList(info.root.children, el => el !== movingEl && !isElementHidden(el)),
        'closest is top excluding placeholder': () => info.closestBranch === findNodeList(info.root.children, el => el !== movingEl && el !== store.placeholder && !isElementHidden(el)),
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
            return findNodeList(childrenEl.children, el => el !== movingEl && el !== store.placeholder && !isElementHidden(el));
          }
        }
      };
      // fix for rtl
      if (options.rtl) {
        Object.assign(conditions, {
          'at closest indent right': () => movingNodeOf.x < info.closestNodeOffset.x + info.closestNode.offsetWidth - options.indent,
          // at indent left
          'at closest left': () => movingNodeOf.x > info.closestNodeOffset.x + info.closestNode.offsetWidth // at right
        });
      }
      // convert conditions result to Boolean
      Object.keys(conditions).forEach(key => {
        const old = conditions[key];
        conditions[key] = function () {
          return Boolean(old.call(this));
        };
      });
      //
      attachCache(info, info);
      attachCache(conditions, conditions);
      store.oneMoveStore.info = info;
      store.oneMoveStore.conditions = conditions;
      // actions start ========================================
      const doAction = (name, ...args) => {
        if (!store._doActionQueue) {
          store._doActionQueue = Promise.resolve();
        }
        const queue = store._doActionQueue;
        store._doActionQueue = queue.then(async () => {
          // record tried actions in one move
          if (!store.oneMoveStore.actionRecords) {
            store.oneMoveStore.actionRecords = [];
          }
          const {
            actionRecords
          } = store.oneMoveStore;
          //
          const action = actions[name];
          const r = action(...args);
          actionRecords.push(name);
          await r;
          updatePlaceholderIndent();
        });
      };
      const actions = {
        async 'nothing'() {},
        // do nothing
        async 'append to root'() {
          // no closest branch, just append to root
          if (options.isTargetTreeRootDroppable(store)) {
            appendTo(store.placeholder, info.root);
          }
        },
        async 'insert before'() {
          if (options.isNodeParentDroppable(info.closestBranch, store.targetTreeEl)) {
            insertBefore(store.placeholder, info.closestBranch);
          } else {
            return secondCase(getParentBranchByEl(info.closestBranch));
          }
        },
        async 'insert after'(branch = info.closestBranch) {
          if (options.isNodeParentDroppable(branch, store.targetTreeEl)) {
            insertAfter(store.placeholder, branch);
          } else {
            const moved = await secondCase(getParentBranchByEl(branch));
            const isFirstTriedAction = !store.oneMoveStore.actionRecords || store.oneMoveStore.actionRecords.length === 1;
            if (!moved && isFirstTriedAction) {
              return thirdCase(branch);
            }
          }
        },
        async prepend() {
          if (info.closestBranch === store.placeholder) {
            return;
          }
          if (options.ifNodeFolded(info.closestBranch, store) && !options.unfoldWhenDragover) {
            return doAction('insert after', info.closestBranch);
          } else {
            if (options.isNodeDroppable(info.closestBranch, store.targetTreeEl)) {
              await tryUnfoldAndPrepend(info.closestBranch);
            } else {
              return secondCase(info.closestBranch);
            }
          }
        },
        async 'after above'() {
          if (options.isNodeParentDroppable(info.aboveBranch, store.targetTreeEl)) {
            insertAfter(store.placeholder, info.aboveBranch);
          } else {
            return secondCase(getParentBranchByEl(info.aboveBranch));
          }
        },
        async 'append to prev'() {
          if (info.closestPrev === store.placeholder) {
            return;
          }
          if (options.ifNodeFolded(info.closestPrev, store)) {
            return doAction('insert after', info.closestPrev);
          } else {
            if (options.isNodeDroppable(info.closestPrev, store.targetTreeEl)) {
              const childrenEl = await unfoldAndGetChildrenEl(info.closestPrev);
              appendTo(store.placeholder, childrenEl);
            } else {
              return secondCase(info.closestPrev);
            }
          }
        }
      };
      // second case for actions, when target position not droppable
      // return true if moved
      const secondCase = async branchEl => {
        if (branchEl) {
          const targetEl = options._findClosestDroppablePosition(branchEl, store.targetTreeEl);
          if (targetEl) {
            insertAfter(store.placeholder, targetEl);
            return true;
          }
        }
      };
      // when action is after, first case and second case invalid, try prepend
      // 当操作是'after', 第一种第二种情况无效时, 尝试prepend
      const thirdCase = async branchEl => {
        // the third case
        if (!options.ifNodeFolded(branchEl, store) && options.isNodeDroppable(branchEl, store.targetTreeEl)) {
          await tryUnfoldAndPrepend(branchEl);
        }
      };
      const unfoldAndGetChildrenEl = async branch => {
        await options.unfoldTargetNodeByEl(branch, store);
        let childrenEl = branch.querySelector(`.${options.childrenClass}`);
        if (!childrenEl) {
          childrenEl = store.tempChildren;
          appendTo(childrenEl, branch);
        }
        return childrenEl;
      };
      const tryUnfoldAndPrepend = async branchEl => {
        const func = async () => {
          const childrenEl = await unfoldAndGetChildrenEl(branchEl);
          prependTo(store.placeholder, childrenEl);
        };
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
          await func();
        }
      };
      // actions end ========================================
      doDraggableDecision({
        options,
        event: store.moveEvent,
        store,
        opt: dhOptions,
        info,
        conditions,
        actions,
        doAction
      });
    },
    afterMove: (store, dhOptions) => {
      options.afterMove && options.afterMove(store, dhOptions);
    },
    beforeDrop: async (store, dhOptions) => {
      const movingEl = store.movedElement; // branch
      const {
        placeholder,
        tempChildren,
        movedCount,
        targetTreeEl,
        startTreeEl
      } = store;
      // use mask tree to avoid flick caused by DOM update in short time
      // 复制 targetTreeEl 作为遮罩, 避免短时间内更新DOM引起的闪烁
      let maskTree, maskTree2;
      if (targetTreeEl) {
        // No targetTreeEl mean no valid move.
        // targetTreeEl不存在意味着没有有效移动.

        // create mask tree
        maskTree = targetTreeEl.cloneNode(true);
        targetTreeEl.style.display = 'none';
        insertAfter(maskTree, targetTreeEl);
        if (startTreeEl !== targetTreeEl) {
          maskTree2 = startTreeEl.cloneNode(true);
          startTreeEl.style.display = 'none';
          insertAfter(maskTree2, startTreeEl);
        }
        //
        store.targetPath = options.getPathByBranchEl(placeholder);
        let pathChanged = isPathChanged();
        store.targetPathNotEqualToStartPath = pathChanged;
        store.pathChangePrevented = false;
        if (options.beforeDrop && options.beforeDrop(pathChanged, store, dhOptions) === false) {
          pathChanged = false;
          store.pathChangePrevented = false;
        }
        store.pathChanged = pathChanged;
      }
      // destroy placeholder and tempChildren
      removeEl(placeholder);
      if (tempChildren) {
        removeEl(tempChildren);
      }
      store.updateMovedElementStyle();
      // 
      await options.afterDrop(store, dhOptions);
      // remove mask tree
      if (maskTree) {
        await waitTime(30);
        removeEl(maskTree);
        targetTreeEl.style.display = 'block';
        if (maskTree2) {
          removeEl(maskTree2);
          startTreeEl.style.display = 'block';
        }
      }
      //
      function isPathChanged() {
        const {
          startTree,
          targetTree,
          startPath,
          targetPath
        } = store;
        if (startTree === targetTree && startPath.length === targetPath.length) {
          if (startPath.toString() === targetPath.toString()) {
            return false;
          } else {
            // downward same-level move, the end of targetPath is 1 more than real value 
            // 同级向下移动时, targetPath的末位比真实值大1
            const t = startPath.slice(0);
            t[t.length - 1]++;
            if (t.toString() === targetPath.toString()) {
              return false;
            }
          }
        }
        return true;
      }
    }
  });
  return {
    destroy,
    options,
    optionsUpdated
  };
  function getParentBranchByEl(el) {
    return findParent(el, el => {
      if (hasClass(el, options.branchClass)) {
        return true;
      }
      if (hasClass(el, options.rootClass)) {
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

const treesStore = {};
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
  data() {
    return {
      treesStore
    };
  },
  // computed: {},
  // watch: {},
  methods: {
    _Draggable_unfoldTargetNodeByEl(branchEl, store) {
      const {
        targetTree
      } = store;
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
      const {
        store
      } = this.treesStore;
      const allNodes = this.getAllNodesByPath(path);
      allNodes.unshift(this.rootNode);
      for (const {
        value: node,
        index
      } of iterateAll(allNodes, {
        reverse: true
      })) {
        const currentPath = path.slice(0, index + 1);
        const draggableOpt = node.$draggable !== undefined ? node.$draggable : this.eachDraggable;
        const draggable = resolveValueOrGettter(draggableOpt, [currentPath, this, store]);
        if (draggable === undefined) {
          continue;
        } else {
          return draggable;
        }
      }
      return true;
    },
    isNodeDroppable(node, path) {
      const {
        store
      } = this.treesStore;
      const allNodes = this.getAllNodesByPath(path);
      allNodes.unshift(this.rootNode);
      let droppableFinal, resolved;
      for (const {
        value: node,
        index
      } of iterateAll(allNodes, {
        reverse: true
      })) {
        const currentPath = path.slice(0, index + 1);
        const droppableOpt = node.$droppable !== undefined ? node.$droppable : this.eachDroppable;
        const droppable = resolveValueOrGettter(droppableOpt, [currentPath, this, store]);
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
      const store = this.treesStore.store;
      const getAttrPath = el => {
        const pathStr = el.getAttribute('data-tree-node-path');
        if (pathStr) {
          return pathStr.split(',').map(v => parseInt(v));
        }
      };
      const path = getAttrPath(branchEl);
      if (path) {
        return path;
      }
      // placeholder path
      let parentPath;
      findParent(branchEl, el => {
        if (hasClass(el, 'tree-root')) {
          parentPath = [];
          return true;
        }
        if (hasClass(el, 'tree-branch')) {
          parentPath = getAttrPath(el);
          return true;
        }
      });
      let index = 0;
      for (const {
        value: el,
        index: index2
      } of iterateAll(branchEl.parentElement.children)) {
        if (hasClass(el, 'tree-branch') || hasClass(el, 'tree-placeholder')) {
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
    const options = this._draggableOptions = {
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
      placeholderId: `he_tree_drag_placeholder`,
      ifNodeFolded: (branchEl, store) => {
        const {
          targetTree
        } = store;
        const node = targetTree.getNodeByBranchEl(branchEl);
        return node.$folded;
      },
      isTargetTreeRootDroppable: store => {
        const droppable = resolveValueOrGettter(store.targetTree.rootNode.$droppable, [store.targetTree, store]);
        if (droppable !== undefined) {
          return droppable;
        }
        return true;
      },
      unfoldTargetNodeByEl: (...args) => this._Draggable_unfoldTargetNodeByEl(...args),
      isNodeParentDroppable: (branchEl, treeEl) => {
        const tree = this.getTreeVmByTreeEl(treeEl);
        const path = tree.getPathByBranchEl(branchEl);
        const parentPath = arrayWithoutEnd(path, 1);
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
        const findPath = arrayWithoutEnd(path, 1);
        let cur = path;
        for (const {
          node,
          path
        } of tree.iteratePath(findPath, {
          reverse: true
        })) {
          if (tree.isNodeDroppable(node, path)) {
            return tree.getBranchElByPath(cur);
          } else {
            cur = path;
          }
        }
        if (tree.isNodeDroppable(this.rootNode, [])) {
          return tree.getBranchElByPath(cur);
        }
      },
      afterPlaceholderCreated: store => {
        store.startTree.$emit('afterPlaceholderCreated', store);
        store.startTree.$emit('after-placeholder-created', store);
      },
      getPathByBranchEl: branchEl => this.getPathByBranchEl(branchEl),
      beforeFirstMove: store => {
        this.treesStore.store = store;
        store.startTree = this.getTreeVmByTreeEl(store.startTreeEl);
        const draggable = resolveValueOrGettter(store.startTree.draggable, [store.startTree, store]);
        if (!draggable) {
          return false;
        }
        const {
          startTree,
          dragBranchEl,
          startPath
        } = store;
        store.dragNode = startTree.getNodeByPath(startPath);
        if (this.cloneWhenDrag) {
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
        this.$root.$emit('he-tree-drag', store);
      },
      filterTargetTree: (targetTreeEl, store) => {
        const targetTree = this.getTreeVmByTreeEl(targetTreeEl);
        const {
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
        const targetTreeDroppable = resolveValueOrGettter(targetTree.droppable, [targetTree, store]);
        if (!targetTreeDroppable) {
          return false;
        }
        store.targetTree = targetTree;
        if (!resolveValueOrGettter(store.startTree === store.targetTree) && resolveValueOrGettter(this._Draggable_unfoldTargetNode, [false, this.treeData]) !== this.rootNode.children) {
          return false;
        }
      },
      afterMove: store => {
        store.startTree.$emit('after-move', store);
      },
      beforeDrop: (pathChanged, store) => {
        const {
          targetTree
        } = store;
        if (targetTree.hasHook('ondragend') && targetTree.executeHook('ondragend', [targetTree, store]) === false) {
          return false;
        }
        this.$root.$emit('he-tree-before-drop', store);
      },
      afterDrop: (store, t) => {
        if (store.pathChanged) {
          const {
            startTree,
            targetTree,
            startPath,
            dragNode
          } = store;
          let {
            targetPath
          } = store;
          if (this.cloneWhenDrag !== true) {
            // remove from start position
            const startParentPath = arrayWithoutEnd(startPath, 1);
            const startParent = startTree.getNodeByPath(startParentPath);
            const startSiblings = startParentPath.length === 0 ? startTree.treeData : startParent.children;
            const startIndex = arrayLast(startPath);
            startSiblings.splice(startIndex, 1);
            // remove node from the starting position may affect the target path.
            // example
            //  startPath   targetPath
            //  [0]         [1]
            //  [0]         [1, 0]
            //  [3, 1]      [3, 3]
            //  [3, 1]      [3, 3, 5]
            // above targetPaths should be transformed to [0], [0, 0] [3, 2] [3, 2, 5]
            if (startTree === targetTree) {
              if (startPath.length <= targetPath.length) {
                const sw = startPath.slice(0, startPath.length - 1); // without end
                const tw = targetPath.slice(0, sw.length); // same length with sw
                if (sw.toString() === tw.toString()) {
                  const endIndex = sw.length;
                  if (startPath[endIndex] < targetPath[endIndex]) {
                    // deprecated. I forgot why create a copy of targetPath. //  targetPath = targetPath.slice(0) // create a copy of targetPath
                    targetPath[endIndex] -= 1;
                  } else if (startPath[endIndex] === targetPath[endIndex]) {
                    console.error('Draggable.afterDrop: That is impossible!');
                  }
                }
              }
            }
          }
          // insert to target position
          const targetParentPath = arrayWithoutEnd(targetPath, 1);
          const targetParent = targetTree.getNodeByPath(targetParentPath);
          let targetSiblings;
          if (targetParentPath.length === 0) {
            targetSiblings = targetTree.treeData;
          } else {
            if (!targetParent.children) {
              targetParent['children'] = [];
            }
            targetSiblings = targetParent.children;
          }
          const targetIndex = arrayLast(targetPath);
          targetSiblings.splice(targetIndex, 0, dragNode);
          // emit event
          startTree.$emit('input', startTree.treeData);
          startTree.$emit('change', store);
          targetTree.$emit('drop', store);
          this.$root.$emit('he-tree-drop', store);
          if (targetTree !== startTree) {
            targetTree.$emit('input', targetTree.treeData);
            targetTree.$emit('change', store);
          }
          return new Promise((resolve, reject) => {
            targetTree.$nextTick(() => {
              resolve();
            });
          });
        }
      }
    };
    const _makeTreeDraggable_obj = this._makeTreeDraggable_obj = makeTreeDraggable(this.$el, options);
    // watch props and update options
    ['indent', 'triggerClass', 'triggerBySelf', 'unfoldWhenDragover', 'unfoldWhenDragoverDelay', 'draggingNodePositionMode', 'cloneWhenDrag', 'edgeScroll', 'edgeScrollTriggerMargin', 'edgeScrollSpeed', 'edgeScrollTriggerMode', 'edgeScrollSpecifiedContainerY', 'edgeScrollSpecifiedContainerY', 'rtl', 'preventTextSelection'].forEach(name => {
      this.$watch(name, value => {
        _makeTreeDraggable_obj.options[name] = value;
        _makeTreeDraggable_obj.optionsUpdated();
      });
    });
  }
};

export { check as Check, Draggable_vue as Draggable, fold as Fold, Tree, cloneTreeData, foldAll, getPureTreeData, unfoldAll, walkTreeData };
