import React, { useState, useCallback, useEffect } from "react";
import FormularioProducto from "./components/FormProductos";
import TablaProductos from "./components/TablaProductos"; // importa el nuevo componente
import BarraBuscar from "./components/BarraBuscar";
import "./Productos.css";

function Producto() {
  const [productosOriginales, setProductosOriginales] = useState([]);
  const [productos, setProductos] = useState([]);

  const agregarProducto = useCallback(
    (nuevoProducto) => {
      const idExiste = productos.some(
        (producto) => producto.id === nuevoProducto.id
      );
      if (idExiste) {
        alert(
          `El ID "${nuevoProducto.id}" ya existe. Por favor, ingrese un ID diferente.`
        );
        return; // detiene la función si el ID ya existe
      }

      const nuevoProductoConDescuento = {
        ...nuevoProducto,
        precioConDescuento:
          nuevoProducto.precioUnitario * (1 - nuevoProducto.descuento / 100),
      };

      setProductos((productosAnteriores) => [
        ...productosAnteriores,
        nuevoProductoConDescuento,
      ]);
      setProductosOriginales((productosAnteriores) => [
        ...productosAnteriores,
        nuevoProductoConDescuento,
      ]);
    },
    [productos]
  );

  const buscarProducto = (busqueda, buscarPorId) => {
    if (!busqueda) {
      setProductos(productosOriginales); // Restablece la lista original si no hay búsqueda
      return;
    }

    const productosFiltrados = productosOriginales.filter((producto) => {
      if (buscarPorId) {
        return producto.id.startsWith(busqueda); // Filtra por ID si buscarPorId es true
      } else {
        return producto.descripcion
          .toLowerCase()
          .includes(busqueda.toLowerCase()); // Filtra por descripción si buscarPorId es false
      }
    });
    setProductos(productosFiltrados);
  };

  useEffect(() => {
    console.log("Lista de productos actualizada:", productos);
  }, [productos]);

  // nuevo agregado de funcion para modificar producto
  const modificarProducto = (productoEditado) => {
    const nuevosProductos = productos.map((producto) =>
      producto.id === productoEditado.id
        ? {
          ...productoEditado,
          precioConDescuento:
            productoEditado.precioUnitario *
            (1 - productoEditado.descuento / 100),
        }
        : producto
    );
    setProductos(nuevosProductos);
    setProductosOriginales(nuevosProductos);
  };
  // fin de lo agregado para modificar producto

  const eliminarProducto = useCallback(
    (idAEliminar) => {
      const nuevosProductos = productos.filter(
        (producto) => producto.id !== idAEliminar
      );
      setProductos(nuevosProductos);
      setProductosOriginales(nuevosProductos);
    },
    [productos]
  )
 return (
    <div className="contenedor-producto">
      <h1>Stock de Productos</h1>
      <FormularioProducto onAgregar={agregarProducto} />
      <BarraBuscar onBuscar={buscarProducto} />
      {/* se pasa onModificar como prop */}
      <TablaProductos productos={productos} onModificar={modificarProducto} onEliminar={eliminarProducto} />
    </div>
  );
}

export default Producto;
