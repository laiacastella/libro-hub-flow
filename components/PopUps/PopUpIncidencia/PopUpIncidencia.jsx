"use client";
import { useEffect } from "react";
import styles from "./PopUpIncidencia.module.css";
import FormIncidencia from "@/components/Formularios/FormIncidencia/FormIncidencia";
import { X } from "lucide-react";
import { Boton } from "@/components";

export default function PopUpIncidencia({ isOpen, onClose }) {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <dialog className={styles.popup} open onClick={(e) => e.stopPropagation()}>
                <main className={styles.main}>
                    <div className={styles.titleSection}>
                        <div className={styles.titleHeader}>
                            <h1 className={styles.title}>Reportar una Incidencia</h1>
                            <Boton texto={<X size={28} />} variant="cerrar" title="Cerrar ventana" className={styles.closeButton} onClick={onClose} />
                        </div>
                        <p className={styles.subtitle}>Describe el problema que estás experimentando. Nuestro equipo técnico revisará tu reporte y te contactará a la mayor brevedad.</p>
                    </div>

                    <FormIncidencia compact={true} />
                </main>
            </dialog>
        </div>
    );
}
