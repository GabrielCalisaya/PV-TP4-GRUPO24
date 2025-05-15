import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Productos from './Productos.jsx'
import Prueba from './Prueba.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Prueba />
  </StrictMode>,
)
