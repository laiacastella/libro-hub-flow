"use client";
import { useEffect, useState } from "react";
import { Boton, Estrellas, PopUp } from "@/components";
import useIntercambio from "@/hooks/useIntercambio";
import styles from "./PopUpValoracion.module.css";

export default function PopUpValoracion({
    isOpen,
    onClose,
    intercambio,
    idUsuarioActual,
    onValoracionGuardada
}) {
    const [puntuacion, setPuntuacion] = useState(0);
    const [valoracion, setValoracion] = useState("");
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);

    const { enviarValoracion } = useIntercambio();

    const idActual = Number(idUsuarioActual);
    const idPropietario = Number(intercambio?.id_usuario_envia);
    const idSolicitante = Number(intercambio?.id_usuario_recibe);

    const idUsuarioValorado =
        idActual === idPropietario
            ? idSolicitante
            : idActual === idSolicitante
            ? idPropietario
            : null;

    const nombreUsuarioValorado =
        idActual === idPropietario
            ? intercambio?.solicitante_nick_usuario || intercambio?.solicitante_nombre
            : idActual === idSolicitante
            ? intercambio?.propietario_nick_usuario || intercambio?.propietario_nombre
            : null;

    useEffect(() => {
        if (!isOpen) return;
        document.body.classList.add("no-scroll");

        return () => document.body.classList.remove("no-scroll");
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        setPuntuacion(0);
        setValoracion("");
        setError("");
        setEnviando(false);
    }, [isOpen, intercambio?.id_intercambio]);

    async function manejarSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            setEnviando(true);

            await enviarValoracion({
                id_intercambio: intercambio.id_intercambio,
                id_usuario_evaluador: Number(idUsuarioActual),
                id_usuario_evaluado: Number(idUsuarioValorado),
                puntuacion,
                valoracion: valoracion.trim(),
            });

            await onValoracionGuardada?.(intercambio.id_intercambio);
            onClose();
        } catch {
            setError("No se pudo enviar la valoración. Inténtalo de nuevo.");
        } finally {
            setEnviando(false);
        }
    }

    if (!isOpen || !intercambio) return null;

    return (
        <PopUp 
            isOpen={isOpen} 
            onClose={onClose} 
            title="Valorar intercambio"
            footer={
                <div className={styles.actions}>
                    <Boton
                        type="submit"
                        size="small"
                        texto={enviando ? "Enviando..." : "Enviar valoración"}
                        disabled={enviando || puntuacion === 0 || !valoracion.trim()}
                        variant={
                            enviando || puntuacion === 0 || !valoracion.trim()
                                ? "disabled"
                                : "default"
                        }
                    />

                    <Boton
                        type="button"
                        size="small"
                        texto="Cancelar"
                        variant="red"
                        onClick={onClose}
                        disabled={enviando}
                    />
                </div>
            }
            >
            <p className={styles.subtitle}>
                Comparte tu experiencia con {nombreUsuarioValorado || "el otro usuario"}.
            </p>

            <form onSubmit={manejarSubmit} className={styles.form}>
                <div className={styles.estrellasSection}>
                    <span className={styles.label}>¿Qué tal ha sido el intercambio?</span>
                    <Estrellas
                        valoracion={puntuacion}
                        interactivo
                        onChange={setPuntuacion}
                        size={38}
                    />
                </div>

                <div className={styles.comentarioSection}>
                    <label htmlFor="valoracionIntercambio" className={styles.label}>
                        Cuéntanos tu experiencia
                    </label>

                    <textarea
                        id="valoracionIntercambio"
                        rows={4}
                        className={styles.textarea}
                        value={valoracion}
                        onChange={(e) => setValoracion(e.target.value)}
                        placeholder="Ej: comunicación rápida, puntual y libro en muy buen estado"
                    />
                </div>

                {error && <p className={styles.error}>{error}</p>}

            </form>
        </PopUp>
    );
}