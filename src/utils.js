// todo include tree-helper into helper-js
import * as th from 'tree-helper'
import * as hp from 'helper-js'

export function cloneTreeData(treeData) {
  let notArray
  if (!hp.isArray(treeData)) {
    treeData = [treeData]
    notArray = true
  }
  const getNewNodes = (nodes) => {
    const newNodes = nodes.map(node => {
      const newNode = {}
      Object.keys(node).forEach(key => {
        newNode[key] = node[key]
        if (key === 'children') {
          newNode[key] = getNewNodes(node[key])
        }
      })
      return newNode
    })
    return newNodes
  }
  const result = getNewNodes(treeData)
  return notArray ? result[0] : result
}

export const walkTreeData = th.depthFirstSearch

export function getPureTreeData(treeData) {
  const newTreeData = cloneTreeData(treeData)
  walkTreeData(newTreeData, (node) => {
    Object.keys(node).forEach(key => {
      if (key[0] === '$') {
        delete node[key]
      }
    })
  })
  return newTreeData
}
