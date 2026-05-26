"use client";
import { ComponenteBiblioteca } from "@/components/index.js";
import styles from "./biblioteca.module.css";

export default function PaginaPrincipal() {
    return (
        <div className={styles.envoltorio}>
            <main className={styles.contenedorBiblioteca}>
                <div className={styles.textoMarketing}>
                    <h1 className={styles.tituloMarketing}>Explora, descubre y comparte</h1>
                    <p className={styles.subtituloMarketing}>Cada libro es una puerta a un mundo nuevo. ¿Cuál abrirás hoy?</p>
                </div>
                <ComponenteBiblioteca />
            </main>
        </div>
    );
}
