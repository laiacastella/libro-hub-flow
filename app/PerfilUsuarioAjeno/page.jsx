"use client";

import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/page.jsx";
import Estrellas from "@/components/Estrellas/page.jsx";
import Biblioteca from "@/components/Biblioteca/page.jsx";
import Intercambios from "@/components/Intercambios/page.jsx";
import Valoraciones from "@/components/Valoraciones/page.jsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";

export default function PerfilUsuarioPropio() {
    const router = useRouter();
    const valoracion = 4.5;
    const [paginaActiva, setPaginaActiva] = useState("biblioteca");

    return (
        <>
            <Header />

            <main>
                <div className={styles.fondo}>
                    <div className={styles.perfil}>
                        <div className={styles.foto}>
                            <img src="/perfilUsuario.svg" className={styles.fotoPerfil} alt="perfilUsuario" />
                        </div>
                        <div className={styles.datos}>
                            <h2>Nombre de usuario</h2>
                            <h3>Ciudad, Provincia</h3>
                        </div>
                    </div>

                    <div className={styles.navegacion}>
                        <div className={styles.paginas} onClick={() => setPaginaActiva("biblioteca")}>
                            <h1>15</h1>
                            <h2>Libros disponibles</h2>
                        </div>

                        <div className={styles.paginas} onClick={() => setPaginaActiva("intercambios")}>
                            <h1>23</h1>
                            <h2>Intercambios completados</h2>
                        </div>

                        <div className={styles.paginas} onClick={() => setPaginaActiva("valoraciones")}>
                            <h1>
                                {valoracion} <Estrellas valoracion={valoracion} />
                            </h1>
                            <h2>Valoración media</h2>
                        </div>
                    </div>

                    <div className={styles.contenido}>
                        {paginaActiva === "biblioteca" && <Biblioteca />}
                        {paginaActiva === "intercambios" && <Intercambios />}
                        {paginaActiva === "valoraciones" && <Valoraciones />}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
