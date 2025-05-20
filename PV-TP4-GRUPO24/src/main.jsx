import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Producto from './Producto.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Producto />
  </StrictMode>,
)
