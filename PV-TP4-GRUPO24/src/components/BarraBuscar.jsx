import { useState } from "react";
import '../styles/barraBuscar.css';

function BarraBuscar({ onBuscar }) {
    const [busqueda, setBusqueda] = useState("");
    const [buscarPorId, setBuscarPorId] = useState(false);

    const cambioBusqueda = (e) => {
        const valor = e.target.value;
        setBusqueda(valor);
        if (onBuscar) {
            onBuscar(valor, buscarPorId);
        }
    };

    const cambioCheckbox = () => {
        setBuscarPorId((prev) => {
            const nuevoValor = !prev;
            if (onBuscar) {
                onBuscar(busqueda, nuevoValor);
            }
            return nuevoValor; // nuevo valor de buscarPorId
        });
    };

    return (
        <div className="barraBuscar">
            <input
                type="text"
                placeholder={buscarPorId ? "Buscar ID" : "Buscar Descripción"}
                id="inputBuscar"
                value={busqueda}
                onChange={cambioBusqueda}
            />
            <label htmlFor="checkboxBuscarId">
                <input
                    type="checkbox"
                    id="checkboxBuscarId"
                    checked={buscarPorId}
                    onChange={cambioCheckbox}
                />
                Buscar Por ID
            </label>
        </div>
    );
}

export default BarraBuscar;