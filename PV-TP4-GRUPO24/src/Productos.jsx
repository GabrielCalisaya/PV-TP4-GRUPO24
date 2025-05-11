import React, { useState, useCallback, useEffect } from 'react';
import FormularioProducto from './components/FormProductos';
import TablaProductos from './components/TablaProductos'; // importa el nuevo componente
import './Productos.css';

function Producto() {
  const [productos, setProductos] = useState([]);

  const agregarProducto = useCallback((nuevoProducto) => {
    const idExiste = productos.some((producto) => producto.id === nuevoProducto.id);
    if (idExiste) {
      alert(`El ID "${nuevoProducto.id}" ya existe. Por favor, ingrese un ID diferente.`);
      return; // detiene la función si el ID ya existe
    }

    setProductos((productosAnteriores) => [
      ...productosAnteriores,
      {
        ...nuevoProducto,
        precioConDescuento: nuevoProducto.precioUnitario * (1 - nuevoProducto.descuento / 100),
      },
    ]);
  }, [productos]);

  useEffect(() => {
    console.log('Lista de productos actualizada:', productos);
  }, [productos]);

  return (
    <div className="contenedor-producto">
      <h1>Stock de Productos</h1>
      <FormularioProducto onAgregar={agregarProducto} />
      <TablaProductos productos={productos} />
    </div>
  );
}

export default Producto;