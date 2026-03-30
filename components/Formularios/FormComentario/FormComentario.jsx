"use client";

import { useState } from "react";
import styles from "./FormComentario.module.css";
import useLibroActivo from "@/hooks/useLibroActivo";

export default function FormComentario({ onEnviarComentario }) {
    const [comentario, setComentario] = useState("");
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);
    const { libroActivo } = useLibroActivo();
    console.log("ID del libro para el comentario:", libroActivo?.id_libro);

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
            const idLibroFinal = libroActivo?.id_libro; // ahora funciona con todos los libros
            const ahora = new Date();
            const fechaComentario = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, "0")}-${String(ahora.getDate()).padStart(2, "0")} ${String(ahora.getHours()).padStart(2, "0")}:${String(ahora.getMinutes()).padStart(2, "0")}:${String(ahora.getSeconds()).padStart(2, "0")}`;
            console.log("Fecha y hora local:", fechaComentario);

            const response = await fetch("/api/comentarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_libro: idLibroFinal ?? null,
                    id_usuario: idUsuario,
                    comentario: comentarioLimpio,
                    fecha_comentario: fechaComentario,
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
                Comentario :
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
