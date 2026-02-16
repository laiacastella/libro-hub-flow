"use client"
import { useEffect, useState } from "react";
import styles from "./Resenyas.module.css";

export function Resenyas({ idLibro }) {
    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        // Fetch a tu propio endpoint de PHP
        fetch(`http://localhost/libro-hub-flow/api/get_resenas.php?id_libro=${idLibro}`)
            .then(res => res.json())
            .then(data => setComentarios(data))
            .catch(err => console.error("Error al cargar reseñas propias:", err));
    }, [idLibro]);

    return (
        <section className={styles.contenedor}>
            <h3 className={styles.tituloSecundario}>Reseñas de la comunidad</h3>
            
            <div className={styles.listaResenas}>
                {comentarios.length > 0 ? (
                    comentarios.map((r) => (
                        <div key={r.id_resena} className={styles.burbuja}>
                            <div className={styles.usuarioInfo}>
                                {/* Círculo gris para el avatar como en tu imagen */}
                                <div className={styles.avatarGris}></div>
                                <span className={styles.userName}>{r.nombre_usuario}</span>
                            </div>
                            <div className={styles.cuerpoResena}>
                                <p>{r.comentario}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={styles.vacio}>Aún no hay comentarios para este ejemplar.</p>
                )}
            </div>
        </section>
    );
}