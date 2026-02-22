"use client";
import { useState, useEffect } from "react";
import styles from "./BarraBusqueda.module.css";

export default function BarraBusqueda({ alBuscar, setFiltro }) {
    const [texto, setTexto] = useState("");

    // const manejarBusqueda = () => {
    //     if (alBuscar) {
    //         alBuscar(texto);
    //     }
    // };

    useEffect(() => {
        if (alBuscar) {
            alBuscar(texto);
        }
    }, [texto, alBuscar]);

    return (
        <div className={styles.contenedor}>
            <div className={styles.busquedaCaja}>
                <input type="text" className={styles.input} placeholder="Ej: titulo o autor" value={texto} onFocus={() => (setFiltro(""), setTexto(""))} onChange={(e) => setTexto(e.target.value)} />

                <button className={styles.boton}>
                    <span className={styles.icono}>
                        <img src="/icono-busqueda.svg" alt="Buscar" />
                    </span>
                    <span className={styles.texto}>BUSCAR</span>
                </button>
            </div>
        </div>
    );
}
