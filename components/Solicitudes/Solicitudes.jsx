"use client";
import { useState } from "react";
import styles from "./Solicitudes.module.css";
import { CardSolicitud } from "@/components/index";
import useUsuario from "@/hooks/useUsuario";

export default function Solicitudes() {
    const [filtro, setFiltro] = useState("recibidas");
    const usuario = useUsuario();

    return (
        <>
            <div className={styles.selectorContainer}>
                <select value={filtro} onChange={(e) => setFiltro(e.target.value)} className={styles.selector}>
                    <option value="recibidas">Recibidas</option>
                    <option value="realizadas">Realizadas</option>
                    <option value="historial">Historial</option>
                </select>
            </div>

            <div className={styles.contenedorSolicitudes}>
                <CardSolicitud filtro={filtro} idUsuario={usuario?.id_usuario} />
            </div>
        </>
    );
}
