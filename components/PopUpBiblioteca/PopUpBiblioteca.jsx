import { useState, useEffect } from "react";
import styles from "./PopUpBiblioteca.module.css";
import { ComponenteBiblioteca } from "@/components/index";

const PopUpBiblioteca = ({ isOpen, onClose, intercambio, avanzarEstado }) => {
    const [libroSeleccionado, setLibroSeleccionado] = useState(null);
    const [infoLibro, setInfoLibro] = useState(null);

    console.log("libro seleccionado: ", libroSeleccionado);

    useEffect(() => {
        const fetchLibro = async () => {
            if (libroSeleccionado !== null) {
                try {
                    const res = await fetch(`/api/libros/${libroSeleccionado}`);
                    const data = await res.json();
                    setInfoLibro(data);
                } catch (err) {
                    console.error(err);
                }
            }
        };
        fetchLibro();
    }, [libroSeleccionado]);

    const handleCerrarPopup = async () => {
        if (libroSeleccionado && intercambio) {
            try {
                console.log("Enviando PATCH /libro con:", {
                    id_intercambio: intercambio?.id_intercambio,
                    id_libro_ofrecido: libroSeleccionado?.id_libro,
                });

                await fetch("/api/intercambios/libro", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id_intercambio: intercambio.id_intercambio,
                        id_libro_ofrecido: libroSeleccionado,
                    }),
                });

                // Actualiza localmente
                avanzarEstado(intercambio.id_intercambio, "solicitado"); // para cambiar estado a "seleccionado" en UI
            } catch (error) {
                console.error(error);
                alert("No se pudo seleccionar el libro");
            }
        }
        onClose();
    };

    if (!isOpen || !intercambio) return null;
    return (
        <div className={styles.overlay} onClick={onClose}>
            <dialog className={styles.popup} open onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2>Biblioteca del usuario</h2>
                    <div className={styles.botonesSeleccion}>
                        <button
                            className={styles.botonAceptar}
                            onClick={() => {
                                // avanzarEstado(intercambio.id_intercambio, "seleccionado");
                                handleCerrarPopup();
                                setLibroSeleccionado(null);
                                // setIdIntercambio(intercambio.id_intercambio);
                                onClose();
                            }}>
                            Seleccionar libro
                        </button>
                        <button
                            className={styles.botonAceptar}
                            onClick={() => {
                                avanzarEstado(intercambio.id_intercambio, "seleccionado");
                                // setIdIntercambio(intercambio.id_intercambio);
                                onClose();
                            }}>
                            Aceptar Intercambio
                        </button>
                        <button
                            className={styles.botonRechazar}
                            onClick={() => {
                                avanzarEstado(intercambio.id_intercambio, "rechazado");
                                onClose();
                            }}>
                            Rechazar
                        </button>
                        <button
                            title="Cerrar ventana"
                            className={styles.cerrar}
                            onClick={() => {
                                onClose();
                                setLibroSeleccionado(null);
                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={styles.cerrar}>
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M18 6l-12 12" />
                                <path d="M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <section className={styles.infoIntercambio}>
                    <div>
                        <p>Libro solicitado:</p>
                        <strong>{intercambio.libro_solicitado_titulo}</strong>
                    </div>
                    <p>El intercambio se completará cuando el libro sea seleccionado y aceptes el intercambio.</p>
                </section>
                <section className={styles.bodyPopup}>
                    <div className={styles.bibliotecaContainer}>
                        <div className={styles.buscador}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                <path d="M21 21l-6 -6" />
                            </svg>
                            <input type="text" className={styles.inputBusqueda} placeholder="Buscar libro..." />
                        </div>
                        <ComponenteBiblioteca todos={false} userId={intercambio.id_usuario} setLibroSeleccionado={setLibroSeleccionado} libroSeleccionado={libroSeleccionado} />
                    </div>
                    <div className={styles.infoLibro}>
                        {/* book details */}
                        {infoLibro && (
                            <div className={styles.detailContainer}>
                                <div className={styles.coverWrapper}>
                                    <div className={styles.cover}>
                                        <img alt="Selected Cover" className={styles.coverImg} src={infoLibro?.foto_portada} />
                                    </div>
                                </div>

                                <div className={styles.detailContent}>
                                    <div className={styles.titleBlock}>
                                        <h2 className={styles.title}>{infoLibro?.titulo}</h2>
                                        <p className={styles.author}>{infoLibro?.autor}</p>
                                        <p className={styles.year}>Subido el {new Date(infoLibro?.fecha_publicacion).toLocaleDateString()}</p>
                                    </div>

                                    <div className={styles.synopsis}>
                                        <h3 className={styles.synopsisTitle}>Descripción</h3>
                                        <p className={styles.description}>{infoLibro?.descripcion || "No hay descripción disponible"}</p>
                                    </div>

                                    <div className={styles.infoGrid}>
                                        <div className={styles.infoCard}>
                                            <p className={styles.infoLabel}>Estado</p>
                                            <p className={styles.infoValue}>{infoLibro?.estado_fisico || "-"}</p>
                                        </div>

                                        <div className={styles.infoCard}>
                                            <p className={styles.infoLabel}>Categoría</p>
                                            <p className={styles.infoValue}>{infoLibro?.tipo_genero || "-"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* empty state */}
                        {infoLibro === null && (
                            <div className={styles.emptyState}>
                                <div className={styles.cover}>
                                    <div className={styles.emptyCover}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.libroIcono}>
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M5 5a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -14" />
                                            <path d="M9 5a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -14" />
                                            <path d="M5 8h4" />
                                            <path d="M9 16h4" />
                                            <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041" />
                                            <path d="M14 9l4 -1" />
                                            <path d="M16 16l3.923 -.98" />
                                        </svg>
                                    </div>
                                </div>
                                <p className={styles.emptyText}>Selecciona un libro para ver su información</p>
                            </div>
                        )}
                    </div>
                </section>
            </dialog>
        </div>
    );
};

export default PopUpBiblioteca;
