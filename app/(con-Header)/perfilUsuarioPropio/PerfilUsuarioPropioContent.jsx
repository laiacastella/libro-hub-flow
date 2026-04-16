"use client";

import { 
    Estrellas,
    ComponenteBiblioteca,
    Solicitudes,
    Valoraciones, 
    Boton, 
    Contador, 
    EscribirTexto } from "@/components";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";
import useUsuario from "@/hooks/useUsuario";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PerfilUsuarioPropio() {
    
    const usuario = useUsuario();
    const [numLibros, setNumLibros] = useState(0);
    const numSolicitudes = 7;
    const numIntercambios = 23;
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
                    <Image 
                        src={usuario?.foto_perfil || "/perfilUsuario.svg"}
                        alt="perfil" 
                        width={200} 
                        height={200} 
                        className="rounded-circle" 
                        unoptimized 
                    />
                </div>

                <div className={`col-12 col-md-7 ${styles.datos}`}>
                    <EscribirTexto texto={`${usuario?.nombre} ${usuario?.apellidos} (${usuario?.nick_usuario})`} Tipo="h2" velocidad="30" />
                    <EscribirTexto texto={`${usuario?.email}`} Tipo="h3" velocidad="30" />
                    <EscribirTexto texto={`${usuario?.poblacion}, ${usuario?.provincia}`} Tipo="h3" velocidad="30" />
                    <EscribirTexto texto={`${usuario?.codigo_postal}`} Tipo="h3" velocidad="30" />
                    <EscribirTexto texto={`${usuario?.telefono}`} Tipo="h3" velocidad="30" />
                    <div className="d-flex align-items-baseline gap-2">
                        <Contador 
                            valorFinal={numIntercambios}
                            colorInicio="#407c42"
                            colorFin="#000000"
                            duracion="300"
                        />
                        <EscribirTexto 
                            texto="Intercambios completados" 
                            Tipo="h3" 
                            velocidad="30"
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
                                duracion="500"
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
                                duracion="500"
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
                                    valorFinal={`${usuario?.puntuacion_promedio}`} 
                                    colorInicio={colorValoracion.inicio}
                                    colorFin={colorValoracion.fin}
                                    duracion="500"
                                />
                                <Estrellas valoracion={`${usuario?.puntuacion_promedio}`} />
                            </h1>
                            <h2>Valoración media</h2>
                    </div>
                </div>
            </div>

            <div className={`row ${styles.contenido}`}>
                <div className="col-12">
                    {paginaActiva === "biblioteca" && <ComponenteBiblioteca 
                        id_usuario={`${usuario?.id_usuario}`} 
                        setNumLibros={setNumLibros}/>}
                    {paginaActiva === "solicitudes" && <Solicitudes />}
                    {paginaActiva === "valoraciones" && <Valoraciones />}
                </div>
            </div>
        </main>
    );
}
