import { useState, useCallback, useMemo } from "react";
import FormularioProducto from "./components/FormProductos";
import TablaProductos from "./components/TablaProductos";
import BarraBuscar from "./components/BarraBuscar";
import "./Productos.css";

function Producto() {
  const [productosOriginales, setProductosOriginales] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [buscarPorId, setBuscarPorId] = useState(false);

  const agregarProducto = useCallback(
    (nuevoProducto) => {
      const idExiste = productosOriginales.some(
        (producto) => producto.id === nuevoProducto.id
      );
      if (idExiste) {
        alert(
          `El ID "${nuevoProducto.id}" ya existe. Por favor, ingrese un ID diferente.`
        );
        return;
      }

      const nuevoProductoConDescuento = {
        ...nuevoProducto,
        precioConDescuento:
          nuevoProducto.precioUnitario * (1 - nuevoProducto.descuento / 100),
      };

      setProductosOriginales((productosAnteriores) => [
        ...productosAnteriores,
        nuevoProductoConDescuento,
      ]);
    },
    [productosOriginales]
  );

  // useMemo para filtrar productos solo cuando cambian las dependencias
  const productosFiltrados = useMemo(() => {
  if (!busqueda) 
    {
      return productosOriginales
    }
  else {
      return productosOriginales.filter((producto) => {
    if (buscarPorId) {
      return producto.id.startsWith(busqueda);
    } else {
      return producto.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    }
  });
  }
  
}, [productosOriginales, busqueda, buscarPorId]);

  // Recibe los cambios de la barra de búsqueda
  const cambioBuscar = (valorBusqueda, valorBuscarPorId) => {
    setBusqueda(valorBusqueda);
    setBuscarPorId(valorBuscarPorId);
  };

  // Modificar producto
  const modificarProducto = (productoEditado) => {
    const nuevosProductos = productosOriginales.map((producto) =>
      producto.id === productoEditado.id
        ? {
            ...productoEditado,
            precioConDescuento:
              productoEditado.precioUnitario *
              (1 - productoEditado.descuento / 100),
          }
        : producto
    );
    setProductosOriginales(nuevosProductos);
  };

  // Eliminar producto
  const eliminarProducto = useCallback(
    (idAEliminar) => {
      const nuevosProductos = productosOriginales.filter(
        (producto) => producto.id !== idAEliminar
      );
      setProductosOriginales(nuevosProductos);
    },
    [productosOriginales]
  );

  return (
    <div className="contenedor-producto">
      <h1>Stock de Productos</h1>
      <FormularioProducto onAgregar={agregarProducto} />
      {productosOriginales.length > 0 && (
        <BarraBuscar onBuscar={cambioBuscar} />
      )}
      <TablaProductos
        productos={productosFiltrados}
        onModificar={modificarProducto}
        onEliminar={eliminarProducto}
      />
    </div>
  );
}

export default Producto;