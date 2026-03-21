"use client";
import styles from "./ComponenteBiblioteca.module.css";
import { CardLibro, BarraBusqueda, Paginacion } from "@/components";
import { useState, useEffect } from "react";

export default function ComponenteBiblioteca({ setLibroSeleccionado, libroSeleccionado, modoPopup = false, mostrarDetalleInline = false, detalleInline = null }) {
    const [libros, setLibros] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    const librosPorPagina = 6;

    const actualizarFiltro = (nuevoFiltro) => {
        setPaginaActual(1);
        setFiltro(nuevoFiltro);
    };

    useEffect(() => {
        fetch(`/api/libros?page=${paginaActual}&limit=${librosPorPagina}&search=${filtro}`)
            .then((res) => res.json())
            .then((data) => {
                setLibros(data.data);
                setTotalPaginas(data.totalPaginas);
            })
            .catch((err) => console.error("Error final:", err));
    }, [paginaActual, filtro]);

    console.log("texto búsqueda", filtro);
    return (
        <div className={styles.biblioteca}>
            <BarraBusqueda alBuscar={actualizarFiltro} setFiltro={actualizarFiltro} />
            <CardLibro librosFiltrados={libros} setLibroSeleccionado={setLibroSeleccionado} libroSeleccionado={libroSeleccionado} dosColumnasMovil={modoPopup} mostrarDetalleInline={mostrarDetalleInline} detalleInline={detalleInline} />

            <div className={styles.paginacion}>{totalPaginas > 1 && <Paginacion paginaActual={paginaActual} totalPaginas={totalPaginas} onPageChange={setPaginaActual} />}</div>

            {filtro && filtro.trim().length > 0 && (
                <div className={styles.contenedorBotonFinal}>
                    <button
                        className={styles.botonVolverFinal}
                        onClick={() => {
                            actualizarFiltro("");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}>
                        MOSTRAR TODOS LOS LIBROS
                    </button>
                </div>
            )}

            {libros.length === 0 && <p className={styles.mensaje}>No hay libros disponibles que coincidan con la búsqueda.</p>}
        </div>
    );
}
