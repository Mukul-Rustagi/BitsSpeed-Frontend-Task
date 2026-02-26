import { useCallback, useMemo, useRef, useState, type DragEvent, type RefObject } from 'react'
import {
  type OnEdgesChange,
  type OnNodesChange,
  addEdge,
  useEdgesState,
  useNodesState,
  type Connection,
  type ReactFlowInstance,
} from 'reactflow'

import { DND_NODE_TYPE_MIME, NODE_DEFINITIONS, STATUS_MESSAGES } from '../constants'
import type { FlowEdge, FlowNode, SaveStatus, SupportedNodeType, TextNodeData } from '../types'
import { hasSourceHandleConnection, isSaveFlowValid } from '../utils/validation'

export interface UseFlowBuilderResult {
  wrapperRef: RefObject<HTMLDivElement | null>
  nodes: FlowNode[]
  edges: FlowEdge[]
  saveStatus: SaveStatus | null
  selectedNode: FlowNode | null
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onDragStart: (event: DragEvent<HTMLDivElement>, nodeType: SupportedNodeType) => void
  onDragOver: (event: DragEvent) => void
  onDrop: (event: DragEvent) => void
  onConnect: (connection: Connection) => void
  onSave: () => void
  onNodeClick: (nodeId: string) => void
  onPaneClick: () => void
  onNodeTextChange: (newText: string) => void
  onFlowInit: (instance: ReactFlowInstance) => void
}

export function useFlowBuilder(): UseFlowBuilderResult {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const idCounterRef = useRef(1)
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<SaveStatus | null>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState<TextNodeData>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<FlowEdge>([])

  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedNodeId) ?? null,
    [nodes, selectedNodeId],
  )

  const createNodeId = () => `node_${idCounterRef.current++}`

  const onDragStart = useCallback(
    (event: DragEvent<HTMLDivElement>, nodeType: SupportedNodeType) => {
      event.dataTransfer.setData(DND_NODE_TYPE_MIME, nodeType)
      event.dataTransfer.effectAllowed = 'move'
    },
    [],
  )

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault()

      const droppedNodeType = event.dataTransfer.getData(DND_NODE_TYPE_MIME) as SupportedNodeType
      if (!droppedNodeType || !reactFlowInstance || !wrapperRef.current) {
        return
      }

      const definition = NODE_DEFINITIONS.find((item) => item.type === droppedNodeType)
      if (!definition) {
        return
      }

      const bounds = wrapperRef.current.getBoundingClientRect()
      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      })

      const newNode: FlowNode = {
        id: createNodeId(),
        type: definition.type,
        position,
        data: { ...definition.defaultData },
      }

      setNodes((currentNodes) => currentNodes.concat(newNode))
      setSaveStatus(null)
    },
    [reactFlowInstance, setNodes],
  )

  const onConnect = useCallback(
    (connection: Connection) => {
      if (hasSourceHandleConnection(edges, connection)) {
        setSaveStatus({ type: 'error', message: STATUS_MESSAGES.SOURCE_HANDLE_LIMIT })
        return
      }

      setEdges((currentEdges) => addEdge({ ...connection, type: 'smoothstep' }, currentEdges))
      setSaveStatus(null)
    },
    [edges, setEdges],
  )

  const onNodeTextChange = useCallback(
    (newText: string) => {
      if (!selectedNodeId) {
        return
      }

      setNodes((currentNodes) =>
        currentNodes.map((node) =>
          node.id === selectedNodeId ? { ...node, data: { ...node.data, text: newText } } : node,
        ),
      )
      setSaveStatus(null)
    },
    [selectedNodeId, setNodes],
  )

  const onSave = useCallback(() => {
    const isValid = isSaveFlowValid(nodes, edges)
    if (!isValid) {
      setSaveStatus({ type: 'error', message: STATUS_MESSAGES.MULTIPLE_EMPTY_TARGETS })
      return
    }

    setSaveStatus({ type: 'success', message: STATUS_MESSAGES.FLOW_SAVED })
  }, [nodes, edges])

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null)
  }, [])

  const onNodeClick = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId)
  }, [])

  const onFlowInit = useCallback((instance: ReactFlowInstance) => {
    setReactFlowInstance(instance)
  }, [])

  return {
    wrapperRef,
    nodes,
    edges,
    saveStatus,
    selectedNode,
    onNodesChange,
    onEdgesChange,
    onDragStart,
    onDragOver,
    onDrop,
    onConnect,
    onSave,
    onNodeClick,
    onPaneClick,
    onNodeTextChange,
    onFlowInit,
  }
}
