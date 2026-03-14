"use client";
import { useEffect } from "react";
import styles from "./PopUpIncidencia.module.css";
import FormIncidencia from "@/components/Formularios/FormIncidencia/FormIncidencia";
import { X } from "lucide-react";
import { Boton } from "@/components";

export default function PopUpIncidencia({ isOpen, onClose }) {
    // Efecto para bloquear el scroll del fondo cuando el pop-up está abierto.
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
    }, [isOpen]);

    // Si el pop-up no está abierto, no renderizamos nada, devolvemos null.
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <dialog className={`${styles.popup} border-0 p-0 bg-transparent`} open onClick={(e) => e.stopPropagation()}>
                {/* Evita que el clic en el contenido cierre el pop-up */}
                <main className={styles.main}>
                    <div className={`${styles.titleSection} mb-3`}>
                        <div className="d-flex align-items-start justify-content-between gap-3">
                            <p className={styles.title}>Reportar una Incidencia</p>
                            <Boton ariaLabel="Cerrar ventana" texto={<X aria-hidden="true" size={28} />} variant="cerrar" title="Cerrar ventana" className={`${styles.closeButton} border-0 bg-transparent p-0 d-inline-flex align-items-center justify-content-center`} onClick={onClose} />
                        </div>
                        <p className={`${styles.subtitle} m-0`}>Describe el problema que estás experimentando. Nuestro equipo técnico revisará tu reporte y te contactará a la mayor brevedad.</p>
                    </div>

                    <FormIncidencia onClose={onClose} />
                </main>
            </dialog>
        </div>
    );
}
