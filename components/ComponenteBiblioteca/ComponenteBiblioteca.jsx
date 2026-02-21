import styles from "./ComponenteBiblioteca.module.css";
import { CardLibro, BarraBusqueda, Paginacion } from "@/components";
import { useState, useEffect } from "react";

export default function ComponenteBiblioteca({ setLibroSeleccionado, libroSeleccionado }) {
    const [libros, setLibros] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    const librosPorPagina = 6;

    useEffect(() => {
        fetch(`/api/libros?page=${paginaActual}&limit=${librosPorPagina}`)
            .then((res) => res.json())
            .then((data) => {
                setLibros(data.data);
                setTotalPaginas(data.totalPaginas);
            })
            .catch((err) => console.error("Error final:", err));
    }, [paginaActual]);

    const librosFiltrados = libros.filter((libro) => {
        const terminoBusqueda = filtro.toLowerCase().trim();

        if (!terminoBusqueda) return true;

        const titulo = (libro.titulo || "").toLowerCase();
        const autor = (libro.autor || "").toLowerCase();
        return titulo.includes(terminoBusqueda) || autor.includes(terminoBusqueda);
    });

    console.log("texto búsqueda", filtro);
    return (
        <div className={styles.biblioteca}>
            <BarraBusqueda alBuscar={(texto) => setFiltro(texto)} setFiltro={setFiltro} />
            <CardLibro librosFiltrados={librosFiltrados} setLibroSeleccionado={setLibroSeleccionado} libroSeleccionado={libroSeleccionado} />
            <div className={styles.paginacion}>
                <Paginacion paginaActual={paginaActual} totalPaginas={totalPaginas} onPageChange={setPaginaActual} />
            </div>

            {filtro && filtro.trim().length > 0 && (
                <div className={styles.contenedorBotonFinal}>
                    <button
                        className={styles.botonVolverFinal}
                        onClick={() => {
                            setFiltro("");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}>
                        MOSTRAR TODOS LOS LIBROS
                    </button>
                </div>
            )}

            {librosFiltrados.length === 0 && <p className={styles.mensaje}>No hay libros disponibles que coincidan con la búsqueda.</p>}
        </div>
    );
}
