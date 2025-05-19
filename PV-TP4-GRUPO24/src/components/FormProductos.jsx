import React, { useState, useCallback } from 'react';
import '../styles/FormProductos.css';
const FormProductos = ({ onAgregar }) => {
  //  aqui tan los campos nuevos y renombrados
  const [datosFormulario, setDatosFormulario] = useState({
    id: '',
    nombre: '',
    marca: '',
    precioUnitario: '',
    descuento: '',
    stock: '',
    estado: true,
  });
  //

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //  manejo submit
  const manejarEnvio = useCallback((evento) => {
    evento.preventDefault();
    onAgregar({
      ...datosFormulario,
      precioUnitario: parseFloat(datosFormulario.precioUnitario),
      descuento: parseFloat(datosFormulario.descuento),
      stock: parseInt(datosFormulario.stock, 10),
      estado: true,
    });
    setDatosFormulario({
      id: '',
      nombre: '',
      marca: '',
      precioUnitario: '',
      descuento: '',
      stock: '',
      estado: true,
    });
  }, [datosFormulario, onAgregar]);
  // fin manejo submit

  return (
    <form className="formulario-producto" onSubmit={manejarEnvio}>
      <h2>Agregar Nuevo Producto</h2>
      <div className="contenedor-campos">
        <div className="grupo-formulario">
          <label htmlFor="id">ID:</label>
          <input type="number" id="id" name="id" value={datosFormulario.id} onChange={manejarCambio} min="1" required />
        </div>

        {/*nuevo*/}
        <div className="grupo-formulario">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={datosFormulario.nombre} onChange={manejarCambio} required />
        </div>

        <div className="grupo-formulario">
          <label htmlFor="marca">Marca:</label>
          <input type="text" id="marca" name="marca" value={datosFormulario.marca} onChange={manejarCambio} required />
        </div>
        {/* nuevo */}

        <div className="grupo-formulario">
          <label htmlFor="precioUnitario">Precio Unitario:</label>
          <input type="number" id="precioUnitario" name="precioUnitario" value={datosFormulario.precioUnitario} onChange={manejarCambio} min="0" required />
        </div>

        <div className="grupo-formulario">
          <label htmlFor="descuento">Descuento (%):</label>
          <input className='inputDescuento' type="number" id="descuento" name="descuento" value={datosFormulario.descuento} onChange={manejarCambio} min="0" max="100" />
        </div>

        <div className="grupo-formulario">
          <label htmlFor="stock">Stock:</label>
          <input type="number" id="stock" name="stock" value={datosFormulario.stock} onChange={manejarCambio} min="0" required />
        </div>
      </div>

      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default FormProductos;