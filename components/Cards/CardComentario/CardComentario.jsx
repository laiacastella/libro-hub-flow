"use client";
import { useEffect, useState } from "react";
import styles from "./CardComentario.module.css";
import { Trash2, Pencil } from "lucide-react";
import useUsuario from "@/hooks/useUsuario";
import useTiempo from "@/hooks/useTiempo";
import useLibroActivo from "@/hooks/useLibroActivo";
import Boton from "@/components/UI/Boton/Boton";
import FormEditarComentario from "@/components/Formularios/FormEditarComentario/FormEditarComentario";

function ComentarioItem({ comentario, usuarioLogueado, comentarioEditandoId, iniciarEdicionComentario, manejarEliminarComentario, cancelarEdicionComentario, manejarComentarioEditado }) {
    const esMiComentario = usuarioLogueado && Number(comentario.id_usuario) === Number(usuarioLogueado.id_usuario);

    const tiempoTranscurrido = useTiempo(comentario.fecha_comentario);
    return (
        <div className={`container-fluid mb-4 p-4 ${styles.comentarioCard}`}>
            <div className="row g-0 align-items-center mb-2">
                <div className="col-auto me-2">
                    <div className={styles.avatarWrapper}>
                        <img src={esMiComentario ? usuarioLogueado?.foto_perfil || "/perfilUsuario.svg" : comentario.foto_perfil} alt="avatar" className={styles.perfilUsuario} />
                    </div>
                </div>

                <div className="col d-flex flex-column">
                    <span className={styles.nombreUsuario}>{esMiComentario ? usuarioLogueado?.nick_usuario : comentario.nick_usuario}</span>
                    <span className={styles.tiempoPublicacion}>{tiempoTranscurrido}</span>
                </div>

                {esMiComentario && (
                    <div className="col-auto d-flex gap-3">
                        <Boton type="button" variant="cerrar" className="p-0 d-inline-flex align-items-center justify-content-center" onClick={() => iniciarEdicionComentario(comentario)} ariaLabel="Editar comentario" texto={<Pencil size={18} className="text-secondary cursor-pointer hover-effect" />} />
                        <Boton type="button" variant="cerrar" className="p-0 d-inline-flex align-items-center justify-content-center" onClick={() => manejarEliminarComentario(comentario)} ariaLabel="Eliminar comentario" texto={<Trash2 size={18} className="text-danger cursor-pointer hover-effect" />} />
                    </div>
                )}
            </div>

            <div className="row g-0">
                <div className="col-12">
                    <div className={`${styles.cajaComentario} ${comentarioEditandoId === comentario.id_comentario ? styles.cajaComentarioEditando : ""}`}>{comentarioEditandoId === comentario.id_comentario ? <FormEditarComentario comentario={comentario} idUsuario={usuarioLogueado?.id_usuario} onCancelar={cancelarEdicionComentario} onComentarioEditado={(nuevoTexto) => manejarComentarioEditado(comentario.id_comentario, nuevoTexto)} /> : <p className="mb-0">{comentario.comentario}</p>}</div>
                </div>
            </div>
        </div>
    );
}

export default function CardComentario({ comentarios, setComentarios }) {
    const usuarioLogueado = useUsuario();
    const { libroActivo } = useLibroActivo();
    const idLibro = libroActivo?.id_libro;
    const [comentarioEditandoId, setComentarioEditandoId] = useState(null);

    useEffect(() => {
        if (!idLibro) return;
        fetch(`/api/comentarios?id_libro=${idLibro}`) // trae comentarios por id_libro
            .then((res) => res.json())
            .then((data) => {
                const comentarios = data?.data ?? data ?? [];
                setComentarios(Array.isArray(comentarios) ? comentarios : []);
            })
            .catch(() => setComentarios([]));
    }, [idLibro, setComentarios]);

    const iniciarEdicionComentario = (comentario) => {
        setComentarioEditandoId(comentario.id_comentario);
    };

    const cancelarEdicionComentario = () => {
        setComentarioEditandoId(null);
    };

    const manejarComentarioEditado = (idComentario, nuevoTexto) => {
        setComentarios((comentariosPrevios) => comentariosPrevios.map((comentarioActual) => (Number(comentarioActual.id_comentario) === Number(idComentario) ? { ...comentarioActual, comentario: nuevoTexto } : comentarioActual)));
        cancelarEdicionComentario();
    };

    const manejarEliminarComentario = async (comentario) => {
        const confirmado = window.confirm("¿Quieres eliminar este comentario?");

        if (!confirmado) return;

        try {
            const response = await fetch("/api/comentarios", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_comentario: comentario.id_comentario,
                    id_usuario: usuarioLogueado?.id_usuario,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                window.alert(data?.error || "No se pudo eliminar el comentario");
                return;
            }

            if (Number(comentarioEditandoId) === Number(comentario.id_comentario)) {
                cancelarEdicionComentario();
            }

            setComentarios((comentariosPrevios) => comentariosPrevios.filter((comentarioActual) => Number(comentarioActual.id_comentario) !== Number(comentario.id_comentario)));
        } catch {
            window.alert("Error de conexión. Inténtalo de nuevo.");
        }
    };

    return comentarios.map((comentario) => <ComentarioItem key={comentario.id_comentario} comentario={comentario} usuarioLogueado={usuarioLogueado} comentarioEditandoId={comentarioEditandoId} iniciarEdicionComentario={iniciarEdicionComentario} manejarEliminarComentario={manejarEliminarComentario} cancelarEdicionComentario={cancelarEdicionComentario} manejarComentarioEditado={manejarComentarioEditado} />);
}
