import type { Edge, Node } from 'reactflow'

export type SupportedNodeType = 'textNode'

export interface TextNodeData {
  text: string
}

export type FlowNode = Node<TextNodeData>
export type FlowEdge = Edge

export interface NodeDefinition {
  type: SupportedNodeType
  label: string
  hint: string
  defaultData: TextNodeData
}

export interface SaveStatus {
  type: 'success' | 'error'
  message: string
}
