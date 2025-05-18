import { useState } from 'react';
import '../styles/TablaProductos.css';

const TablaProductos = ({ productos, onModificar, onEliminar }) => {
  const [modoEdicion, setModoEdicion] = useState(null);
  const [productoEditado, setProductoEditado] = useState({});

  const activarEdicion = (producto) => {
    setModoEdicion(producto.id);
    setProductoEditado({ ...producto });
  };

  const cancelarEdicion = () => {
    setModoEdicion(null);
    setProductoEditado({});
  };

  // se actualizó campos para coincidir con la nueva estructura 
  const guardarCambios = () => {
    const productoActualizado = {
      ...productoEditado,
      precioUnitario: parseFloat(productoEditado.precioUnitario),
      descuento: parseFloat(productoEditado.descuento),
      stock: parseInt(productoEditado.stock, 10),
    };
    onModificar(productoActualizado);
    cancelarEdicion();
  };
  // fin de la modificación

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setProductoEditado((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

  return (
    <table className="tabla-productos">
      <thead>
        <tr>
          <th>ID</th>
          {/*'Nombre' en vez de 'Descripción' */}
          <th>Nombre</th>
         
          {/*  INICIO COLUMNA NUEVA Marca */}
          <th>Marca</th>
          <th>Precio Unitario</th>
          <th>Descuento (%)</th>
          <th>Precio con Descuento</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.id}>
            <td>{producto.id}</td>

            {modoEdicion === producto.id ? (
              <>
                {/*INPUTS EN MODO EDICIÓN */}
                <td>
                  <input
                    type="text"
                    name="nombre"
                    value={productoEditado.nombre}
                    onChange={manejarCambio}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="marca"
                    value={productoEditado.marca}
                    onChange={manejarCambio}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="precioUnitario"
                    value={productoEditado.precioUnitario}
                    onChange={manejarCambio}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="descuento"
                    value={productoEditado.descuento}
                    onChange={manejarCambio}
                  />
                </td>
                <td>{(productoEditado.precioUnitario * (1 - productoEditado.descuento / 100)).toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    name="stock"
                    value={productoEditado.stock}
                    onChange={manejarCambio}
                  />
                </td>
                {/* INPUTS EN MODO EDICIÓN  */}
              </>
            ) : (
              <>
              
                <td>{producto.nombre}</td>
                <td>{producto.marca}</td>
                <td>${producto.precioUnitario.toFixed(2)}</td>
                <td>{producto.descuento}%</td>
                <td>${producto.precioConDescuento.toFixed(2)}</td>
                <td>{producto.stock}</td>
               
              </>
            )}

            <td>
              {modoEdicion === producto.id ? (
                <>
                  <button onClick={guardarCambios}>Guardar</button>
                  <button onClick={cancelarEdicion}>Cancelar</button>
                </>
              ) : (
                <>
                  <button onClick={() => activarEdicion(producto)}>Modificar</button>
                  {/*  se usa onEliminar por estado (no se borra del array)  */}
                  <button onClick={() => onEliminar(producto.id)}>Eliminar</button>
                 
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaProductos;
