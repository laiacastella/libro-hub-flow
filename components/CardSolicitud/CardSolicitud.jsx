import styles from "./CardSolicitud.module.css";
import { useEffect, useState } from "react";

export default function CardSolicitud() {
    const [intercambios, setIntercambios] = useState([]);
    const [verBibliotecaIds, setVerBibliotecaIds] = useState([]); // IDs de intercambios que muestran biblioteca

    useEffect(() => {
        fetch("/api/intercambios")
            .then((res) => res.json())
            .then((data) => {
                const intercambiosMapeados = data.map((item) => ({
                    ...item,
                    libroPropio: {
                        titulo: item.libro_solicitado_titulo,
                        autor: item.libro_solicitado_autor,
                        imagen: item.libro_solicitado_foto,
                    },
                    libroIntercambio: item.id_libro_ofrecido
                        ? {
                              titulo: item.libro_ofrecido_titulo,
                              autor: item.libro_ofrecido_autor,
                              imagen: item.libro_ofrecido_foto,
                          }
                        : null,
                    confirmar: item.estado_solicitud === "Pendiente",
                }));
                setIntercambios(intercambiosMapeados);
            });
    }, []);

    const toggleBiblioteca = (id) => {
        setVerBibliotecaIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    };

    return (
        <>
            {intercambios.map((solicitud) => {
                const verBiblioteca = verBibliotecaIds.includes(solicitud.id_intercambio);

                return (
                    <div key={solicitud.id_intercambio} className={styles.solicitudCard}>
                        <div className={styles.librosContainer}>
                            {/* Libro propio */}
                            <div className={styles.libro}>
                                <img src={solicitud.libroPropio.imagen} alt={solicitud.libroPropio.titulo} className={styles.libroImagen} loading="lazy" />
                                <p className={styles.libroTitulo}>{solicitud.libroPropio.titulo}</p>
                            </div>

                            {/* Icono intercambio */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.intercambioIcono} aria-hidden="true">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M20 10h-16l5.5 -6" />
                                <path d="M4 14h16l-5.5 6" />
                            </svg>

                            {/* Libro intercambio */}
                            <div className={styles.libro}>
                                {solicitud.libroIntercambio ? (
                                    <>
                                        <img src={solicitud.libroIntercambio.imagen} alt={solicitud.libroIntercambio.titulo} className={styles.libroImagen} loading="lazy" />
                                        <p className={styles.libroTitulo}>{solicitud.libroIntercambio.titulo}</p>
                                    </>
                                ) : (
                                    <div className={styles.libroImagen}>—</div>
                                )}
                            </div>
                        </div>

                        <button className={styles.boton} onClick={() => toggleBiblioteca(solicitud.id_intercambio)}>
                            {verBiblioteca ? "Ocultar biblioteca" : "Ver biblioteca"}
                        </button>

                        {solicitud.confirmar && <button className={styles.boton}>Confirmar intercambio</button>}
                    </div>
                );
            })}
        </>
    );
}
