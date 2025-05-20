import { useState } from 'react';
import '../styles/TablaProductos.css';

// Se agrego prop para verificar de donde es llamado el componente y asi renderizar unas columnas u otras
const TablaProductos = ({ productos, onModificar, onEliminar, sonEliminados = false }) => {
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
    <>
      <table className={`tabla-productos ${sonEliminados ? 'tabla-eliminados' : ''}`}>
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
            {!sonEliminados && (

              <th>Acciones</th>
            )}
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>

              {modoEdicion === producto.id ? (
                <>
                  <div className='container-edicion'>

                  {/*INPUTS EN MODO EDICIÓN */}
                  <td className='td-edicion'>
                    <input
                      type="text"
                      name="nombre"
                      value={productoEditado.nombre}
                      onChange={manejarCambio}
                    />
                  </td>
                  <td className='td-edicion'>
                    <input
                      type="text"
                      name="marca"
                      value={productoEditado.marca}
                      onChange={manejarCambio}
                    />
                  </td>
                  <td className='td-edicion'>
                    <input
                      type="number"
                      name="precioUnitario"
                      value={productoEditado.precioUnitario}
                      onChange={manejarCambio}
                    />
                  </td>
                  <td className='td-edicion'>
                    <input
                      type="number"
                      name="descuento"
                      value={productoEditado.descuento}
                      onChange={manejarCambio}
                    />
                  </td>
                  <td className='td-edicion'>{(productoEditado.precioUnitario * (1 - productoEditado.descuento / 100)).toFixed(2)}</td>
                  <td className='td-edicion td-stock'>
                    <input
                      type="number"
                      name="stock"
                      value={productoEditado.stock}
                      onChange={manejarCambio}
                    />
                  </td>
                  {/* INPUTS EN MODO EDICIÓN  */}
                </div>
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
                    <button className='botonGuardar' onClick={guardarCambios}>Guardar</button>
                    <button className='botonCancelar' onClick={cancelarEdicion}>Cancelar</button>
                  </>
                ) : !sonEliminados && (
                  <>
                    <button className='botonModificar' onClick={() => activarEdicion(producto)}>Modificar</button>
                    {/*  se usa onEliminar por estado (no se borra del array)  */}
                    <button className='botonEliminar' onClick={() => onEliminar(producto.id)}>Eliminar</button>

                  </>
                )}
              </td>
            </tr>
          )) : (
            <h2 className='notFound'>No se encontraron productos..</h2>
          )}
        </tbody>
      </table>


    </>
  );
};

export default TablaProductos;
