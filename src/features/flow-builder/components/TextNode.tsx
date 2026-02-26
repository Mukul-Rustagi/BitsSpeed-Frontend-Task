import { Handle, Position, type NodeProps } from 'reactflow'

import type { TextNodeData } from '../types'

function TextNode({ data, selected }: NodeProps<TextNodeData>) {
  return (
    <div className={`text-node ${selected ? 'text-node--selected' : ''}`}>
      <Handle className="text-node__handle" type="target" position={Position.Left} />

      <div className="text-node__header">
        <span className="text-node__icon">M</span>
        <span className="text-node__title">Send Message</span>
      </div>
      <p className="text-node__body">{data.text || 'Empty message'}</p>

      <Handle id="source" className="text-node__handle" type="source" position={Position.Right} />
    </div>
  )
}

export default TextNode
