"use client";

import { useEffect } from "react";
import styles from "./PopUpGenerico.module.css";

export default function PopUpGenerico({
    isOpen,
    onClose,
    children,
    cerrarAlHacerClickFuera = true,
    overlayClassName = "",
    popupClassName = "",
    ariaLabel = "Ventana emergente",
}) {

    // Evitar scroll del fondo cuando el popup está abierto
    useEffect(() => {
        document.body.classList.toggle("no-scroll", Boolean(isOpen));

        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [isOpen]);

    // Si el popup no está abierto, no renderizamos nada
    if (!isOpen) return null;

    return (
        <div
            className={`${styles.overlay} ${overlayClassName}`.trim()}
            // Cierra al hacer clic fuera del contenido si esta opcion esta activa.
            onClick={cerrarAlHacerClickFuera ? onClose : undefined}
        >
            <dialog aria-label={ariaLabel} className={`${styles.popup} ${popupClassName}`.trim()} open onClick={(event) => event.stopPropagation()}>
                <div className={styles.content}>{children}</div>
            </dialog>
        </div>
    );
}
