"use client";
import { useEffect } from "react";
import styles from "./CardComentario.module.css";
import { Trash2, Pencil } from "lucide-react";
import useUsuario from "@/hooks/useUsuario";
import useTiempo from "@/hooks/useTiempo";
import useLibroActivo from "@/hooks/useLibroActivo";

export default function CardComentario({ comentarios, setComentarios }) {
    const usuarioLogueado = useUsuario();
    const { libroActivo } = useLibroActivo();
    const idLibro = libroActivo?.id_libro;

    useEffect(() => {
        if (!idLibro) return;
        fetch(`/api/comentarios?id_libro=${idLibro}`) // trae comentarios por id_libro
            .then((res) => res.json())
            .then((data) => {
                const comentarios = data?.data ?? data ?? [];
                setComentarios(Array.isArray(comentarios) ? comentarios : []);
            })
            .catch(() => setComentarios([]));
    }, [idLibro]); // se agrega comentarios.length para recargar al eliminar o agregar

    console.log("comentarios:", comentarios);
    console.log("ID LIBRO:", idLibro);

    function ComentarioItem({ comentario }) {
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
                            <Pencil size={18} className="text-secondary cursor-pointer hover-effect" />
                            <Trash2 size={18} className="text-danger cursor-pointer hover-effect" />
                        </div>
                    )}
                </div>

                <div className="row g-0">
                    <div className="col-12">
                        <div className={styles.cajaComentario}>
                            <p className="mb-0">{comentario.comentario}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return comentarios.map((comentario) => <ComentarioItem key={comentario.id_comentario} comentario={comentario} />);
}
