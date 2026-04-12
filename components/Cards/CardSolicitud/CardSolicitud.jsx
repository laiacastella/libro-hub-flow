"use client";
import styles from "./CardSolicitud.module.css";
import { PopUpBiblioteca, Boton } from "@/components/index";
import PopUpValoracion from "@/components/PopUps/PopUpValoracion/PopUpValoracion";
import { SquarePlus, Trash2, ArrowLeftRight } from "lucide-react";

import { useEffect, useState } from "react";

export default function CardSolicitud({ filtro = "recibidas", idUsuario }) {
    // Estados para controlar el popup y el intercambio activo
    const [open, setOpen] = useState(false);
    const [intercambioActivo, setIntercambioActivo] = useState(null);
    const [openValoracion, setOpenValoracion] = useState(false);
    const [intercambioValoracion, setIntercambioValoracion] = useState(null);

    const [intercambios, setIntercambios] = useState([]); // todos intercambios
    // Definimos el flujo de estados para cada acción
    const flujoEstados = {
        solicitado: "seleccionado",
        seleccionado: "aceptado",
        aceptado: "valorar",
        rechazado: "finalizado",
        valorar: "finalizado",
        finalizado: "eliminado",
        eliminado: null,
    };
    // Etiquetas para cada estado del botón
    const etiquetasBoton = {
        solicitado: "Ver biblioteca",
        seleccionado: "Aceptar o rechazar",
        aceptado: "Confirmar entrega",
        rechazado: "Rechazado",
        valorar: "Valorar",
        finalizado: "Intercambio completado",
        eliminado: "Eliminado",
    };

    // Cargar intercambios
    useEffect(() => {
        fetch("/api/intercambios")
            .then((res) => res.json())
            .then((data) => setIntercambios(data));
    }, [open]); // recarga al cerrar el popup para reflejar cambios

    // Avanzar al siguiente estado
    async function avanzarEstado(id, estadoActual) {
        const siguienteEstado = flujoEstados[estadoActual];
        if (!siguienteEstado) return;

        // Actualizar en la api
        await fetch("/api/intercambios/estado", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_intercambio: id, estado: siguienteEstado }),
        });

        // Actualizar visualmente
        setIntercambios((prev) => prev.map((i) => (i.id_intercambio === id ? { ...i, estado_solicitud: siguienteEstado } : i)));
    }

    // Eliminar visualmente (solo cuando sea finalizado)
    async function eliminarIntercambio(id) {
        console.log("Eliminando intercambio con id:", id);
        const confirmacion = confirm("¿Estás seguro de eliminar este intercambio?");
        if (!confirmacion) return;
        await fetch("/api/intercambios", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_intercambio: id, estado: "eliminado" }),
        });

        setIntercambios((prev) => prev.filter((i) => i.id_intercambio !== id));
        avanzarEstado(id, "finalizado"); // para eliminarlo de la UI
    }

    // Función para abrir el popup con el intercambio activo
    function abrirPopup(intercambio) {
        setIntercambioActivo(intercambio);
        setOpen(true);
    }
    // Función para cerrar el popup
    function cerrarPopup() {
        setOpen(false);
    }

    function abrirPopupValoracion(intercambio) {
        setIntercambioValoracion(intercambio);
        setOpenValoracion(true);
    }

    function cerrarPopupValoracion() {
        setOpenValoracion(false);
        setIntercambioValoracion(null);
    }

    async function manejarValoracionGuardada(idIntercambio) {
        await avanzarEstado(idIntercambio, "valorar");
        cerrarPopupValoracion();
    }

    const idUsuarioNumero = Number(idUsuario);
    const intercambiosFiltrados = intercambios.filter((intercambio) => {
        if (!idUsuarioNumero) return false;

        const esPropietario = Number(intercambio.id_usuario_propietario) === idUsuarioNumero;
        const esSolicitante = Number(intercambio.id_usuario_solicitante) === idUsuarioNumero;

        if (filtro === "recibidas") return esPropietario;
        if (filtro === "realizadas") return esSolicitante;
        if (filtro === "historial") return esPropietario || esSolicitante;

        return false;
    });

    return (
        <>
            {intercambiosFiltrados.map((intercambio) => (
                <div key={intercambio.id_intercambio} className={styles.solicitudCard}>
                    <div className={styles.librosContainer}>
                        {/* Libro solicitado */}
                        <div className={styles.libro}>
                            <img src={intercambio.libro_solicitado_foto} alt={intercambio.libro_solicitado_titulo} className={styles.libroImagen} loading="lazy" />
                            <p className={styles.libroTitulo}>{intercambio.libro_solicitado_titulo}</p>
                        </div>
                        <ArrowLeftRight className={styles.intercambioIcono} />

                        {/* Libro ofrecido */}
                        <div className={styles.libro}>
                            {intercambio.libro_ofrecido_titulo ? (
                                <>
                                    <img src={intercambio.libro_ofrecido_foto} alt={intercambio.libro_ofrecido_titulo} className={styles.libroImagen} loading="lazy" />
                                    <p className={styles.libroTitulo}>{intercambio.libro_ofrecido_titulo}</p>
                                </>
                            ) : (
                                <>
                                    <div className={styles.libroNull} onClick={() => abrirPopup(intercambio)}>
                                        <SquarePlus className={styles.masIcono} />
                                        <p className={styles.libroTitulo}>Selecciona un libro</p>
                                    </div>
                                    <p className={`${styles.libroTitulo} ${styles.libroTituloSpacer}`}>Selecciona un libro</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Botones */}

                    <div className={styles.botonesFooter}>
                        {/* Si es solicitado -> mostrar "Ver biblioteca" + icono eliminar */}
                        {intercambio.estado_solicitud === "solicitado" && (
                            <>
                                <Boton texto="Ver Biblioteca" variant="default" onClick={() => abrirPopup(intercambio)} className={styles.botonVerBiblioteca} customClassName={true} />
                                <Trash2 className={styles.trashIcono} onClick={() => eliminarIntercambio(intercambio.id_intercambio)} />
                            </>
                        )}

                        {/* Si es seleccionado -> mostrar "Aceptar" + "Rechazar" + icono eliminar */}
                        {intercambio.estado_solicitud === "seleccionado" && (
                            <>
                                <div className={styles.divBotones}>
                                    <Boton texto="Ver Biblioteca" variant="default" onClick={() => abrirPopup(intercambio)} className={styles.botonVerBiblioteca} customClassName={true} />
                                    <Boton texto="Aceptar" className={styles.botonVerBiblioteca} customClassName={true} onClick={() => avanzarEstado(intercambio.id_intercambio, intercambio.estado_solicitud)} />
                                </div>
                                <Trash2 className={styles.trashIcono} onClick={() => eliminarIntercambio(intercambio.id_intercambio)} />
                            </>
                        )}
                        {intercambio.estado_solicitud === "finalizado" && (
                            <>
                                <Boton texto="Intercambio finalizado" className={styles.disabled} customClassName={true} disabled={true} />
                                <Trash2 className={styles.trashIcono} onClick={() => eliminarIntercambio(intercambio.id_intercambio)} />
                            </>
                        )}

                        {/* si es valorar al hacer click se abre el popup de valoracion */}
                        {intercambio.estado_solicitud === "valorar" && (
                            <>
                                <Boton texto="Valorar" className={styles.botonVerBiblioteca} customClassName={true} onClick={() => abrirPopupValoracion(intercambio)} />
                                <Trash2 className={styles.trashIcono} onClick={() => eliminarIntercambio(intercambio.id_intercambio)} />
                            </>
                        )}

                        {!["solicitado", "seleccionado", "finalizado", "rechazado", "valorar"].includes(intercambio.estado_solicitud) && flujoEstados[intercambio.estado_solicitud] && (
                            <>
                                <Boton texto={etiquetasBoton[intercambio.estado_solicitud]} className={styles.botonVerBiblioteca} customClassName={true} onClick={() => avanzarEstado(intercambio.id_intercambio, intercambio.estado_solicitud)} />
                                <Trash2 className={styles.trashIcono} onClick={() => eliminarIntercambio(intercambio.id_intercambio)} />
                            </>
                        )}
                    </div>
                </div>
            ))}
            <PopUpBiblioteca isOpen={open} onClose={cerrarPopup} intercambio={intercambioActivo} avanzarEstado={avanzarEstado} />
            <PopUpValoracion isOpen={openValoracion} onClose={cerrarPopupValoracion} intercambio={intercambioValoracion} idUsuarioActual={idUsuarioNumero} onValoracionGuardada={manejarValoracionGuardada} />
        </>
    );
}
