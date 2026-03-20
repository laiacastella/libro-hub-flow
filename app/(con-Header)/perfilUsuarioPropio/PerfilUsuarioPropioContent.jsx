"use client";

import { 
    Estrellas,
    ComponenteBiblioteca,
    Solicitudes,
    Valoraciones, 
    Boton, 
    Contador, 
    EscribirTexto } from "@/components";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PerfilUsuarioPropio() {
    
    const id_usuario = 5;
    const numLibros = 17;
    const numSolicitudes = 7;
    const numIntercambios = 23;
    const valoracion = 4.78;
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab");

    const [paginaActiva, setPaginaActiva] = useState(tab || "biblioteca");
    const esActivo = (tab) => paginaActiva === tab;

    const colorTexto = (tab) =>
        esActivo(tab)
            ? { inicio: "#ffffff", fin: "#ffffff" }
            : { inicio: "#333333", fin: "#333333" };

    const colorLibros = colorTexto("biblioteca");
    const colorSolicitud = colorTexto("solicitudes");
    const colorValoracion = colorTexto("valoraciones");

    return (
        <main className={`container-fluid my-4 ${styles.fondo}`}>


            <div className={`row align-items-center ${styles.perfil}`}>

                <div className={`col-12 col-md-3 text-center ${styles.foto}`}>
                    <img
                        src="/perfilUsuario.svg"
                        className={`img-fluid ${styles.fotoPerfil}`}
                        alt="perfilUsuario"
                    />
                </div>

                <div className={`col-12 col-md-7 ${styles.datos}`}>
                    <EscribirTexto texto="Nombre Apellidos (Nombre de usuario)" Tipo="h2" velocidad="100" />
                    <EscribirTexto texto="Ciudad, Provincia" Tipo="h3" velocidad="100" />
                    <EscribirTexto texto="Correo electrónico" Tipo="h3" velocidad="100" />
                    <EscribirTexto texto="Número de teléfono" Tipo="h3" velocidad="100" />
                    <div className="d-flex align-items-baseline gap-2">
                        <Contador 
                            valorFinal={numIntercambios}
                            colorInicio="#407c42"
                            colorFin="#000000"
                            duracion="1000"
                        />
                        <EscribirTexto 
                            texto="Intercambios completados" 
                            Tipo="h3" 
                            velocidad="100"
                        />
                    </div>
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
                            <h1><Contador 
                                key={`libros-${paginaActiva}`}
                                valorFinal={numLibros}
                                colorInicio={colorLibros.inicio}
                                colorFin={colorLibros.fin}
                                duracion="1000"
                            /></h1>
                            <h2>Libros disponibles</h2>
                    </div>
                </div>

                <div className="col-12 col-md-4 mb-2">
                    <div
                        tabIndex={0}
                        className={`${styles.paginas}
                        ${paginaActiva === "solicitudes" ? styles.activo : ""}`}
                        onClick={() => setPaginaActiva("solicitudes")}>
                            <h1><Contador 
                                key={`solicitudes-${paginaActiva}`}
                                valorFinal={numSolicitudes}
                                colorInicio={colorSolicitud.inicio}
                                colorFin={colorSolicitud.fin}
                                duracion="1000"
                            /></h1>
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
                                <Contador
                                    key={`valoraciones-${paginaActiva}`}
                                    valorFinal={valoracion}
                                    colorInicio={colorValoracion.inicio}
                                    colorFin={colorValoracion.fin}
                                    duracion="1000"
                                />
                                <Estrellas valoracion={valoracion} />
                            </h1>
                            <h2>Valoración media</h2>
                    </div>
                </div>
            </div>

            <div className={`row ${styles.contenido}`}>
                <div className="col-12">
                    {paginaActiva === "biblioteca" && <ComponenteBiblioteca /*id_usuario={id_usuario}*//>}
                    {paginaActiva === "solicitudes" && <Solicitudes />}
                    {paginaActiva === "valoraciones" && <Valoraciones />}
                </div>
            </div>
        </main>
    );
}
