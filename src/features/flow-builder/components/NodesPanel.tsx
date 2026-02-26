import type { DragEvent } from 'react'

import type { NodeDefinition, SupportedNodeType } from '../types'

interface NodesPanelProps {
  nodeDefinitions: NodeDefinition[]
  onDragStart: (event: DragEvent<HTMLDivElement>, nodeType: SupportedNodeType) => void
}

function NodesPanel({ nodeDefinitions, onDragStart }: NodesPanelProps) {
  return (
    <section className="panel">
      <h2 className="panel__title">Nodes</h2>
      <p className="panel__subtitle">Drag a node to the canvas.</p>

      <div className="node-list">
        {nodeDefinitions.map((node) => (
          <div
            key={node.type}
            className="node-item"
            draggable
            onDragStart={(event) => onDragStart(event, node.type)}
          >
            <p className="node-item__label">{node.label}</p>
            <p className="node-item__hint">{node.hint}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default NodesPanel
