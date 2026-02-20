"use client";
import { ComponenteBiblioteca } from "@/components/index.js";
import estilos from "./biblioteca.module.css";

export default function PaginaPrincipal() {
    return (
        <div className={estilos.envoltorio}>
            <main className={estilos.contenedorBiblioteca}>
                <ComponenteBiblioteca />
                {/* 
                {filtro && filtro.trim().length > 0 && (
                    <div className={estilos.contenedorBotonFinal}>
                        <button
                            className={estilos.botonVolverFinal}
                            onClick={() => {
                                setFiltro("");
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}>
                            MOSTRAR TODOS LOS LIBROS
                        </button>
                    </div>
                )} */}

                {/* {librosFiltrados.length === 0 && <p className={estilos.mensaje}>No hay libros disponibles que coincidan con la búsqueda.</p>} */}
            </main>
        </div>
    );
}
