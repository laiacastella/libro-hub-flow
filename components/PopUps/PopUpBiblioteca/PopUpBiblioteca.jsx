"use client";
import { useState, useEffect } from "react";
import styles from "./PopUpBiblioteca.module.css";
import { Boton, ComponenteBiblioteca } from "@/components/index";
import { X } from "lucide-react";
import useEsMovil from "@/hooks/useEsMovil";

const PopUpBiblioteca = ({ isOpen, onClose, intercambio, avanzarEstado }) => {
    const [libroSeleccionado, setLibroSeleccionado] = useState(null);
    const [infoLibro, setInfoLibro] = useState(null);
    const esMovil = useEsMovil();

    console.log("libro seleccionado: ", libroSeleccionado);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
    }, [isOpen]);

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

    useEffect(() => {
        if (!isOpen) {
            setLibroSeleccionado(null);
            setInfoLibro(null);
            return;
        }

        if (intercambio?.id_libro_ofrecido) {
            setLibroSeleccionado(intercambio.id_libro_ofrecido);
        }
    }, [isOpen, intercambio]);

    const guardarLibroSeleccionado = async (idLibroDesdeBoton = null) => {
        if (!intercambio) return false;

        const idLibroSeleccionado = idLibroDesdeBoton || libroSeleccionado || intercambio.id_libro_ofrecido;
        if (!idLibroSeleccionado) {
            alert("Selecciona un libro antes de continuar");
            return false;
        }

        try {
            const response = await fetch("/api/intercambios/libro", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_intercambio: intercambio.id_intercambio,
                    id_libro_ofrecido: idLibroSeleccionado,
                }),
            });

            if (!response.ok) {
                throw new Error("No se pudo guardar el libro seleccionado");
            }

            await avanzarEstado(intercambio.id_intercambio, "solicitado");
            return true;
        } catch (error) {
            console.error(error);
            alert("No se pudo seleccionar el libro");
            return false;
        }
    };

    const handleAceptarIntercambio = async () => {
        const hayLibroGuardado = Boolean(intercambio?.id_libro_ofrecido || intercambio?.libro_ofrecido_titulo);

        if (!hayLibroGuardado && !libroSeleccionado) {
            alert("Selecciona un libro antes de aceptar el intercambio");
            return;
        }

        if (!hayLibroGuardado && libroSeleccionado) {
            const guardado = await guardarLibroSeleccionado();
            if (!guardado) return;
        }

        await avanzarEstado(intercambio.id_intercambio, "seleccionado");
        onClose();
    };

    const handleSeleccionarLibroDesdeCard = async (idLibro) => {
        setLibroSeleccionado(idLibro);
        const guardado = await guardarLibroSeleccionado(idLibro);
        if (guardado) onClose();
    };

    if (!isOpen || !intercambio) return null;
    return (
        <div className={styles.overlay} onClick={onClose}>
            <dialog className={styles.popup} open onClick={(e) => e.stopPropagation()}>
                {!esMovil ? (
                    <>
                        <div className={styles.header}>
                            <h2>Biblioteca del usuario</h2>
                            <div className={styles.botonesSeleccion}>
                                <Boton texto="Aceptar intercambio" variant="default" onClick={handleAceptarIntercambio} />
                                <Boton
                                    texto="Rechazar"
                                    variant="red"
                                    onClick={() => {
                                        avanzarEstado(intercambio.id_intercambio, "rechazado");
                                        onClose();
                                    }}
                                />
                                <Boton
                                    texto={<X />}
                                    variant="cerrar"
                                    title="Cerrar ventana"
                                    onClick={() => {
                                        onClose();
                                        setLibroSeleccionado(null);
                                    }}
                                />
                            </div>
                        </div>
                        <section className={styles.infoIntercambio}>
                            <div>
                                <p>Libro solicitado:</p>
                                <img className={styles.libroSolicitadoImg} src={intercambio.libro_solicitado_foto || "https://via.placeholder.com/60x90?text=Sin+Portada"} alt={intercambio.libro_solicitado_titulo || "Portada del libro solicitado"} />
                                <div className={styles.libroSolicitadoTexto}>
                                    <strong>{intercambio.libro_solicitado_titulo}</strong>
                                    <p className={styles.libroSolicitadoAutor}>{intercambio.libro_solicitado_autor}</p>
                                </div>
                            </div>

                            <p>El intercambio se completará cuando el libro sea seleccionado y aceptes el intercambio.</p>
                        </section>
                        <section className={styles.bodyPopup}>
                            <div className={styles.bibliotecaContainer}>
                                <ComponenteBiblioteca todos={false} userId={intercambio.id_usuario} setLibroSeleccionado={setLibroSeleccionado} libroSeleccionado={libroSeleccionado} modoPopup={true} onSeleccionarLibro={handleSeleccionarLibroDesdeCard} />
                            </div>
                            <div className={`${styles.infoLibro} ${libroSeleccionado ? styles.isOpen : styles.isClosed}`}>
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
                    </>
                ) : (
                    <>
                        <div className={styles.headerMobile}>
                            <h2>Biblioteca del usuario</h2>
                            <Boton
                                texto={<X />}
                                variant="cerrar"
                                title="Cerrar ventana"
                                onClick={() => {
                                    onClose();
                                    setLibroSeleccionado(null);
                                }}
                            />
                        </div>

                        <section className={styles.infoIntercambioMobile}>
                            <div>
                                <p>Intercambio:</p>
                                <img className={styles.libroSolicitadoImg} src={intercambio.libro_solicitado_foto || "https://via.placeholder.com/60x90?text=Sin+Portada"} alt={intercambio.libro_solicitado_titulo || "Portada del libro solicitado"} />
                                <div className={styles.libroSolicitadoTexto}>
                                    <strong>{intercambio.libro_solicitado_titulo}</strong>
                                    <p className={styles.libroSolicitadoAutor}>{intercambio.libro_solicitado_autor}</p>
                                </div>
                            </div>
                        </section>

                        <section className={styles.bodyPopupMobile}>
                            <div className={styles.bibliotecaContainerMobile}>
                                <ComponenteBiblioteca
                                    todos={false}
                                    userId={intercambio.id_usuario}
                                    setLibroSeleccionado={setLibroSeleccionado}
                                    libroSeleccionado={libroSeleccionado}
                                    modoPopup={true}
                                    onSeleccionarLibro={handleSeleccionarLibroDesdeCard}
                                    mostrarDetalleInline={Boolean(libroSeleccionado)}
                                    detalleInline={
                                        infoLibro ? (
                                            <div className={styles.detailInlineMobile}>
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
                                        ) : (
                                            <p className={styles.emptyTextMobile}>Cargando información del libro...</p>
                                        )
                                    }
                                />
                            </div>
                        </section>

                        <div className={styles.botonesSeleccionMobile}>
                            <Boton texto="Aceptar intercambio" variant="default" onClick={handleAceptarIntercambio} />
                            <Boton
                                texto="Rechazar"
                                variant="red"
                                onClick={() => {
                                    avanzarEstado(intercambio.id_intercambio, "rechazado");
                                    onClose();
                                }}
                            />
                        </div>
                    </>
                )}
            </dialog>
        </div>
    );
};

export default PopUpBiblioteca;
