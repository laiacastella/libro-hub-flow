"use client";

import { Estrellas, ComponenteBiblioteca, Solicitudes, Valoraciones, Boton, Contador } from "@/components";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PerfilUsuarioPropio() {
    
    const id_usuario = 5;
    const valoracion = 3.0;
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab");

    const [paginaActiva, setPaginaActiva] = useState(tab || "biblioteca");

    return (
        <main className={`container my-4 ${styles.fondo}`}>

            <div className={`row align-items-center ${styles.perfil}`}>

                <div className={`col-12 col-md-3 text-center ${styles.foto}`}>
                    <img
                        src="/perfilUsuario.svg"
                        className={`img-fluid ${styles.fotoPerfil}`}
                        alt="perfilUsuario"
                    />
                </div>

                <div className={`col-12 col-md-7 ${styles.datos}`}>
                    <h2>Nombre Apellidos (Nombre de usuario)</h2>
                    <h3>Ciudad, Provincia</h3>
                    <h3>Correo electrónico</h3>
                    <h3>Número de teléfono</h3>
                    <h3>23 Intercambios completados</h3>
                </div>

                <div className={`col-12 col-md-2 ${styles.editarDatos}`}>
                    <Boton type="button" texto="Editar datos de la cuenta" enlace="editarCuenta" />
                </div>

            </div>

            <div className={`row text-center ${styles.navegacion}`}>

                <div className="col-12 col-md-4 mb-2">        
                    <div
                        tabIndex={0}
                        className={`${styles.paginas}
                        ${paginaActiva === "biblioteca" ? styles.activo : ""}`}
                        onClick={() => setPaginaActiva("biblioteca")}>
                            <h1><Contador valorFinal={numLibros} /></h1>
                            <h2>Libros disponibles</h2>
                    </div>
                </div>

                <div className="col-12 col-md-4 mb-2">
                    <div
                        tabIndex={0}
                        className={`${styles.paginas}
                        ${paginaActiva === "solicitudes" ? styles.activo : ""}`}
                        onClick={() => setPaginaActiva("solicitudes")}>
                            <h1>7</h1>
                            <h2>Solicitudes de intercambio</h2>
                    </div>
                </div>

                <div className="col-12 col-md-4 mb-2">
                    <div
                        tabIndex={0}
                        className={`${styles.paginas}
                        ${paginaActiva === "valoraciones" ? styles.activo : ""}`}
                        onClick={() => setPaginaActiva("valoraciones")}>
                            <h1>
                                {valoracion} <Estrellas valoracion={valoracion} />
                            </h1>
                            <h2>Valoración media</h2>
                    </div>
                </div>
            </div>

            <div className={`row ${styles.contenido}`}>
                <div className="col-12">
                    {paginaActiva === "biblioteca" && <ComponenteBiblioteca id_usuario={id_usuario}/>}
                    {paginaActiva === "solicitudes" && <Solicitudes />}
                    {paginaActiva === "valoraciones" && <Valoraciones />}
                </div>
            </div>
        </main>
    );
}
