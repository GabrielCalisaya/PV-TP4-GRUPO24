import { useState, useCallback, useMemo } from 'react';
import FormularioProducto from "./components/FormProductos";
import TablaProductos from "./components/TablaProductos";
import BarraBuscar from "./components/BarraBuscar";
import "./styles/Productos.css"
import { ProductosEliminados } from "./components/ProductosEliminados";

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
        alert(`El ID ${nuevoProducto.id} ya existe, Por favor, ingrese un ID diferente.`);
        return;
      }

      //  cálculo de precioConDescuento 
      const nuevoProductoConDescuento = {
        ...nuevoProducto,
        precioConDescuento:
          nuevoProducto.precioUnitario * (1 - nuevoProducto.descuento / 100),
      };
      //cambio

      setProductosOriginales((productosAnteriores) => [
        ...productosAnteriores,
        nuevoProductoConDescuento,
      ]);
    },
    [productosOriginales]
  );

  const productosFiltrados = useMemo(() => {
    if (!busqueda) {
      return productosOriginales;
    } else {
      return productosOriginales.filter((producto) => {
        if (buscarPorId) {
          return producto.id.startsWith(busqueda);
        } else {
          //  búsqueda por nombre (antes era descripción)
          return producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
          // cambio
        }
      });
    }
  }, [productosOriginales, busqueda, buscarPorId]);

  const cambioBuscar = (valorBusqueda, valorBuscarPorId) => {
    setBusqueda(valorBusqueda);
    setBuscarPorId(valorBuscarPorId);
  };

  // recalcula el precioConDescuento al modificar producto
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
  // 

  //  eliminación lógica con estado: false 
  const eliminarProducto = useCallback(
    (idAEliminar) => {
      const nuevosProductos = productosOriginales.map((producto) =>
        producto.id === idAEliminar ? { ...producto, estado: false } : producto
      );
      setProductosOriginales(nuevosProductos);
    },
    [productosOriginales]
  );
  // cambios

  return (
    <div className="contenedor-producto">
      <h1>Stock de Productos</h1>
      <FormularioProducto onAgregar={agregarProducto} />
      {productosOriginales.length > 0 && (
        <BarraBuscar onBuscar={cambioBuscar} />
      )}
      <TablaProductos
        //  solo mostrar productos con estado !== false ====
        productos={productosFiltrados.filter(p => p.estado !== false)}
        // cambio
        onModificar={modificarProducto}
        onEliminar={eliminarProducto}
      />
      <ProductosEliminados productosEliminados={productosFiltrados.filter(prod => prod.estado !== true)} ></ProductosEliminados>
    </div>
  );
}

export default Producto;