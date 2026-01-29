"use client";

import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer.jsx";
import Estrellas from "@/components/Estrellas/Estrellas.jsx";
import Biblioteca from "@/components/Biblioteca/Biblioteca.jsx";
import Solicitudes from "@/components/Solicitudes/Solicitudes.jsx";
import Intercambios from "@/components/Intercambios/Intercambios.jsx";
import Valoraciones from "@/components/Valoraciones/Valoraciones.jsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export default function PerfilUsuarioPropio() {
    const router = useRouter();
    const valoracion = 2.5;
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab");

    const [paginaActiva, setPaginaActiva] = useState(tab || "biblioteca");

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
                            <h2>Nombre Apellidos (Nombre de usuario)</h2>
                            <h3>Ciudad, Provincia</h3>
                            <h3>Correo electrónico</h3>
                            <h3>Número de teléfono</h3>
                        </div>
                        <div className={styles.editarDatos}>
                            <button className={styles.botonEditar} onClick={() => router.push("/EditarCuenta")}>
                                Editar datos
                            </button>
                        </div>
                    </div>

                    <div className={styles.navegacion}>
                        <div className={styles.paginas} onClick={() => setPaginaActiva("biblioteca")}>
                            <h1>15</h1>
                            <h2>Libros disponibles</h2>
                        </div>

                        <div className={styles.paginas} onClick={() => setPaginaActiva("solicitudes")}>
                            <h1>7</h1>
                            <h2>Solicitudes de intercambio</h2>
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
                        {paginaActiva === "solicitudes" && <Solicitudes />}
                        {paginaActiva === "intercambios" && <Intercambios />}
                        {paginaActiva === "valoraciones" && <Valoraciones />}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}