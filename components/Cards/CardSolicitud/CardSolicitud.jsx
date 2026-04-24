"use client";
import styles from "./CardSolicitud.module.css";
import { PopUpBiblioteca, Boton, PopUpValoracion } from "@/components/index";
import { SquarePlus, ArrowLeftRight } from "lucide-react";
import useIntercambio, { cumpleFiltroIntercambio } from "@/hooks/useIntercambio";
import useUsuarioIntercambio from "@/hooks/useUsuarioIntercambio";
import useTiempo from "@/hooks/useTiempo";
import { useEffect, useState } from "react";
import CardIntercambioCompletado from "../CardIntercambioCompletado/CardIntercambioCompletado";

function TiempoSolicitud({ fecha }) {
    const tiempoTranscurrido = useTiempo(fecha);
    return <>{tiempoTranscurrido}</>;
}


export default function CardSolicitud({ filtro = "todas" }) {
    const [popupActivo, setPopupActivo] = useState(null); // "biblioteca" | "valoracion" | null
    const [intercambioActivo, setIntercambioActivo] = useState(null); // intercambio seleccionado para el popup activo
    const { obtenerIntercambios, actualizarEstadoIntercambio, actualizarEstadoComunIntercambio } = useIntercambio();
    const { idUsuarioActual, obtenerTipoUsuarioIntercambio } = useUsuarioIntercambio();
    

    const [intercambios, setIntercambios] = useState([]); // todos intercambios
    // Definimos el flujo de estados para cada acción
    const flujoEstados = {
        solicitado: "seleccionado", // en las dos columnas
        seleccionado: "aceptado", // en las dos columnas
        aceptado: "valorar", // individual
        rechazado: "rechazado", // en las dos columnas
        valorar: "finalizado", // individual
        finalizado: null,
    };

    const estadosComunes = new Set(["seleccionado", "aceptado", "rechazado"]);
    const estadosValidos = new Set(["solicitado", "seleccionado", "aceptado", "valorar", "finalizado", "rechazado"]);
    // Etiquetas para cada estado del botón
    const etiquetasBoton = {
        solicitado: "Ver biblioteca",
        seleccionado: "Aceptar o rechazar",
        aceptado: "Confirmar entrega",
        rechazado: "Rechazado",
        valorar: "Valorar",
        finalizado: "Intercambio completado",
    };

    function obtenerEstadoUsuario(intercambio, esPropietario, esSolicitante) {
        const normalizarEstado = (estado) => {
            const estadoNormalizado = String(estado ?? "").trim().toLowerCase();
            if (!estadoNormalizado) return "solicitado";
            return estadosValidos.has(estadoNormalizado) ? estadoNormalizado : "solicitado";
        };

        if (esPropietario) return normalizarEstado(intercambio.estado_usuario_recibe);
        if (esSolicitante) return normalizarEstado(intercambio.estado_usuario_envia);
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
            const cambioComun = estadosComunes.has(siguienteEstado);

            if (cambioComun) {
                await actualizarEstadoComunIntercambio(id, siguienteEstado);
            } else {
                await actualizarEstadoIntercambio(id, siguienteEstado, idUsuarioActual);
            }
        } catch (error) {
            alert(error?.message || "No se pudo actualizar el estado del intercambio");
            return;
        }

        // Actualizar visualmente
        setIntercambios((prev) =>
            prev.map((i) => {
                if (i.id_intercambio !== id) return i;

                if (estadosComunes.has(siguienteEstado)) {
                    return {
                        ...i,
                        estado_usuario_recibe: siguienteEstado,
                        estado_usuario_envia: siguienteEstado,
                    };
                }

                const idPropietario = Number(i.id_usuario_recibe ?? i.id_usuario_envia);
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

    const mensajesEstadoVacio = {
        recibidas: {
            titulo: "Sin propuestas en bandeja",
            texto: "Cuando alguien quiera intercambiar contigo, su solicitud aparecera aqui.",
        },
        realizadas: {
            titulo: "Aun no has lanzado propuestas",
            texto: "Explora otras bibliotecas y envia una solicitud para empezar tu proximo intercambio.",
        },
        historial: {
            titulo: "Tu historial esta por estrenarse",
            texto: "En cuanto cierres un intercambio, quedara guardado en este apartado.",
        },
        todas: {
            titulo: "Todo despejado por ahora",
            texto: "No hay movimientos activos en solicitudes. Es un buen momento para buscar un nuevo libro.",
        },
    };

    const mensajeEstadoVacio = mensajesEstadoVacio[filtro] || mensajesEstadoVacio.todas;
    const mostrarEstadoVacio = Boolean(idUsuarioActual) && intercambiosFiltrados.length === 0;

    return (
        <>
            {mostrarEstadoVacio && (
                <div className={styles.estadoVacio}>
                    <h3 className={styles.estadoVacioTitulo}>{mensajeEstadoVacio.titulo}</h3>
                    <p className={styles.estadoVacioTexto}>{mensajeEstadoVacio.texto}</p>
                </div>
            )}
            {intercambiosFiltrados.map((intercambio) => {
                const { esPropietario, esSolicitante } = obtenerTipoUsuarioIntercambio(intercambio);
                const estadoUsuario = obtenerEstadoUsuario(intercambio, esPropietario, esSolicitante);
                const puedeSeleccionarLibro = esPropietario;

                if (estadoUsuario === "finalizado") {
                    return <CardIntercambioCompletado key={intercambio.id_intercambio} intercambio={intercambio} />;
                }

                const librosOrdenados = esSolicitante
                    ? [
                          {
                              tipo: "ofrecido",
                              titulo: intercambio.libro_ofrecido_titulo,
                              foto: intercambio.libro_ofrecido_foto,
                              textoPendiente: "Pendiente de selección",
                          },
                          {
                              tipo: "solicitado",
                              titulo: intercambio.libro_solicitado_titulo,
                              foto: intercambio.libro_solicitado_foto,
                              textoPendiente: "Libro solicitado",
                          },
                      ]
                    : [
                          {
                              tipo: "solicitado",
                              titulo: intercambio.libro_solicitado_titulo,
                              foto: intercambio.libro_solicitado_foto,
                              textoPendiente: "Libro solicitado",
                          },
                          {
                              tipo: "ofrecido",
                              titulo: intercambio.libro_ofrecido_titulo,
                              foto: intercambio.libro_ofrecido_foto,
                              textoPendiente: "Selecciona un libro",
                          },
                      ];

                const textoCabeceraPropuesta = esSolicitante ? "Solicitud para:" : "Solicitud de:";
                const usuarioCabeceraPropuesta = esSolicitante
                    ? intercambio.propietario_nick_usuario || intercambio.propietario_nombre || "Usuario"
                    : intercambio.solicitante_nick_usuario || intercambio.solicitante_nombre || "Usuario";

                const renderLibro = (libro) => {
                    if (libro.titulo) {
                        const libroOfrecidoEditable = libro.tipo === "ofrecido" && puedeSeleccionarLibro && estadoUsuario === "seleccionado";

                        return (
                            <div
                                className={`${styles.libro} ${libroOfrecidoEditable ? styles.libroSeleccionable : ""}`}
                                onClick={libroOfrecidoEditable ? () => abrirPopup(intercambio) : undefined}
                                onKeyDown={
                                    libroOfrecidoEditable
                                        ? (e) => {
                                              if (e.key === "Enter" || e.key === " ") {
                                                  e.preventDefault();
                                                  abrirPopup(intercambio);
                                              }
                                          }
                                        : undefined
                                }
                                role={libroOfrecidoEditable ? "button" : undefined}
                                tabIndex={libroOfrecidoEditable ? 0 : undefined}
                                title={libroOfrecidoEditable ? "Cambiar libro seleccionado" : undefined}>
                                <div className={styles.libroImagenWrapper}>
                                    <img src={libro.foto} alt={libro.titulo} className={styles.libroImagen} loading="lazy" />
                                    {libroOfrecidoEditable && (
                                        <div className={styles.libroEditableHint}>
                                           
                                            <span>Cambiar libro</span>
                                        </div>
                                    )}
                                </div>
                                <p className={styles.libroTitulo}>{libro.titulo}</p>
                            </div>
                        );
                    }

                    if (libro.tipo === "ofrecido" && puedeSeleccionarLibro) {
                        return (
                            <div className={styles.libro}>
                                <div className={styles.libroNull} onClick={() => abrirPopup(intercambio)}>
                                    <SquarePlus className={styles.masIcono} />
                                    <p className={styles.libroTitulo}>Selecciona un libro</p>
                                </div>
                                <p className={`${styles.libroTitulo} ${styles.libroTituloSpacer}`}>Selecciona un libro</p>
                            </div>
                        );
                    }

                    return (
                        <div className={styles.libro}>
                            <div className={`${styles.libroNull} ${styles.libroNullInactivo}`}>
                                <p className={styles.libroTitulo}>{libro.textoPendiente}</p>
                            </div>
                            <p className={`${styles.libroTitulo} ${styles.libroTituloSpacer}`}>{libro.textoPendiente}</p>
                        </div>
                    );
                };

                return (
                <div key={intercambio.id_intercambio} className={styles.solicitudCard}>
                    <div className={styles.propuestaUsuario}>
                        <p><strong>{textoCabeceraPropuesta}</strong> {usuarioCabeceraPropuesta}</p>
                        <div>
                            {/* hace cuanto */}
                            <p className="text-muted" style={{ fontSize: "0.8rem" }}>
                                <TiempoSolicitud fecha={intercambio.fecha_inicio || intercambio.fecha} />
                            </p>
                        </div>
                    </div>
                    <div className={styles.librosContainer}>
                        {renderLibro(librosOrdenados[0])}
                        <ArrowLeftRight className={styles.intercambioIcono} />
                        {renderLibro(librosOrdenados[1])}
                    </div>

                    {/* Botones */}

                    <div className={styles.botonesFooter}>
                        {/* Si es solicitado -> mostrar "Ver biblioteca" */}
                        {estadoUsuario === "solicitado" && esPropietario && (
                            <>
                                <Boton texto="Ver Biblioteca" variant="default" onClick={() => abrirPopup(intercambio)} className={styles.botonVerBiblioteca} customClassName={true} />
                            </>
                        )}

                        {estadoUsuario === "solicitado" && esSolicitante && (
                            <>
                                <Boton texto="Esperando respuesta" className={styles.disabled} customClassName={true} disabled={true} />
                            </>
                        )}

                        {/* Si es seleccionado -> mostrar "Aceptar" + "Rechazar" */}
                        {estadoUsuario === "seleccionado" && (
                            <>
                                <div className={styles.divBotones}>
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

                        {estadoUsuario === "rechazado" && (
                            <>
                                <Boton texto="Rechazado" className={styles.disabled} customClassName={true} disabled={true} />
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
