"use client";
import { Estrellas, ComponenteBiblioteca, Solicitudes, Valoraciones, Boton } from "@/components";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";

export default function PerfilUsuarioPropio() {
    
    const valoracion = 3.0;
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab");

    const [paginaActiva, setPaginaActiva] = useState(tab || "biblioteca");

    return (
        <>
            <main>
                <div className={styles.fondo}>
                    <div className={styles.perfil}>
                        <div className={styles.foto}>
                            <img src="/perfilUsuario.svg" className={styles.fotoPerfil} alt="perfilUsuario" />
                        </div>

                        <div className={styles.datos}>
                            <h2>Nombre Apellidos (Nombre de usuario)</h2>
                            <h3>Ciudad, Provincia</h3>
                            <h3>Correo electrónico</h3>
                            <h3>Número de teléfono</h3>
                            <h3>23 Intercambios completados</h3>
                        </div>

                        <div className={styles.editarDatos}>
                            <Boton type="button" texto="Editar datos de la cuenta" enlace="editarCuenta" />
                        </div>
                    </div>

                    <div className={styles.navegacion}>
                        <div
                            tabIndex={0}
                            className={`${styles.paginas}
                        ${paginaActiva === "biblioteca" ? styles.activo : ""}`}
                            onClick={() => setPaginaActiva("biblioteca")}>
                            <h1>15</h1>
                            <h2>Libros disponibles</h2>
                        </div>

                        <div
                            tabIndex={0}
                            className={`${styles.paginas}
                        ${paginaActiva === "solicitudes" ? styles.activo : ""}`}
                            onClick={() => setPaginaActiva("solicitudes")}>
                            <h1>7</h1>
                            <h2>Solicitudes de intercambio</h2>
                        </div>

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

                    <div className={styles.contenido}>
                        {paginaActiva === "biblioteca" && <ComponenteBiblioteca />}
                        {paginaActiva === "solicitudes" && <Solicitudes />}
                        {paginaActiva === "valoraciones" && <Valoraciones />}
                    </div>
                </div>
            </main>
        </>
    );
}
