import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Productos from './Productos.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Productos />
  </StrictMode>,
)
