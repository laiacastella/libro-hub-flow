import styles from "./CardSolicitud.module.css";
import data from "@/data/solicitudes.json";

const solicitudes = data.solicitudes;

export default function CardSolicitud() {
    return (
        <>
            {solicitudes.map((solicitud) => (
                <div key={solicitud.id} className={styles.solicitudCard}>
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
                            {!solicitud.estado.verBiblioteca ? (
                                <>
                                    <img src={solicitud.libroIntercambio.imagen} alt={solicitud.libroIntercambio.titulo} className={styles.libroImagen} loading="lazy" />
                                    <p className={styles.libroTitulo}>{solicitud.libroIntercambio.titulo}</p>
                                </>
                            ) : (
                                <div className={styles.libroImagen}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={styles.libroIcono}>
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M5 5a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                                        <path d="M9 5a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                                        <path d="M5 8h4" />
                                        <path d="M9 16h4" />
                                        <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041" />
                                        <path d="M14 9l4 -1" />
                                        <path d="M16 16l3.923 -.98" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    {solicitud.estado.verBiblioteca && (
                        <button className={styles.boton} type="button">
                            Ver biblioteca
                        </button>
                    )}

                    {solicitud.estado.confirmar && (
                        <button className={styles.boton} type="button">
                            Confirmar intercambio
                        </button>
                    )}
                </div>
            ))}
        </>
    );
}