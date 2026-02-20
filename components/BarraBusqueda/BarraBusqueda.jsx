"use client";
import { useState } from "react";
import styles from "./BarraBusqueda.module.css";

export default function BarraBusqueda({ alBuscar }) {
    const [texto, setTexto] = useState("");

    const manejarBusqueda = () => {
        if (alBuscar) {
            alBuscar(texto);
        }
    };

    return (
        <div className={styles.contenedor}>
            <div className={styles.busquedaCaja}>
                <input type="text" className={styles.input} placeholder="Ej: titulo o autor" value={texto} onChange={(e) => setTexto(e.target.value)} onKeyDown={(e) => e.key === "Enter" && manejarBusqueda()} />

                <button className={styles.boton} onClick={manejarBusqueda}>
                    <span className={styles.icono}>
                        <img src="/icono-busqueda.svg" alt="Buscar" />
                    </span>
                    <span className={styles.texto}>BUSCAR</span>
                </button>
            </div>
        </div>
    );
}
