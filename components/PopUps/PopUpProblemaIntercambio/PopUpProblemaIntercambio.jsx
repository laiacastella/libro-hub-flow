"use client";
import { useEffect, useState } from "react";
import { Boton, Estrellas } from "@/components";
import { X, AlertTriangle } from "lucide-react";
import styles from "./PopUpProblemaIntercambio.module.css";

export default function PopUpProblemaIntercambio({ 
    isOpen, 
    onClose, 
    intercambio, 
    idUsuarioActual, 
    onProblemaResuelto,
    estadoUsuario
}) {
    const [tipoAccion, setTipoAccion] = useState("revertir"); // "revertir" o "cerrar"
    const [descripcion, setDescripcion] = useState("");
    const [puntuacion, setPuntuacion] = useState(0);
    const [valoracion, setValoracion] = useState("");
    const [quiereValorar, setQuiereValorar] = useState(false);
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);

    const idActual = Number(idUsuarioActual);
    const idPropietario = Number(intercambio?.id_usuario_recibe);
    const idSolicitante = Number(intercambio?.id_usuario_envia);
    const idUsuarioValorado = idActual === idPropietario ? idSolicitante : idActual === idSolicitante ? idPropietario : null;

    const nombreUsuarioValorado =
        idActual === idPropietario
            ? intercambio?.solicitante_nick_usuario || intercambio?.solicitante_nombre || "el otro usuario"
            : idActual === idSolicitante
              ? intercambio?.propietario_nick_usuario || intercambio?.propietario_nombre || "el otro usuario"
              : "el otro usuario";

    // Evitar scroll del fondo
    useEffect(() => {
        document.body.classList.toggle("no-scroll", isOpen);
        return () => document.body.classList.remove("no-scroll");
    }, [isOpen]);

    // Resetear estado al abrir
    useEffect(() => {
        if (!isOpen) return;
        setTipoAccion("revertir");
        setDescripcion("");
        setPuntuacion(0);
        setValoracion("");
        setQuiereValorar(false);
        setError("");
        setEnviando(false);
    }, [isOpen, intercambio?.id_intercambio]);

    async function manejarSubmit(e) {
        e.preventDefault();
        setError("");

        if (!descripcion.trim()) {
            setError("Por favor, describe el problema ocurrido");
            return;
        }

        if (quiereValorar && (puntuacion === 0 || !valoracion.trim())) {
            setError("Si deseas valorar, debes proporcionar una puntuación y comentario");
            return;
        }

        try {
            setEnviando(true);

            const payload = {
                id_intercambio: intercambio.id_intercambio,
                id_usuario_reporta: idUsuarioActual,
                tipo_accion: tipoAccion,
                descripcion: descripcion.trim(),
            };

            // Si quiere valorar, incluir la valoración
            if (quiereValorar) {
                payload.valoracion = {
                    id_usuario_evaluador: idUsuarioActual,
                    id_usuario_evaluado: idUsuarioValorado,
                    puntuacion,
                    valoracion: valoracion.trim(),
                };
            }

            const res = await fetch("/api/intercambios/problema", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.error || "No se pudo procesar el reporte");
            }

            await onProblemaResuelto?.(intercambio.id_intercambio, tipoAccion);
            onClose();

        } catch (err) {
            setError(err?.message || "Error al procesar el reporte. Inténtalo de nuevo.");
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
                        <div className={styles.headerTitle}>
                            <AlertTriangle className={styles.iconWarning} size={28} />
                            <h2 className={styles.title}>Reportar Problema</h2>
                        </div>
                        <Boton 
                            ariaLabel="Cerrar ventana" 
                            texto={<X aria-hidden="true" size={24} color="white" />} 
                            variant="cerrar" 
                            title="Cerrar ventana" 
                            className={styles.closeButton} 
                            onClick={onClose} 
                        />
                    </div>

                    <p className={styles.subtitle}>
                        ¿Ha ocurrido algún problema con el intercambio? Cuéntanos qué ha pasado para poder ayudarte.
                    </p>

                    <form onSubmit={manejarSubmit} className={styles.form}>
                        {/* Tipo de acción */}
                        <div className={styles.section}>
                            <label className={styles.label}>¿Qué deseas hacer?</label>
                            <div className={styles.opcionesAccion}>
                                <label className={`${styles.opcion} ${tipoAccion === "revertir" ? styles.opcionActiva : ""}`}>
                                    <input
                                        type="radio"
                                        name="tipoAccion"
                                        value="revertir"
                                        checked={tipoAccion === "revertir"}
                                        onChange={(e) => setTipoAccion(e.target.value)}
                                    />
                                    <div className={styles.opcionContent}>
                                        <span className={styles.opcionTitulo}>Revertir y liberar mi libro</span>
                                        <span className={styles.opcionDescripcion}>
                                            Cancelar mi parte del intercambio y liberar solo mi libro. El otro usuario puede seguir si lo desea.
                                        </span>
                                    </div>
                                </label>
                                <label className={`${styles.opcion} ${tipoAccion === "cerrar" ? styles.opcionActiva : ""}`}>
                                    <input
                                        type="radio"
                                        name="tipoAccion"
                                        value="cerrar"
                                        checked={tipoAccion === "cerrar"}
                                        onChange={(e) => setTipoAccion(e.target.value)}
                                    />
                                    <div className={styles.opcionContent}>
                                        <span className={styles.opcionTitulo}>Cerrar y archivar mi libro</span>
                                        <span className={styles.opcionDescripcion}>
                                            Finalizar el intercambio y archivar mi libro (marcar como intercambiado)
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Descripción del problema */}
                        <div className={styles.section}>
                            <label htmlFor="descripcionProblema" className={styles.label}>
                                Describe el problema <span className={styles.requerido}>*</span>
                            </label>
                            <textarea
                                id="descripcionProblema"
                                rows={4}
                                className={styles.textarea}
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                placeholder="Ej: El otro usuario no respondió a mis mensajes, no quedamos en un lugar para el intercambio, etc."
                                required
                            />
                        </div>

                        {/* Opción de valorar */}
                        <div className={styles.section}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={quiereValorar}
                                    onChange={(e) => setQuiereValorar(e.target.checked)}
                                />
                                <span>Deseo valorar a {nombreUsuarioValorado} a pesar de no haber confirmado la entrega</span>
                            </label>
                        </div>

                        {/* Valoración condicional */}
                        {quiereValorar && (
                            <div className={styles.sectionValoracion}>
                                <div className={styles.estrellasSection}>
                                    <span className={styles.label}>¿Cómo valorarías tu experiencia?</span>
                                    <div className={styles.estrellasRow}>
                                        <Estrellas 
                                            valoracion={puntuacion} 
                                            interactivo={true} 
                                            onChange={setPuntuacion} 
                                            size={32} 
                                        />
                                    </div>
                                </div>

                                <div className={styles.comentarioSection}>
                                    <label htmlFor="valoracionProblema" className={styles.label}>
                                        Cuéntanos tu experiencia
                                    </label>
                                    <textarea
                                        id="valoracionProblema"
                                        rows={3}
                                        className={styles.textarea}
                                        value={valoracion}
                                        onChange={(e) => setValoracion(e.target.value)}
                                        placeholder="Ej: Aunque no se completó el intercambio, la comunicación fue buena/mala..."
                                    />
                                </div>
                            </div>
                        )}

                        {error && <p className={styles.error}>{error}</p>}

                        <div className={styles.actions}>
                            <Boton 
                                type="submit" 
                                size="small" 
                                texto={enviando ? "Procesando..." : "Enviar reporte"} 
                                disabled={enviando} 
                                variant={enviando ? "disabled" : "default"} 
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
                    </form>
                </div>
            </dialog>
        </div>
    );
}
