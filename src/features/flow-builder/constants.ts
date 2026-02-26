import type { NodeDefinition } from './types'

export const DND_NODE_TYPE_MIME = 'application/reactflow/node-type'
export const APP_TITLE = import.meta.env.VITE_APP_NAME || 'Chatbot Flow Builder'
export const DEFAULT_TEXT_MESSAGE = import.meta.env.VITE_DEFAULT_MESSAGE || 'Type your message'

export const STATUS_MESSAGES = {
  FLOW_SAVED: 'Flow saved successfully.',
  SOURCE_HANDLE_LIMIT: 'A source handle can only have one outgoing edge.',
  MULTIPLE_EMPTY_TARGETS: 'Cannot save flow: more than one node has an empty target handle.',
} as const

export const NODE_DEFINITIONS: NodeDefinition[] = [
  {
    type: 'textNode',
    label: 'Message',
    hint: 'Send a text message',
    defaultData: {
      text: DEFAULT_TEXT_MESSAGE,
    },
  },
]
