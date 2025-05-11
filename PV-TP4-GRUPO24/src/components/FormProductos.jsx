import React, { useState, useCallback } from 'react';

const FormProducto = ({ onAgregar }) => {
    const [datosFormulario, setDatosFormulario] = useState({
        id: '',
        descripcion: '',
        precioUnitario: '',
        descuento: '',
        stock: '',
    });

    const manejarCambio = useCallback((evento) => {
        const { name, value } = evento.target;
        setDatosFormulario((datosAnteriores) => ({
            ...datosAnteriores,
            [name]: value,
        }));
    }, []);

    const manejarEnvio = useCallback((evento) => {
        evento.preventDefault();
        onAgregar({
            ...datosFormulario,
            precioUnitario: parseFloat(datosFormulario.precioUnitario),
            descuento: parseFloat(datosFormulario.descuento),
            stock: parseInt(datosFormulario.stock, 10),
        });
        setDatosFormulario({
            id: '',
            descripcion: '',
            precioUnitario: '',
            descuento: '',
            stock: '',
        });
    }, [datosFormulario, onAgregar]);

    return (
        <div className="formulario-producto">
            <h2>Agregar Nuevo Producto</h2>
            <form onSubmit={manejarEnvio}>
                <div className="grupo-formulario">
                    <label htmlFor="id">ID:</label>
                    <input type="text" id="id" name="id" value={datosFormulario.id} onChange={manejarCambio} required />
                </div>
                <div className="grupo-formulario">
                    <label htmlFor="descripcion">Descripción:</label>
                    <input type="text" id="descripcion" name="descripcion" value={datosFormulario.descripcion} onChange={manejarCambio} required />
                </div>
                <div className="grupo-formulario">
                    <label htmlFor="precioUnitario">Precio Unitario:</label>
                    <input type="number" id="precioUnitario" name="precioUnitario" value={datosFormulario.precioUnitario} onChange={manejarCambio} required />
                </div>
                <div className="grupo-formulario">
                    <label htmlFor="descuento">Descuento (%):</label>
                    <input type="number" id="descuento" name="descuento" value={datosFormulario.descuento} onChange={manejarCambio} min="0" max="100" />
                </div>
                <div className="grupo-formulario">
                    <label htmlFor="stock">Stock:</label>
                    <input type="number" id="stock" name="stock" value={datosFormulario.stock} onChange={manejarCambio} required />
                </div>
                <button type="submit">Agregar Producto</button>
            </form>
        </div>
    );
};

export default FormProducto;