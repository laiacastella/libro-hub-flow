"use client";
import { CardComentario } from "@/components/index";
import FormComentario from "../Formularios/FormComentario/FormComentario.jsx";
import styles from "./Comentarios.module.css";
import { useState } from "react";

export default function Comentarios() {
    const [añadirComentario, setAñadirComentario] = useState(false);
    return (
        <>
            <div className={styles.comentariosContainer}>
                <button type="button" className={styles.boton} onClick={() => (añadirComentario === true ? setAñadirComentario(false) : setAñadirComentario(true))}>
                    Añadir comentario
                </button>
                {añadirComentario && <FormComentario />}
                <CardComentario />
            </div>
        </>
    );
}
