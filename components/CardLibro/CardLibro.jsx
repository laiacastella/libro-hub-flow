import { useState, useEffect } from "react";
import { Paginacion } from "@/components";
import styles from "./CardLibro.module.css";

export default function CardLibro({ setLibroSeleccionado, libroSeleccionado }) {
    const [libros, setLibros] = useState([]);
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

    const manejarErrorImagen = (e) => {
        if (!e.target.dataset.tried) {
            e.target.dataset.tried = "true";
            e.target.src = "https://via.placeholder.com/150x200?text=Sin+Portada";
        }
    };

    return (
        <div className={styles.biblioteca}>
            <div className={styles.libros}>
                {libros.map((libro) => (
                    <div
                        key={libro.id_libro}
                        className={`${styles.libroCard} ${libro.id_libro === libroSeleccionado ? styles.seleccionado : ""}`}
                        onClick={() => {
                            setLibroSeleccionado?.(libro.id_libro);
                        }}>
                        <img src={libro.foto_portada || "https://via.placeholder.com/150x200?text=Sin+Portada"} alt={libro.titulo} className={styles.libroImage} onError={manejarErrorImagen} />
                        <h2 className={styles.libroTitulo}>{libro.titulo}</h2>
                        <p className={styles.libroAutor}>{libro.autor}</p>
                    </div>
                ))}
            </div>

            <div className={styles.paginacion}>
                <Paginacion paginaActual={paginaActual} totalPaginas={totalPaginas} onPageChange={setPaginaActual} />
            </div>
        </div>
    );
}
