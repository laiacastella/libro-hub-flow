"use client";
import { CardComentario } from "@/components/index";
import FormComentario from "../Formularios/FormComentario/FormComentario.jsx";
import styles from "./Comentarios.module.css";
import { useState } from "react";
import useLibroActivo from "@/hooks/useLibroActivo.js";
import Boton from "@/components/UI/Boton/Boton";
import PopUp from "@/components/UI/PopUp/PopUp";

export default function Comentarios() {
    const [mostrarForm, setMostrarForm] = useState(false);
    const { libroActivo } = useLibroActivo();
    const [comentarios, setComentarios] = useState([]);
    const [popupExito, setPopupExito] = useState(false);
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
                        setPopupExito(true);
                    }}
                />
            )}
            <CardComentario comentarios={comentarios} setComentarios={setComentarios} />

            {/* Popup de éxito */}
            <PopUp
                isOpen={popupExito}
                onClose={() => setPopupExito(false)}
                title="¡Comentario publicado!"
                footer={
                    <Boton
                        texto="Aceptar"
                        variant="default"
                        onClick={() => setPopupExito(false)}
                    />
                }
            >
                <p>Tu comentario ha sido guardado correctamente.</p>
            </PopUp>
        </div>
    );
}
