import React, { useState } from 'react';
import '../styles/TablaProductos.css'
const TablaProductos = ({ productos, onModificar, onEliminar }) =>{
  const [modoEdicionId, setModoEdicionId] = useState(null);
  const [productoEditado, setProductoEditado] = useState({});

  if (!productos || productos.length === 0) {
    return <p>No hay productos agregados.</p>;
  }

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setProductoEditado((prev) => ({
      ...prev,
      [name]: name === "precioUnitario" || name === "descuento" || name === "stock"
        ? parseFloat(value)
        : value,
    }));
  };

  const guardarCambios = () => {
    onModificar(productoEditado);
    setModoEdicionId(null);
  };

  const activarEdicion = (producto) => {
    setModoEdicionId(producto.id);
    setProductoEditado(producto);
  };

  return (
    <div className="tabla-productos-contenedor">
      <h2>Lista de Productos Agregados</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Precio Unitario</th>
            <th>Descuento (%)</th>
            <th>Precio con Descuento</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>
                {modoEdicionId === producto.id ? (
                  <input
                    name="descripcion"
                    value={productoEditado.descripcion}
                    onChange={manejarCambio}
                  />
                ) : (
                  producto.descripcion
                )}
              </td>
              <td>
                {modoEdicionId === producto.id ? (
                  <input
                    type="number"
                    name="precioUnitario"
                    value={productoEditado.precioUnitario}
                    onChange={manejarCambio}
                  />
                ) : (
                  producto.precioUnitario
                )}
              </td>
              <td>
                {modoEdicionId === producto.id ? (
                  <input
                    type="number"
                    name="descuento"
                    value={productoEditado.descuento}
                    onChange={manejarCambio}
                  />
                ) : (
                  producto.descuento
                )}
              </td>
              <td>{producto.precioConDescuento.toFixed(2)}</td>
              <td>
                {modoEdicionId === producto.id ? (
                  <input
                    type="number"
                    name="stock"
                    value={productoEditado.stock}
                    onChange={manejarCambio}
                  />
                ) : (
                  producto.stock
                )}
              </td>
              <td className='botonModificar'>
                {modoEdicionId === producto.id ? (
                  <button onClick={guardarCambios}>Guardar</button>
                ) : (
                  <button onClick={() => activarEdicion(producto)}>Modificar</button>
                )}
              </td>
              <td className='botonEliminar'><button onClick={() => onEliminar(producto.id)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaProductos;