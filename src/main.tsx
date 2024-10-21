import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <div className="absolute top-2 left-2">
      Bun + Vite + React + R3F
    </div>
  </StrictMode>,
)
