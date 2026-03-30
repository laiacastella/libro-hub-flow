"use client";
import { ComponenteBiblioteca } from "@/components/index.js";
import styles from "./biblioteca.module.css";

export default function PaginaPrincipal() {
    return (
        <div className={styles.envoltorio}>
            <main className={styles.contenedorBiblioteca}>
                <ComponenteBiblioteca />
            </main>
        </div>
    );
}
