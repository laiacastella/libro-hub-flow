"use client";
import { useEffect, useState } from "react";
import { Boton, Estrellas } from "@/components";
import useIntercambio from "@/hooks/useIntercambio";
import { X } from "lucide-react";
import styles from "./PopUpValoracion.module.css";

export default function PopUpValoracion({ isOpen, onClose, intercambio, idUsuarioActual, onValoracionGuardada }) {
    const [puntuacion, setPuntuacion] = useState(0);
    const [valoracion, setValoracion] = useState("");
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);
    const { enviarValoracion } = useIntercambio();

    const idActual = Number(idUsuarioActual);
    const idPropietario = Number(intercambio?.id_usuario_envia);
    const idSolicitante = Number(intercambio?.id_usuario_recibe);
    const idUsuarioValorado = idActual === idPropietario ? idSolicitante : idActual === idSolicitante ? idPropietario : null;

    const nombreUsuarioValorado =
        idActual === idPropietario
            ? intercambio?.solicitante_nick_usuario || intercambio?.solicitante_nombre || null
            : idActual === idSolicitante
              ? intercambio?.propietario_nick_usuario || intercambio?.propietario_nombre || null
              : null;

    // Evitar scroll del fondo cuando el popup está abierto
    useEffect(() => { 
        document.body.classList.toggle("no-scroll", isOpen);
        return () => document.body.classList.remove("no-scroll");
    }, [isOpen]);

    // Resetear estado cada vez que se abre el popup o cambia el intercambio
    useEffect(() => {
        if (!isOpen) return;

        setPuntuacion(0);
        setValoracion("");
        setError("");
        setEnviando(false);
    }, [isOpen, intercambio?.id_intercambio]);

    // Manejar el envío de la valoración al backend
    async function manejarSubmit(e) {
        e.preventDefault();
        setError("");

        const valoracionLimpia = valoracion.trim();

        try {
            setEnviando(true);

            await enviarValoracion({
                    id_intercambio: intercambio.id_intercambio,
                    id_usuario_evaluador: Number(idUsuarioActual),
                    id_usuario_evaluado: Number(idUsuarioValorado),
                    puntuacion,
                    valoracion: valoracionLimpia,
            });

            await onValoracionGuardada?.(intercambio.id_intercambio);
        } catch {
            setError("No se pudo enviar la valoración. Inténtalo de nuevo.");
        } finally {
            setEnviando(false);
        }
    }

    if (!isOpen || !intercambio) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <dialog className={styles.popup} open onClick={(e) => e.stopPropagation()}>
                <div className={styles.main}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Valorar intercambio</h2>
                        <Boton ariaLabel="Cerrar ventana" texto={<X aria-hidden="true" size={24} />} variant="cerrar" title="Cerrar ventana" className={styles.closeButton} onClick={onClose} />
                    </div>

                    <p className={styles.subtitle}>Comparte tu experiencia con {nombreUsuarioValorado || "el otro usuario"}.</p>

                    <form onSubmit={manejarSubmit} className={styles.form}>
                        <div className={styles.estrellasSection}>
                            <span className={styles.label}>¿Qué tal ha sido el intercambio?</span>
                            <div className={styles.estrellasRow}>
                                <Estrellas valoracion={puntuacion} interactivo={true} onChange={setPuntuacion} size={38} />
                            </div>
                        </div>

                        <div className={styles.comentarioSection}>
                            <label htmlFor="valoracionIntercambio" className={styles.label}>
                                Cuentanos tu experiencia
                            </label>
                            <textarea id="valoracionIntercambio" rows={4} className={styles.textarea} value={valoracion} onChange={(e) => setValoracion(e.target.value)} placeholder="Ej: comunicacion rapida, puntual y libro en muy buen estado" />
                        </div>

                        {error && <p className={styles.error}>{error}</p>}

                        <div className={styles.actions}>
                            <Boton type="submit" size="small" texto={enviando ? "Enviando..." : "Enviar valoracion"} disabled={enviando || puntuacion === 0 || !valoracion.trim()} variant={enviando || puntuacion === 0 || !valoracion.trim() ? "disabled" : "default"} />
                            <Boton type="button" size="small" texto="Cancelar" variant="red" onClick={onClose} disabled={enviando} />
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}
