import ReactFlow, { Background, Controls, type NodeTypes } from 'reactflow'

import { APP_TITLE, NODE_DEFINITIONS } from '../constants'
import { useFlowBuilder } from '../hooks/useFlowBuilder'
import BuilderHeader from './BuilderHeader'
import NodesPanel from './NodesPanel'
import SettingsPanel from './SettingsPanel'
import StatusBanner from './StatusBanner'
import TextNode from './TextNode'

const nodeTypes: NodeTypes = {
  textNode: TextNode,
}

function FlowBuilder() {
  const {
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
  } = useFlowBuilder()

  return (
    <main className="app-shell">
      <BuilderHeader title={APP_TITLE} onSave={onSave} />

      {saveStatus ? <StatusBanner saveStatus={saveStatus} /> : null}

      <section className="builder-layout">
        <div className="canvas" ref={wrapperRef}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={(_event, node) => onNodeClick(node.id)}
            onPaneClick={onPaneClick}
            onConnect={onConnect}
            onInit={onFlowInit}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Background gap={18} size={1} />
            <Controls />
          </ReactFlow>
        </div>

        <aside className="sidebar">
          {selectedNode ? (
            <SettingsPanel
              nodeText={selectedNode.data.text}
              onBack={onPaneClick}
              onTextChange={onNodeTextChange}
            />
          ) : (
            <NodesPanel nodeDefinitions={NODE_DEFINITIONS} onDragStart={onDragStart} />
          )}
        </aside>
      </section>
    </main>
  )
}

export default FlowBuilder
