"use client";
import { CardComentario } from "@/components/index";
import FormComentario from "../Formularios/FormComentario/FormComentario.jsx";
import styles from "./Comentarios.module.css";
import { useState } from "react";
import useLibroActivo from "@/hooks/useLibroActivo.js";
import Boton from "@/components/UI/Boton/Boton";

export default function Comentarios() {
    const [mostrarForm, setMostrarForm] = useState(false);
    const { libroActivo } = useLibroActivo();
    const [comentarios, setComentarios] = useState([]);
    const deshabilitarAnadir = !libroActivo?.id_libro && !mostrarForm;

    console.log("ID del libro en Comentarios:", libroActivo?.id_libro);
    return (
        <div className={styles.comentariosContainer}>
            <div className={styles.header}>
                <h2>Reseñas de la comunidad</h2>
                <Boton
                    type="button"
                    size="small"
                    variant={deshabilitarAnadir ? "disabled" : "default"}
                    disabled={deshabilitarAnadir}
                    onClick={() => setMostrarForm(!mostrarForm)}
                    texto={mostrarForm ? "Cerrar" : "Añadir comentario"}
                />
            </div>

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
