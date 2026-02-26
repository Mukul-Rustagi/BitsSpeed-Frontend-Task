import type { DragEvent } from 'react'

import type { NodeDefinition, SupportedNodeType } from '../types'

interface NodesPanelProps {
  nodeDefinitions: NodeDefinition[]
  onDragStart: (event: DragEvent<HTMLDivElement>, nodeType: SupportedNodeType) => void
  onQuickAddNode: (nodeType: SupportedNodeType) => void
}

function NodesPanel({ nodeDefinitions, onDragStart, onQuickAddNode }: NodesPanelProps) {
  return (
    <section className="panel">
      <h2 className="panel__title">Nodes</h2>
      <p className="panel__subtitle">Drag on desktop, or tap Add on mobile.</p>

      <div className="node-list">
        {nodeDefinitions.map((node) => (
          <div
            key={node.type}
            className="node-item"
            draggable
            onDragStart={(event) => onDragStart(event, node.type)}
          >
            <div>
              <p className="node-item__label">{node.label}</p>
              <p className="node-item__hint">{node.hint}</p>
            </div>
            <button className="node-item__add" type="button" onClick={() => onQuickAddNode(node.type)}>
              Add
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default NodesPanel
