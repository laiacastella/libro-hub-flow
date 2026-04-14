"use client";
import styles from "./CardSolicitud.module.css";
import { PopUpBiblioteca, Boton, PopUpValoracion } from "@/components/index";
import { SquarePlus, ArrowLeftRight } from "lucide-react";
import useIntercambio, { cumpleFiltroIntercambio } from "@/hooks/useIntercambio";
import useUsuarioIntercambio from "@/hooks/useUsuarioIntercambio";
import { useEffect, useState } from "react";

export default function CardSolicitud({ filtro = "todas" }) {
    const [popupActivo, setPopupActivo] = useState(null); // "biblioteca" | "valoracion" | null
    const [intercambioActivo, setIntercambioActivo] = useState(null); // intercambio seleccionado para el popup activo
    const { obtenerIntercambios, actualizarEstadoIntercambio } = useIntercambio();
    const { idUsuarioActual, obtenerTipoUsuarioIntercambio } = useUsuarioIntercambio();

    const [intercambios, setIntercambios] = useState([]); // todos intercambios
    // Definimos el flujo de estados para cada acción
    const flujoEstados = {
        solicitado: "seleccionado", // en las dos columnas
        seleccionado: "aceptado", // en las dos columnas
        aceptado: "valorar", // individual
        rechazado: "rechazado", // en las dos columnas
        valorar: "finalizado", // individual
        finalizado: "eliminado", // individual
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

    function obtenerEstadoUsuario(intercambio, esPropietario, esSolicitante) {
        if (esPropietario) return intercambio.estado_usuario_recibe;
        if (esSolicitante) return intercambio.estado_usuario_envia;
        return null;
    }

    // Cargar intercambios
    useEffect(() => {
        obtenerIntercambios()
            .then((data) => setIntercambios(data))
            .catch(() => setIntercambios([]));
    }, [popupActivo, obtenerIntercambios]); // recarga al abrir/cerrar popup para reflejar cambios

    console.log("Intercambios cargados en CardSolicitud:", intercambios);
    // Avanzar al siguiente estado
    async function avanzarEstado(id, estadoActual, estadoForzado = null) {
        const siguienteEstado = estadoForzado ?? flujoEstados[estadoActual];
        if (!siguienteEstado) return;

        try {
            // Actualizar en la api
            await actualizarEstadoIntercambio(id, siguienteEstado, idUsuarioActual);
        } catch {
            return;
        }

        // Actualizar visualmente
        setIntercambios((prev) =>
            prev.map((i) => {
                if (i.id_intercambio !== id) return i;

                const idPropietario = Number(i.id_usuario_recibe);
                const esPropietario = Number(idUsuarioActual) === idPropietario;

                return esPropietario
                    ? { ...i, estado_usuario_recibe: siguienteEstado }
                    : { ...i, estado_usuario_envia: siguienteEstado };
            })
        );
    }

    // Función para abrir el popup con el intercambio activo
    function abrirPopup(intercambio) {
        setIntercambioActivo(intercambio);
        setPopupActivo("biblioteca");
    }
    // Función para cerrar el popup
    function cerrarPopup() {
        setPopupActivo(null);
        setIntercambioActivo(null);
    }

    function abrirPopupValoracion(intercambio) {
        setIntercambioActivo(intercambio);
        setPopupActivo("valoracion");
    }

    function cerrarPopupValoracion() {
        setPopupActivo(null);
        setIntercambioActivo(null);
    }

    async function manejarValoracionGuardada(idIntercambio) {
        await avanzarEstado(idIntercambio, "valorar");
        cerrarPopupValoracion();
    }

    const intercambiosFiltrados = intercambios.filter((intercambio) => {
        if (!idUsuarioActual) return false;

        const { esPropietario, esSolicitante } = obtenerTipoUsuarioIntercambio(intercambio);
        const estadoUsuario = obtenerEstadoUsuario(intercambio, esPropietario, esSolicitante);

        return cumpleFiltroIntercambio(filtro, {
            esPropietario,
            esSolicitante,
            estadoUsuario,
        });
    });

    const esPopupBibliotecaAbierto = popupActivo === "biblioteca" && Boolean(intercambioActivo);
    const esPopupValoracionAbierto = popupActivo === "valoracion" && Boolean(intercambioActivo);

    return (
        <>
            {intercambiosFiltrados.map((intercambio) => {
                const { esPropietario, esSolicitante } = obtenerTipoUsuarioIntercambio(intercambio);
                const estadoUsuario = obtenerEstadoUsuario(intercambio, esPropietario, esSolicitante);

                return (
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
                        {/* Si es solicitado -> mostrar "Ver biblioteca" */}
                        {estadoUsuario === "solicitado" && (
                            <>
                                <Boton texto="Ver Biblioteca" variant="default" onClick={() => abrirPopup(intercambio)} className={styles.botonVerBiblioteca} customClassName={true} />
                            </>
                        )}

                        {/* Si es seleccionado -> mostrar "Aceptar" + "Rechazar" */}
                        {estadoUsuario === "seleccionado" && (
                            <>
                                <div className={styles.divBotones}>
                                    <Boton texto="Ver Biblioteca" variant="default" onClick={() => abrirPopup(intercambio)} className={styles.botonVerBiblioteca} customClassName={true} />
                                    <Boton texto="Aceptar" className={styles.botonVerBiblioteca} customClassName={true} onClick={() => avanzarEstado(intercambio.id_intercambio, estadoUsuario)} />
                                    <Boton texto="Rechazar" className={styles.botonVerBiblioteca} customClassName={true} onClick={() => avanzarEstado(intercambio.id_intercambio, estadoUsuario, "rechazado")} />
                                </div>
                            </>
                        )}
                        {estadoUsuario === "finalizado" && (
                            <>
                                <Boton texto="Intercambio finalizado" className={styles.disabled} customClassName={true} disabled={true} />
                            </>
                        )}

                        {/* si es valorar al hacer click se abre el popup de valoracion */}
                        {estadoUsuario === "valorar" && (
                            <>
                                <Boton texto="Valorar" className={styles.botonVerBiblioteca} customClassName={true} onClick={() => abrirPopupValoracion(intercambio)} />
                            </>
                        )}

                        {!["solicitado", "seleccionado", "finalizado", "rechazado", "valorar"].includes(estadoUsuario) && flujoEstados[estadoUsuario] && (
                            <>
                                <Boton texto={etiquetasBoton[estadoUsuario]} className={styles.botonVerBiblioteca} customClassName={true} onClick={() => avanzarEstado(intercambio.id_intercambio, estadoUsuario)} />
                            </>
                        )}
                    </div>
                </div>
            )})}
            <PopUpBiblioteca isOpen={esPopupBibliotecaAbierto} onClose={cerrarPopup} intercambio={intercambioActivo} avanzarEstado={avanzarEstado} />
            <PopUpValoracion isOpen={esPopupValoracionAbierto} onClose={cerrarPopupValoracion} intercambio={intercambioActivo} idUsuarioActual={idUsuarioActual} onValoracionGuardada={manejarValoracionGuardada} />
        </>
    );
}
