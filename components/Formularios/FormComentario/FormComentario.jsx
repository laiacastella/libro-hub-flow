"use client";

import { useState } from "react";
import styles from "./FormComentario.module.css";
import useLibroActivo from "@/hooks/useLibroActivo";

export default function FormComentario({ onEnviarComentario, idLibro = null }) {
    const [comentario, setComentario] = useState("");
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);
    const { libroActivo } = useLibroActivo();

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const comentarioLimpio = comentario.trim();

        if (!comentarioLimpio) return;

        try {
            setEnviando(true);

            const usuarioGuardado = typeof window !== "undefined" ? localStorage.getItem("usuarioLogueado") : null;
            const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
            const idUsuario = usuario?.id_usuario;
            const idLibroFinal = idLibro; // ahora funciona con todos los libros

            const response = await fetch("/api/comentarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_libro: idLibroFinal ?? null,
                    id_usuario: idUsuario,
                    comentario: comentarioLimpio,
                }),
            });

            alert("Comentario guardado correctamente");

            const data = await response.json();

            if (!response.ok) {
                setError(data?.error || "No se pudo publicar el comentario");
                return;
            }

            onEnviarComentario?.(data?.comentario || { comentario: comentarioLimpio });

            setComentario("");
        } catch {
            setError("Error de conexión. Inténtalo de nuevo.");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <form className={styles.comentarioCard} onSubmit={manejarSubmit}>
            <label htmlFor="comentario" className={styles.labelCampo}>
                Comentario (de momento se usa el libro "La naranja mecánica" con id 29 para pruebas, hasta que tengamos la ficha libro):
            </label>
            <textarea id="comentario" value={comentario} onChange={(e) => setComentario(e.target.value)} className={styles.textareaComentario} placeholder="Escribe tu comentario..." rows={4} />

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.acciones}>
                <button type="submit" className={styles.botonEnviar} disabled={enviando}>
                    Publicar comentario
                </button>
            </div>
        </form>
    );
}
