"use client";

import styles from "./CardIntercambioCompletado.module.css";
import useTiempo from "@/hooks/useTiempo";
import { ArrowLeftRight, CheckCircle2 } from "lucide-react";

function LibroIntercambio({ titulo, foto }) {
    return (
        <div className={styles.libroBloque}>
            <img className={styles.portada} src={foto || "https://via.placeholder.com/120x170?text=Sin+Portada"} alt={titulo || "Portada del libro"} loading="lazy" />
        </div>
    );
}

export default function CardIntercambioCompletado({ intercambio, idUsuarioActual }) {
    // Determinar qué fecha mostrar según el usuario que ve el historial
    const esUsuarioEnvia = Number(idUsuarioActual) === Number(intercambio?.id_usuario_envia);
    const esUsuarioRecibe = Number(idUsuarioActual) === Number(intercambio?.id_usuario_recibe);
    
    let fechaCierre;
    if (esUsuarioEnvia) {
        fechaCierre = intercambio?.fecha_cierre_envia;
    } else if (esUsuarioRecibe) {
        fechaCierre = intercambio?.fecha_cierre_recibe;
    }
    
    const tiempo = useTiempo(fechaCierre || intercambio?.fecha_inicio || intercambio?.fecha);
    const solicitante = intercambio?.solicitante_nick_usuario || intercambio?.solicitante_nombre || "Usuario";
    const propietario = intercambio?.propietario_nick_usuario || intercambio?.propietario_nombre || "Usuario";

    return (
        <article className={styles.cardCompletada}>
            
            <div className={styles.librosFila}>
                <LibroIntercambio titulo={intercambio?.libro_solicitado_titulo} foto={intercambio?.libro_solicitado_foto} />
                <ArrowLeftRight className={styles.iconoIntercambio} />
                <LibroIntercambio titulo={intercambio?.libro_ofrecido_titulo} foto={intercambio?.libro_ofrecido_foto} />
            </div>
            <div className={styles.resumen}>
                <div className={styles.estado}>
                    <CheckCircle2 className={styles.iconoEstado} />
                    <span>Intercambio completado</span>
                </div>
                <p className={styles.meta}><strong></strong>{intercambio?.libro_solicitado_titulo || "Libro"} solicitado por {solicitante} y cambiado por {intercambio?.libro_ofrecido_titulo || "otro libro"} de {propietario}</p>
                {tiempo && <p className={styles.metaSec}>{tiempo}</p>}
            </div>
        </article>
    );
}
