"use client";
import { CardComentario } from "@/components/index";
import FormComentario from "../Formularios/FormComentario/FormComentario.jsx";
import styles from "./Comentarios.module.css";
import { useState } from "react";
import useUsuario from "@/hooks/useUsuario"

export default function Comentarios({ listaComentarios, setComentarios }) {
    const [mostrarForm, setMostrarForm] = useState(false);
    const usuarioLogueado = useUsuario();

    return (
        <div className={styles.comentariosContainer}>
            {/*botón*/}
            <button className={styles.boton} onClick={() => setMostrarForm(!mostrarForm)}>
                {mostrarForm ? "Cerrar" : "Añadir comentario"}
            </button>

            {/*condición */}
            {mostrarForm && (
                <FormComentario
                    //Cerramos el formulario automaticamente despues de enviar
                    onEnviarComentario={(n) => {
                        setComentarios([n, ...listaComentarios]);
                        setMostrarForm(false);
                    }}
                />
            )}

            {/* Mapeo */}
            <div className={styles.lista}>
                {/* si listaComentarios es igual a Null */}
                {listaComentarios && listaComentarios.length > 0 ? (
                    listaComentarios.map((comentario) => (
                        <div key={comentario.id_comentario} className="mb-3">
                            <CardComentario 
                                key={comentario.id_comentario} 
                                dato={comentario} 
                                // se compara una sola vez IDs aquí una sola vez por elemento
                                esMiComentario={usuarioLogueado?.id_usuario === comentario.id_usuario}
                                onEliminar={() => manejarEliminar(comentario.id_comentario)}
                            />
                        </div>
                    ))
                ) : (
                    <p className={styles.sinComentarios}>No hay reseñas aún. ¡Sé el primero!</p>
                )}
            </div>
        </div>
    );
}
