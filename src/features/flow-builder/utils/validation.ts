import type { Connection } from 'reactflow'

import type { FlowEdge, FlowNode } from '../types'

export function hasSourceHandleConnection(edges: FlowEdge[], connection: Connection): boolean {
  if (!connection.source) {
    return false
  }

  return edges.some(
    (edge) => edge.source === connection.source && edge.sourceHandle === connection.sourceHandle,
  )
}

export function countNodesWithoutIncomingEdge(nodes: FlowNode[], edges: FlowEdge[]): number {
  const nodesWithIncomingEdges = new Set(edges.map((edge) => edge.target))
  return nodes.filter((node) => !nodesWithIncomingEdges.has(node.id)).length
}

export function isSaveFlowValid(nodes: FlowNode[], edges: FlowEdge[]): boolean {
  if (nodes.length <= 1) {
    return true
  }

  return countNodesWithoutIncomingEdge(nodes, edges) <= 1
}
