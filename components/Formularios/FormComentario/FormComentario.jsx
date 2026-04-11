"use client";

import { useState } from "react";
import styles from "./FormComentario.module.css";
import useLibroActivo from "@/hooks/useLibroActivo";
import useUsuario from "@/hooks/useUsuario";
import Boton from "@/components/UI/Boton/Boton";

export default function FormComentario({ onEnviarComentario }) {
    const [comentario, setComentario] = useState("");
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);
    const { libroActivo } = useLibroActivo();
    const usuarioLogueado = useUsuario();

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const comentarioLimpio = comentario.trim();

        if (!comentarioLimpio) return;

        try {
            setEnviando(true);

            const idUsuario = usuarioLogueado?.id_usuario;
            const idLibroFinal = libroActivo?.id_libro; // ahora funciona con todos los libros
            const ahora = new Date();
            const fechaComentario = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, "0")}-${String(ahora.getDate()).padStart(2, "0")} ${String(ahora.getHours()).padStart(2, "0")}:${String(ahora.getMinutes()).padStart(2, "0")}:${String(ahora.getSeconds()).padStart(2, "0")}`;

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
        <form className={`container-fluid mb-4 p-4 ${styles.comentarioCard}`} onSubmit={manejarSubmit}>
            <div className="row g-0 align-items-center mb-2">
                <div className="col-auto me-2">
                    <div className={styles.avatarWrapper}>
                        <img src={usuarioLogueado?.foto_perfil || "/perfilUsuario.svg"} alt="avatar" className={styles.perfilUsuario} />
                    </div>
                </div>

                <div className="col d-flex flex-column">
                    <span className={styles.nombreUsuario}>{usuarioLogueado?.nick_usuario || "Usuario"}</span>
                    <span className={styles.tiempoPublicacion}>Ahora</span>
                </div>
            </div>

            <div className="row g-0">
                <div className="col-12">
                    <div className="d-flex flex-column gap-3">
                        <textarea id="comentario" value={comentario} onChange={(e) => setComentario(e.target.value)} className={styles.textareaComentario} placeholder="Escribe tu comentario..." rows={4} />

                        {error && <p className={styles.error}>{error}</p>}

                        <div className="d-flex justify-content-end">
                            <Boton type="submit" variant={enviando || !comentario.trim() ? "disabled" : "default"} size="small" disabled={enviando || !comentario.trim()} texto={enviando ? "Publicando..." : "Publicar comentario"} />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
