import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import {VNode} from 'vue'

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
  [treeId: string]: Vue
}
type overrideSlotDefault_arg0 = {node: Node, index: number, path: Path, tree: Tree}
// the original vnodes if this.overrideSlotDefault is not defined
interface VNodeFunc{
  (): VNode
}
// interface overrideSlotDefault{
//   (info: overrideSlotDefault_arg0, original: VNodeFunc): any
// }
export class Tree extends Vue{
  @Prop()
  value: TreeData
  get treeData(): TreeData // alias of this.value
  set treeData(value: TreeData) // emit 'input' event
  // Declared as computed property setter
  @Prop({ default: 20 })
  indent: number
  @Prop({ default: {} })
  rootNode: Node
  // data
  trees: Trees
  treeClass: string
  treeId: string
  // methods
  iteratePath(path: Path, opt?: iteratePathOptions): IterableIterator<[Path, Node]>
  getTreeVmByTreeEl(treeEl: HTMLElement): Vue
  getAllNodesByPath(path: Path): Node[]
  getNodeByPath(path: Path): Node
  getPathByBranchEl(branchEl: HTMLElement): Path
  getBranchElByPath(path: Path): HTMLElement
  getBranchElByPath(path: Path): HTMLElement
  getPathByBranchEl(branchEl: HTMLElement): Node
  getNodeParentByPath(path: Path): Node
  removeNodeByPath(path: Path): Node
  walkTreeData(callback: walkTreeDataCallback, options?: {reverse: boolean}): void
  cloneTreeData(options?: cloneTreeDataOptions): TreeData
  // remove key which starts with '$
  getPureTreeData(): TreeData
  // hooks. in data not in props, so you only can set it by extend or mixins, and override it
  // overrideSlotDefault?: overrideSlotDefault
  // blockHeader?: VNodeFunc
  // blockFooter?: VNodeFunc
}

interface unfoldOptions {
  foldOthers: boolean
}
// plugins ========================
export class Fold extends Vue{
  @Prop()
  foldingTransitionName: string
  @Prop()
  foldingTransition: Vue
  @Prop()
  foldAllAfterMounted: boolean
  // methods
  fold(node: Node, path: Path): void
  unfold(node: Node, path: Path, opt?:unfoldOptions): void
  toggleFold(node: Node, path: Path, opt?:unfoldOptions): void
  foldAll(): void
  unfoldAll(): void
}

export interface foldAll {
  (treeData: TreeData): void
}

export interface unfoldAll {
  (treeData: TreeData): void
}

export class Check extends Vue{
  // methods
  check(node: Node, path: Path): void
  uncheck(node: Node, path: Path): void
  toggleCheck(node: Node, path: Path): void
}
type IsDraggableOrIsDroppable = boolean | undefined
// darg info store
interface Store {
  el?: HTMLElement
  originalEl?: HTMLElement
  mouse?: {x:number, y:number}
  movedCount?: number
  startEvent?: MouseEvent
  endEvent?: MouseEvent
  startTreeEl?: HTMLElement
  startTree?: Vue
  startPath?: Path
  dragBranchEl?: HTMLElement
  dragNode?: Node
  targetTreeEl?: HTMLElement
  targetTree?: Vue
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
export class Draggable extends Vue{
  @Prop({default: 'tree-node'})
  triggerClass: string
  @Prop({default: true})
  draggable: boolean | prop_draggable_droppable
  @Prop({default: true})
  droppable: boolean | prop_draggable_droppable
  @Prop()
  eachDraggable: prop_eachDraggable_eachDroppable
  @Prop()
  eachDroppable: prop_eachDraggable_eachDroppable
  @Prop()
  ondragstart: prop_ondragstart_ondragend
  @Prop()
  ondragend: prop_ondragstart_ondragend
  @Prop({default: true})
  unfoldWhenDragover: boolean
  @Prop({default: 30})
  unfoldWhenDragoverDelay: number
  @Prop({default: 'top_left_corner'})
  draggingNodePositionMode: 'top_left_corner'|'mouse'
  // data
  treesStore: {store: Store} // just for get the darg info store
  // methods
}

// utils ======================
interface cloneTreeDataOptions{
  afterNodeCreated(newNode: object, info: {oldNode: object, index: number, parent: object, path: Path}): void
}
export function cloneTreeData(treeData: TreeData, options?: cloneTreeDataOptions): TreeData

type walkTreeDataCallbackReturn = void|false|'skip children'|'skip siblings'
interface walkTreeDataCallback {
  (node: Node, index: number, parent: object|null, path:number[]): walkTreeDataCallbackReturn
}
export function walkTreeData(treeData: TreeData, callback: walkTreeDataCallback, options?: {reverse: boolean}): void

// remove key which starts with '$
export function getPureTreeData(treeData: TreeData): TreeData