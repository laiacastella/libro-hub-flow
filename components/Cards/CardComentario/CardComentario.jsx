"use client";
import { useState, useEffect } from "react";
import styles from "./CardComentario.module.css";
import { Trash2, Pencil } from "lucide-react";
import useUsuario from "@/hooks/useUsuario";
import useTiempo from "@/hooks/useTiempo";

export default function CardComentario({ dato }) {
    const usuarioLogueado = useUsuario();
    const [nombreAutor, setNombreAutor] = useState(`Usuario #${dato.id_usuario}`);
    const [fotoAutor, setFotoAutor] = useState("/perfilUsuario.svg");

    const tiempoTranscurrido = useTiempo(dato.fecha_comentario);

    const esMiComentario = usuarioLogueado && Number(dato.id_usuario) === Number(usuarioLogueado.id_usuario);

    useEffect(() => {
        if (esMiComentario) {
            setNombreAutor(usuarioLogueado.nombre_usuario || "Tú");
            setFotoAutor(usuarioLogueado.foto_perfil || "/perfilUsuario.svg");
        } else { 
            fetch(`/api/usuarios/${dato.id_usuario}`)
                .then((res) => res.json())
                .then((resJson) => {
                    if (resJson.nick_usuario) setNombreAutor(resJson.nick_usuario);
                    if (resJson.foto_perfil) setFotoAutor(resJson.foto_perfil);
                })
                .catch(() => console.log("Error al obtener datos del autor"));
        }
    }, [dato.id_usuario, esMiComentario, usuarioLogueado]);

    return (
        <div className={`container-fluid mb-4 p-4 ${styles.comentarioCard}`}>
            <div className="row g-0 align-items-center mb-2">
                <div className="col-auto me-2">
                    <div className={styles.avatarWrapper}>
                        <img src={fotoAutor} alt="avatar" className={styles.perfilUsuario} />
                    </div>
                </div>

                {/* Nombre y Tiempo */}
                <div className="col d-flex flex-column">
                    <span className={styles.nombreUsuario}>{nombreAutor}</span>
                    <span className={styles.tiempoPublicacion}>{tiempoTranscurrido}</span>
                </div>

                {/* Acciones si es mi libro */}
                {esMiComentario && (
                    <div className="col-auto d-flex gap-3">
                        <Pencil size={18} className="text-secondary cursor-pointer hover-effect" />
                        <Trash2 size={18} className="text-danger cursor-pointer hover-effect" />
                    </div>
                )}
            </div>

            {/*texto*/}
            <div className="row g-0">
                <div className="col-12">
                    <div className={styles.cajaComentario}>
                        <p className="mb-0">{dato.comentario}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}