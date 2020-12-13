import { defineComponent, VNode, PropType } from 'vue'
import * as dh from "draggable-helper";

interface Node {
  [propName: string]: any
  children?: Node[]
  $hidden?: boolean
  $branchClass?: any
  $nodeBackClass?: any
  $nodeClass?: any
  $childrenClass?: any
  $branchStyle?: any
  $nodeBackStyle?: any
  $nodeStyle?: any
  $childrenStyle?: any
  $folded?: boolean
  $checked?: boolean
  $draggable?(currentPath: Path, tree: Tree, store: Store): IsDraggableOrIsDroppable
  $droppable?(currentPath: Path, tree: Tree, store: Store): IsDraggableOrIsDroppable
}
type TreeData = Node[]
type Path = number[]

interface iteratePathOptions {
  reverse: boolean
}
interface Trees {
  [treeId: string]: any
}
type overrideSlotDefault_arg0 = {node: Node, index: number, path: Path, tree: Tree}
// the original vnodes if this.overrideSlotDefault is not defined
interface VNodeFunc{
  (): VNode
}
// interface overrideSlotDefault{
//   (info: overrideSlotDefault_arg0, original: VNodeFunc): any
// }
const tree = defineComponent({
  props: {
    value: {type: Object as PropType<TreeData>, required: true},
    indent: {type: Number, default: 20},
    rtl: {type: Boolean},
    rootNode: {type: Object as PropType<Node>, default: () => ({})},
  },
  computed: {
    treeData: {
      get(): TreeData {
        return {} as TreeData
      },
      set(value: TreeData) {},
    },
  },
  data() {
    return {
      trees: {} as Trees,
      treeClass: '',
      treeId: '',
      // hooks. in data not in props, so you only can set it by extend or mixins, and override it
      overrideSlotDefault: {} as VNodeFunc,
      blockHeader: {} as VNodeFunc,
      blockFooter: {} as VNodeFunc,
    }
  },
  methods: {
    iteratePath(path: Path, opt?: iteratePathOptions){ return {} as IterableIterator<[Path, Node]> },
    getTreeVmByTreeEl(treeEl: HTMLElement) {return {} as any},
    getAllNodesByPath(path: Path) {return {} as Node},
    getNodeByPath(path: Path) {return {} as Node},
    getPathByBranchEl(branchEl: HTMLElement) {return {} as Path},
    getBranchElByPath(path: Path) {return {} as HTMLElement},
    getNodeParentByPath(path: Path) {return {} as Node},
    removeNodeByPath(path: Path) {return {} as Node},
    walkTreeData(callback: walkTreeDataCallback, options?: {reverse: boolean}) {},
    cloneTreeData(options?: cloneTreeDataOptions) {return {} as TreeData},
    // remove key which starts with '$
    getPureTreeData(){return {} as TreeData},
  },
})
export type Tree = typeof tree

interface unfoldOptions {
  foldOthers: boolean
}
// plugins ========================
const fold = defineComponent({
  props: {
    foldingTransitionName: {type: String},
    foldingTransition: {type: Object as PropType<any>},  // transition component
    foldAllAfterMounted: {type: Boolean},
  },
  methods: {
    fold(node: Node, path: Path){},
    unfold(node: Node, path: Path, opt?:unfoldOptions){},
    toggleFold(node: Node, path: Path, opt?:unfoldOptions){},
    foldAll(){},
    unfoldAll(){},
  },
})
export type Fold = typeof fold

export interface foldAll {
  (treeData: TreeData): void
}

export interface unfoldAll {
  (treeData: TreeData): void
}

const check = defineComponent({
  methods: {
    check(node: Node, path: Path){},
    uncheck(node: Node, path: Path){},
    toggleCheck(node: Node, path: Path){},
  }
})
export type Check = typeof check
type IsDraggableOrIsDroppable = boolean | undefined
// darg info store
interface Store extends dh.Store{
  startTreeEl?: HTMLElement
  startTree?: any
  startPath?: Path
  dragBranchEl?: HTMLElement
  dragNode?: Node
  targetTreeEl?: HTMLElement
  targetTree?: any
  targetPath?: Path
  targetPathNotEqualToStartPath?: boolean
  placeholder?: HTMLElement
  pathChangePrevented?: boolean
  pathChanged?: boolean
}
interface prop_draggable_droppable{
  (tree: Tree, store: Store): IsDraggableOrIsDroppable
}
interface prop_eachDraggable_eachDroppable{
  (currentPath: Path, tree: Tree, store: Store): IsDraggableOrIsDroppable
}
interface prop_ondragstart_ondragend{
  // return false to prevent
  (tree: Tree, store: Store): false|any
}
const draggable = defineComponent({
  props: {
    triggerClass: {type: String, default: 'tree-node'},
    triggerBySelf: {type: Boolean},
    draggable: {type: Object as PropType<boolean | prop_draggable_droppable>, default: true},
    droppable: {type: Object as PropType<boolean | prop_draggable_droppable>, default: true},
    eachDraggable: {type: Object as PropType<prop_eachDraggable_eachDroppable>},
    eachDroppable: {type: Object as PropType<prop_eachDraggable_eachDroppable>},
    ondragstart: {type: Object as PropType<prop_ondragstart_ondragend>},
    ondragend: {type: Object as PropType<prop_ondragstart_ondragend>},
    unfoldWhenDragover: {type: Boolean, default: true},
    unfoldWhenDragoverDelay: {type: Number, default: 30},
    draggingNodePositionMode: {type: Object as PropType<'top_left_corner'|'mouse'>, default: 'top_left_corner'},
    edgeScroll: {type: Boolean},
    edgeScrollTriggerMargin: {type: Number, default: 50},
    edgeScrollSpeed: {type: Number, default: 0.35},
    edgeScrollTriggerMode: {type: Object as PropType<dh.Options['edgeScrollTriggerMode']>, default: 'top_left_corner'},
    edgeScrollSpecifiedContainerX: {type: Object as PropType<dh.Options['edgeScrollSpecifiedContainerX']>},
    edgeScrollSpecifiedContainerY: {type: Object as PropType<dh.Options['edgeScrollSpecifiedContainerY']>},
    data() {
      return {
        treesStore: {} as {store: Store},
      }
    },
  }
})
export type Draggable = typeof draggable

// utils ======================
interface cloneTreeDataOptions{
  afterNodeCreated(newNode: object, info: {oldNode: object, index: number, parent: object, path: Path}): void
}
export function cloneTreeData(treeData: TreeData, options?: cloneTreeDataOptions){
  return {} as TreeData
}

type walkTreeDataCallbackReturn = void|false|'skip children'|'skip siblings'
interface walkTreeDataCallback {
  (node: Node, index: number, parent: object|null, path:number[]): walkTreeDataCallbackReturn
}
export function walkTreeData(treeData: TreeData, callback: walkTreeDataCallback, options?: {reverse: boolean}){}

// remove key which starts with '$
export function getPureTreeData(treeData: TreeData){
  return {} as TreeData
}