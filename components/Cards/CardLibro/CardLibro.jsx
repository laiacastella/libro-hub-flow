"use client"
import Image from "next/image";
import styles from "./CardLibro.module.css";
import { useRouter } from "next/navigation";

export default function CardLibro({ setLibroSeleccionado, libroSeleccionado, librosFiltrados, dosColumnasMovil = false, mostrarDetalleInline = false, detalleInline = null, mostrarBotonSeleccion = false, onSeleccionarLibro = null }) {
    
    const router = useRouter();
    
    const manejarErrorImagen = (e) => {
        if (!e.target.dataset.tried) {
            e.target.dataset.tried = "true";
            e.target.src = "https://via.placeholder.com/150x200?text=Sin+Portada";
        }
    };

    console.log("libros filtrados: ", librosFiltrados);

    const indiceSeleccionado = librosFiltrados.findIndex((libro) => libro.id_libro === libroSeleccionado);
    const filaSeleccionada = indiceSeleccionado === -1 ? -1 : Math.floor(indiceSeleccionado / 2);
    const indiceInsercionDetalle = filaSeleccionada === -1 ? -1 : Math.min(filaSeleccionada * 2 + 1, librosFiltrados.length - 1);

   

    return (
        <div className={styles.biblioteca}>
            <div className={`${styles.libros} ${dosColumnasMovil ? styles.librosPopup : ""}`}>
                {librosFiltrados.map((libro, index) => (
                    <div key={libro.id_libro} className={styles.libroCardWrapper}>
                        <div
                            className={`${styles.libroCard} ${libro.id_libro === libroSeleccionado ? styles.seleccionado : ""}`}
                            onClick={() => {
                                
                                router.push(`/biblioteca/${libro.id_libro}`);
                            }}>
                            <Image src={libro.foto_portada || "https://via.placeholder.com/150x200?text=Sin+Portada"} alt={libro.titulo || "Sin Portada"} className={styles.libroImage} width={150} height={200} onError={manejarErrorImagen} unoptimized={libro.foto_portada?.startsWith("http") ? true : false} />
                            <p className={styles.libroTitulo}>{libro.titulo}</p>
                            <p className={styles.libroAutor}>{libro.autor}</p>
                            {mostrarBotonSeleccion && (
                                <button
                                    type="button"
                                    className={styles.botonSeleccionar}
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        setLibroSeleccionado?.(libro.id_libro);

                                        if (onSeleccionarLibro) {
                                            await onSeleccionarLibro(libro.id_libro);
                                        }
                                    }}>
                                    Seleccionar libro
                                </button>
                            )}
                        </div>

                        {mostrarDetalleInline && detalleInline && index === indiceInsercionDetalle && <div className={styles.detalleInlineRow}>{detalleInline}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}
