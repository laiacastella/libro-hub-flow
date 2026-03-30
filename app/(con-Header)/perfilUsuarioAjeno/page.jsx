"use client";

import { Estrellas, ComponenteBiblioteca, Valoraciones, Contador } from "@/components";
import { useState } from "react";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PerfilUsuarioAjeno() {

    const numLibros = 8;
    const numIntercambios = 16;
    const valoracion = 4.14;
    const [paginaActiva, setPaginaActiva] = useState("biblioteca");
    const esActivo = (tab) => paginaActiva === tab;

    const colorTexto = (tab) =>
        esActivo(tab)
            ? { inicio: "#ffffff", fin: "#ffffff" }
            : { inicio: "#333333", fin: "#333333" };

    const colorLibros = colorTexto("biblioteca");
    const colorValoracion = colorTexto("valoraciones");

    return (
        <div className={`container-fluid my-4 ${styles.fondo}`}>

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
                    <h3><Contador 
                        valorFinal={numIntercambios}
                        colorInicio="#407c42"
                        colorFin="#000000"
                        size="sm" 
                        duracion="3000"
                        /> Intercambios completados</h3>
                </div>

            </div>


            <div className={`row text-center ${styles.navegacion}`}>

                <div className="col-12 col-md-6 mb-2">
                    <div
                        tabIndex={0}
                        className={`${styles.paginas} 
                        ${paginaActiva === "biblioteca" ? styles.activo : ""}`}
                        onClick={() => setPaginaActiva("biblioteca")}>
                        <h1><Contador 
                            key={`libros-${paginaActiva}`}
                            valorFinal={numLibros}
                            colorInicio={colorLibros.inicio}
                            colorFin={colorLibros.fin}
                            duracion="3000"
                        /></h1>
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
                            <Contador
                                key={`valoraciones-${paginaActiva}`}
                                valorFinal={valoracion}
                                colorInicio={colorValoracion.inicio}
                                colorFin={colorValoracion.fin}
                                duracion="3000"
                            />
                            <Estrellas valoracion={valoracion} />
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

        </div>
    );
}