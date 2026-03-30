"use client";
import styles from "./ComponenteBiblioteca.module.css";
import { CardLibro, BarraBusqueda, Paginacion, ItemsPorPagina } from "@/components";
import { useState, useEffect, useCallback  } from "react";

export default function ComponenteBiblioteca({ 
    setLibroSeleccionado,
    libroSeleccionado,
    modoPopup = false,
    mostrarDetalleInline = false,
    detalleInline = null,
    onSeleccionarLibro = null,
    id_usuario
}) {
    const [libros, setLibros] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    const [librosPorPagina, setLibrosPorPagina] = useState(10);

    const actualizarFiltro = useCallback((nuevoFiltro) => {
        setPaginaActual(1);
        setFiltro(nuevoFiltro);
    }, []);

    useEffect(() => {
    const url = `/api/libros?page=${paginaActual}&limit=${librosPorPagina}&search=${filtro}${
        id_usuario ? `&user=${id_usuario}` : ""
    }`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log("DATA:", data);
            setLibros(data.data);
            setTotalPaginas(data.totalPaginas);
        })
        .catch((err) => console.error("Error final:", err));

}, [paginaActual, filtro, id_usuario, librosPorPagina]);

    console.log("texto búsqueda", filtro);
    return (
        <div className={styles.biblioteca}>
            <BarraBusqueda alBuscar={actualizarFiltro} />
            <CardLibro
                librosFiltrados={libros}
                setLibroSeleccionado={setLibroSeleccionado}
                libroSeleccionado={libroSeleccionado}
                dosColumnasMovil={modoPopup}
                mostrarDetalleInline={mostrarDetalleInline}
                detalleInline={detalleInline}
                mostrarBotonSeleccion={modoPopup}
                onSeleccionarLibro={onSeleccionarLibro}
            />

            <div className={styles.itemsPaginacion}>
                <div className={styles.porPagina}>
                    <ItemsPorPagina
                        id="libros-por-pagina"
                        nombre="libros-por-pagina"
                        label="Libros por página:"
                        value={librosPorPagina}
                        opciones={[
                            { value: 6, label: "6" },
                            { value: 8, label: "8" },
                            { value: 10, label: "10" },
                            { value: 12, label: "12" },
                            { value: 14, label: "14" },
                            { value: 16, label: "16" },
                            { value: 18, label: "18" },
                            { value: 20, label: "20" },
                        ]}
                        onChange={(nuevoValor) => {
                            setLibrosPorPagina(nuevoValor);
                            setPaginaActual(1);
                        }}
                    />
                </div>

                <div className={styles.paginacion}>
                    {totalPaginas > 1 && <Paginacion paginaActual={paginaActual} totalPaginas={totalPaginas} onPageChange={setPaginaActual} />}
                </div>
            </div>

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
