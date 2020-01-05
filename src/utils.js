import {TreeData} from 'helper-js'

export function cloneTreeData(treeData, opt) {
  return (new TreeData(treeData)).clone(opt)
}

export function walkTreeData(treeData, handler, opt) {
  return (new TreeData(treeData)).walk(handler, opt)
}

export function getPureTreeData(treeData) {
  const opt = {
    afterNodeCreated: newNode => {
      Object.keys(newNode).forEach(key => {
        if (key[0] === '$') {
          delete newNode[key]
        }
      })
    },
  }
  return cloneTreeData(treeData, opt)
}
