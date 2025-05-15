import React, { useState } from "react";
import '../styles/barraBuscar.css';
function BarraBuscar({ onBuscar }) {
    const [busqueda, setBusqueda] = useState("");
    const [buscarPorId, setBuscarPorId] = useState(false);

    const cambioBuscar = (e) => {
        setBusqueda(e.target.value.trim()); //guarda el valor de busqueda

        // si encuentra onBuscar como parametro realiza la busqueda
        if (onBuscar){
            onBuscar(e.target.value.trim(),buscarPorId);
        }
};
const cambioCheckbox = (e) => {
        setBuscarPorId(!buscarPorId); // Alterna entre buscar por id o descripción
        if (onBuscar) {
            onBuscar(busqueda, !buscarPorId); // se niega buscarPorId porque el useState no es instantaneo
        }
    };


    return (
        <div className="barraBuscar">
            <input
                type="text"
                placeholder={buscarPorId ? "Buscar ID" : "Buscar Descripción"}
                id="inputBuscar"
                value={busqueda}
                onChange={cambioBuscar}
            />
            <label htmlFor="checkboxBuscarId">
                <input
                type="checkbox"
                id="checkboxBuscarId"
                onChange={cambioCheckbox}
                />Buscar Por ID
            </label>
        </div>
    );
}
export default BarraBuscar;