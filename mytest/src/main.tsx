import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "@/assets/css-reset.css"
import 'antd/dist/antd.css';
import { DndProvider } from 'react-dnd/dist/core';
import { HTML5Backend } from 'react-dnd-html5-backend';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </React.StrictMode>,
)
