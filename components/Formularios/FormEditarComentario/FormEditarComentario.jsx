"use client";
import { useEffect, useState } from "react";
import styles from "./FormEditarComentario.module.css";
import Boton from "@/components/UI/Boton/Boton";

export default function FormEditarComentario({ comentario, idUsuario, onCancelar, onComentarioEditado }) {
    const [textoEditando, setTextoEditando] = useState(comentario?.comentario || "");

    useEffect(() => {
        setTextoEditando(comentario?.comentario || "");
    }, [comentario?.id_comentario, comentario?.comentario]);

    const deshabilitarGuardar = !textoEditando.trim() || textoEditando.trim() === comentario?.comentario;

    const manejarGuardar = async () => {
        const comentarioLimpio = textoEditando.trim();

        if (!comentarioLimpio || comentarioLimpio === comentario?.comentario) return;

        try {
            const response = await fetch("/api/comentarios", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_comentario: comentario?.id_comentario,
                    id_usuario: idUsuario,
                    comentario: comentarioLimpio,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                window.alert(data?.error || "No se pudo actualizar el comentario");
                return;
            }

            onComentarioEditado?.(data?.comentario?.comentario ?? comentarioLimpio);
        } catch {
            window.alert("Error de conexión. Inténtalo de nuevo.");
        }
    };

    return (
        <div className={`d-flex flex-column gap-3 ${styles.contenedor}`}>
            <textarea value={textoEditando} onChange={(e) => setTextoEditando(e.target.value)} className={styles.textareaEdicion} rows={4} autoFocus dir="ltr" />
            <div className={`d-flex gap-2 justify-content-end ${styles.acciones}`}>
                <Boton type="button" variant="red" size="small" onClick={onCancelar} texto="Cancelar" />
                <Boton type="button" variant={deshabilitarGuardar ? "disabled" : "default"} size="small" onClick={manejarGuardar} disabled={deshabilitarGuardar} texto="Guardar" />
            </div>
        </div>
    );
}
