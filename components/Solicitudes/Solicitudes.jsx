"use client";
import { useState } from "react";
import styles from "./Solicitudes.module.css";
import { CardSolicitud, Select } from "@/components/index";
import useUsuario from "@/hooks/useUsuario";

export default function Solicitudes() {
    const [filtro, setFiltro] = useState("todas");
    const usuario = useUsuario();

    const opcionesFiltro = [
        { value: "todas", label: "Todas" },
        { value: "recibidas", label: "Recibidas" },
        { value: "realizadas", label: "Enviadas" },
        { value: "historial", label: "Historial" }
    ];

    return (
        <div className={styles.contenedorGeneral}>
            <div className={styles.selectorContainer}>
                <Select
                    id="filtro-solicitudes"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    opciones={opcionesFiltro}
                />
            </div>

            
            <div className={styles.contenedorSolicitudes} data-filtro={filtro}>
                <CardSolicitud filtro={filtro} idUsuario={usuario?.id_usuario} />
            </div>
        </div>
    );
}
