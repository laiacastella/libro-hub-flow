"use client";
import { useState, useEffect } from "react";
import styles from "./CardComentario.module.css";
import { Trash2, Pencil } from "lucide-react";
import useUsuario from "@/hooks/useUsuario";

export default function CardComentario({ dato }) {
    const usuarioLogueado = useUsuario();
    const [nombreAutor, setNombreAutor] = useState(`Usuario #${dato.id_usuario}`);
    const [fotoAutor, setFotoAutor] = useState("/perfilUsuario.svg");

    const esMiComentario = usuarioLogueado && Number(dato.id_usuario) === Number(usuarioLogueado.id_usuario);

    useEffect(() => {
        // Si es comentario, ya tengo los datos en el hook, no hace falta fetch
        if (esMiComentario) {
            setNombreAutor(usuarioLogueado.nombre_usuario || "Tú");
            setFotoAutor(usuarioLogueado.foto_perfil || "/perfilUsuario.svg");
        } else {
            // Si es de otro, pedimos sus datos a la API de usuarios
            fetch(`/api/usuarios/${dato.id_usuario}`)
                .then((res) => res.json())
                .then((resJson) => {
                    // Ajusta 'resJson.nombre' según como devuelva los datos tu API
                    if (resJson.nombre_usuario) setNombreAutor(resJson.nombre_usuario);
                    if (resJson.foto_perfil) setFotoAutor(resJson.foto_perfil);
                })
                .catch(() => console.log("Error al obtener datos del autor"));
        }
    }, [dato.id_usuario, esMiComentario, usuarioLogueado]);

    return (
        <div className={styles.comentarioCard}>
            <div className={styles.header}>
                <div className={styles.usuarioInfo}>
                    <img src={fotoAutor} alt="avatar" className={styles.perfilUsuario} />
                    <div className={styles.usuarioDatos}>
                        <h2 className={styles.usuario}>{nombreAutor}</h2>
                        <p className={styles.tiempo}>
                            {new Date(dato.fecha_comentario).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                {esMiComentario && (
                    <div className={styles.contenedorSvg}>
                        <Pencil size={18} />
                        <Trash2 size={18} />
                    </div>
                )}
            </div>
            <p className={styles.comentarioText}>{dato.comentario}</p>
        </div>
    );
}