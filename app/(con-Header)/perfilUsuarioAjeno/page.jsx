"use client";

import { Header, Footer, Estrellas, ComponenteBiblioteca, Valoraciones } from "@/components";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";

export default function PerfilUsuarioAjeno() {
    const router = useRouter();
    const valoracion = 4.5;
    const [paginaActiva, setPaginaActiva] = useState("biblioteca");

    return (
        <>
            <main>
                <div className={styles.fondo}>
                    <div className={styles.perfil}>
                        <div className={styles.foto}>
                            <img src="/perfilUsuario.svg" className={styles.fotoPerfil} alt="perfilUsuario" />
                        </div>
                        <div className={styles.datos}>
                            <h2>Nombre de usuario</h2>
                            <h3>Ciudad, Provincia</h3>
                            <h3>23 Intercambios completados</h3>
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
                        {paginaActiva === "valoraciones" && <Valoraciones />}
                    </div>
                </div>
            </main>
        </>
    );
}
