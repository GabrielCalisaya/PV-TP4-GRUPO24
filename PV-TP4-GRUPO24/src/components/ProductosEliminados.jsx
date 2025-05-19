import {useState} from "react"
import "../styles/TablaProductos.css"
import TablaProductos from "./TablaProductos"
export const ProductosEliminados = ({ productosEliminados }) => {
    const [abrirProductosEliminados, setAbrirProductosEliminados] = useState(false)
    const handleClick = () => {
        setAbrirProductosEliminados(!abrirProductosEliminados)
    }
    return (
        <>
            <div className="buttonElementsDeleted">
                <button onClick={handleClick}>
                    {!abrirProductosEliminados ? "Mostrar elementos eliminados" : "Ocultar productos eliminados"}
                </button>
            </div>
            {/* Rehuso de componente TablaProductos */}
            {abrirProductosEliminados && (
                <TablaProductos productos={productosEliminados} sonEliminados={true} ></TablaProductos>
            )}

        </>
    )
}