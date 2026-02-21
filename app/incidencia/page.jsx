"use client";
import styles from "./incidencia.module.css";
import { Header, Footer, FormIncidencia, Enlaces } from "@/components";
import { ChevronRight } from "lucide-react";

export default function Incidencia() {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                <nav className={styles.breadcrumbs}>
                    <Enlaces nomEnlace="Perfil" ruta="/PerfilUsuarioPropio" />
                    <ChevronRight size={15} color="#333" />
                    <span className={styles.currentPath}>Reportar una Incidencia</span>
                </nav>

                <div className={styles.titleSection}>
                    <h1 className={styles.title}>Reportar una Incidencia</h1>
                    <p className={styles.subtitle}>Describe el problema que estás experimentando. Nuestro equipo técnico revisará tu reporte y te contactará a la brevedad.</p>
                </div>
                <FormIncidencia />
            </main>
            {/* <Footer /> */}
        </div>
    );
}
