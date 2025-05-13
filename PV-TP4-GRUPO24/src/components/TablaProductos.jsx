import React from 'react';
const TablaProductos = ({ productos, eliminarProducto }) => {
    if (!productos || productos.length === 0) {
        return <p>No hay productos agregados.</p>;
    }

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
                        {/* se agrega columna nueva para manejar y eliminar producto */}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.descripcion}</td>
                            <td>{producto.precioUnitario}</td>
                            <td>{producto.descuento}</td>
                            <td>{producto.precioConDescuento.toFixed(2)}</td>
                            <td>{producto.stock}</td>
                            {/* se agrega button para eliminar cada producto */}
                            <td><button onClick={() => eliminarProducto(producto.id)}>Eliminar</button> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablaProductos;