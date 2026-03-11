"use client";

import { Estrellas, ComponenteBiblioteca, Valoraciones } from "@/components";
import { useState } from "react";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PerfilUsuarioAjeno() {

    const valoracion = 4.5;
    const [paginaActiva, setPaginaActiva] = useState("biblioteca");

    return (
        <main className={`container my-4 ${styles.fondo}`}>

            <div className={`row align-items-center ${styles.perfil}`}>

                <div className={`col-12 col-md-4 text-center ${styles.foto}`}>
                    <img
                        src="/perfilUsuario.svg"
                        className={`img-fluid ${styles.fotoPerfil}`}
                        alt="perfilUsuario"
                    />
                </div>

                <div className={`col-12 col-md-8 ${styles.datos}`}>
                    <h2>Nombre de usuario</h2>
                    <h3>Ciudad, Provincia</h3>
                    <h3>23 Intercambios completados</h3>
                </div>

            </div>


            <div className={`row text-center ${styles.navegacion}`}>

                <div className="col-12 col-md-6 mb-2">
                    <div
                        tabIndex={0}
                        className={`${styles.paginas} 
                        ${paginaActiva === "biblioteca" ? styles.activo : ""}`}
                        onClick={() => setPaginaActiva("biblioteca")}>
                        <h1>15</h1>
                        <h2>Libros disponibles</h2>
                    </div>
                </div>

                <div className="col-12 col-md-6 mb-2">
                    <div
                        tabIndex={0}
                        className={`${styles.paginas} ${paginaActiva === "valoraciones" ? styles.activo : ""}`}
                        onClick={() => setPaginaActiva("valoraciones")}
                    >
                        <h1>
                            {valoracion} <Estrellas valoracion={valoracion} />
                        </h1>
                        <h2>Valoración media</h2>
                    </div>
                </div>

            </div>


            <div className={`row ${styles.contenido}`}>
                <div className="col-12">
                    {paginaActiva === "biblioteca" && <ComponenteBiblioteca />}
                    {paginaActiva === "valoraciones" && <Valoraciones />}
                </div>
            </div>

        </main>
    );
}