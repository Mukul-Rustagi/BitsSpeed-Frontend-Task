# BiteSpeed Frontend Task - Chatbot Flow Builder

A clean, extensible chatbot flow builder built with React + TypeScript + React Flow for the BiteSpeed internship task.

## Live Demo

- Deployment URL: `https://bits-speed-frontend-task.vercel.app/`

## Features Implemented

- Drag-and-drop `Message` node from Nodes Panel to canvas
- Multiple text nodes in one flow
- Custom node with source and target handles
- Source handle constraint: only one outgoing edge per source handle
- Target handle: supports multiple incoming edges
- Settings Panel replaces Nodes Panel on node selection
- Text editing for selected text node
- Save validation:
  - If total nodes > 1 and more than one node has empty target (no incoming edge), show error
  - Otherwise save is successful

## Tech Stack

- React 19
- TypeScript
- Vite
- React Flow
- ESLint

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_APP_NAME=Bitspeed Chatbot Flow Builder
VITE_DEFAULT_MESSAGE=Type your message
```

`.env.example` is included for reference.

## Project Structure

```text
src/
  features/
    flow-builder/
      components/
      hooks/
      utils/
      constants.ts
      types.ts
  App.tsx
  App.css
  main.tsx
```

## Run Locally

```bash
npm install
npm run dev
```

App runs on: `http://localhost:5173`

## Quality Checks

```bash
npm run lint
npm run build
```

## Submission Checklist

- Push source code to GitHub
- Deploy app on a free hosting provider (Vercel/Netlify)
- Add deployed link in this README
- Submit form from task PDF
