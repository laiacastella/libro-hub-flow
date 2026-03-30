"use client";
import { CardComentario } from "@/components/index";
import FormComentario from "../Formularios/FormComentario/FormComentario.jsx";
import styles from "./Comentarios.module.css";
import { useState } from "react";
import useLibroActivo from "@/hooks/useLibroActivo.js";

export default function Comentarios() {
    const [mostrarForm, setMostrarForm] = useState(false);
    const { libroActivo } = useLibroActivo();
    const [comentarios, setComentarios] = useState([]);

    console.log("ID del libro en Comentarios:", libroActivo?.id_libro);
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
                        setComentarios([n, ...comentarios]);
                        setMostrarForm(false);
                    }}
                />
            )}
            <CardComentario comentarios={comentarios} setComentarios={setComentarios} />
        </div>
    );
}
