"use client";
import { ComponenteBiblioteca } from "@/components/index.js";
import estilos from "./biblioteca.module.css";

export default function PaginaPrincipal() {
    return (
        <div className={estilos.envoltorio}>
            <main className={estilos.contenedorBiblioteca}>
                <ComponenteBiblioteca />
            </main>
        </div>
    );
}
