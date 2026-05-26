"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import useUsuario from "@/hooks/useUsuario";
import useLibroActivo from "@/hooks/useLibroActivo";
import { Comentarios, Estrellas, PopUpIntercambioSolicitado, Boton, PopUpEditarLibro, PopUp } from "@/components";
import styles from "./ficha.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FichaLibro() {
    const { id } = useParams();
    const router = useRouter();

    const [libro, setLibro] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [solicitandoIntercambio, setSolicitandoIntercambio] = useState(false);
    const [errorIntercambio, setErrorIntercambio] = useState("");
    const [abrirPopupExito, setAbrirPopupExito] = useState(false);
    const [yaSolicitado, setYaSolicitado] = useState(false);
    const [idIntercambioActivo, setIdIntercambioActivo] = useState(null);
    const [verificandoSolicitud, setVerificandoSolicitud] = useState(true);
    const [abrirPopupEditar, setAbrirPopupEditar] = useState(false);
    const [revirtiendoIntercambio, setRevirtiendoIntercambio] = useState(false);
    const [modalImagen, setModalImagen] = useState(false);
    const [abrirPopupEliminar, setAbrirPopupEliminar] = useState(false);
    const [eliminando, setEliminando] = useState(false);

    const usuario = useUsuario();
    const { guardarLibroActivo } = useLibroActivo();

    // Calcular si es mi libro
    const esMiLibro = useMemo(() => {
        return libro && usuario && Number(libro.id_usuario) === Number(usuario.id_usuario);
    }, [libro, usuario]);

    useEffect(() => {
        if (id) {
            setCargando(true);
            fetch(`/api/libros/${id}`) 
                .then((res) => res.json())
                .then((data) => {
                    const resultado = Array.isArray(data) ? data[0] : data.data ? (Array.isArray(data.data) ? data.data[0] : data.data) : data;
                    if (resultado) {
                        setLibro(resultado);
                        guardarLibroActivo(resultado);
                    }
                })
                .catch((err) => console.error("Error cargando libro:", err))
                .finally(() => setCargando(false));
        }
    }, [id, guardarLibroActivo]);

    // Verificar si el usuario ya tiene una solicitud activa
    useEffect(() => {
        if (usuario?.id_usuario && id && !esMiLibro) {
            setVerificandoSolicitud(true);
            fetch(`/api/intercambios?mode=check&user=${usuario.id_usuario}&libro=${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setYaSolicitado(data.existe);
                    if (data.existe && data.id_intercambio) {
                        setIdIntercambioActivo(data.id_intercambio);
                    }
                })
                .catch((err) => console.error("Error verificando solicitud:", err))
                .finally(() => setVerificandoSolicitud(false));
        } else {
            setVerificandoSolicitud(false);
        }
    }, [usuario?.id_usuario, id, esMiLibro]);

    //petición delete
    async function handleEliminarLibro() {
        try {
            setEliminando(true);
            const res = await fetch(`/api/libros/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setAbrirPopupEliminar(false);
                router.push("/biblioteca"); // Redirige a la biblioteca general al borrarlo
                router.refresh();
            } else {
                alert("Ocurrió un error en el servidor al intentar eliminar el libro.");
            }
        } catch (error) {
            console.error("Error al eliminar libro:", error);
            alert("Error de red. No se pudo procesar el borrado.");
        } finally {
            setEliminando(false);
        }
    }

    if (cargando) return <div className="text-center mt-5">Cargando ficha...</div>;
    if (!libro) return <div className="text-center mt-5">Libro no encontrado</div>;

    async function handleSolicitarIntercambio() {
        if (!usuario?.id_usuario || !libro?.id_usuario || !id) {
            setErrorIntercambio("No se pudo enviar la solicitud. Intentalo de nuevo.");
            return;
        }
        try {
            setSolicitandoIntercambio(true);
            setErrorIntercambio("");
            const res = await fetch("/api/intercambios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_usuario_envia: usuario.id_usuario,
                    id_usuario_recibe: libro.id_usuario,
                    id_libro_solicitado: Number(id),
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || "No se pudo solicitar el intercambio");

            setYaSolicitado(true);
            setIdIntercambioActivo(data.id);
            setAbrirPopupExito(true);
        } catch (error) {
            console.error("Error solicitando intercambio:", error);
            setErrorIntercambio(error?.message || "Error al solicitar intercambio");
        } finally {
            setSolicitandoIntercambio(false);
        }
    }

    async function handleRevertirIntercambio() {
        if (!idIntercambioActivo || !usuario?.id_usuario) {
            setErrorIntercambio("No se pudo revertir el intercambio.");
            return;
        }
        try {
            setRevirtiendoIntercambio(true);
            setErrorIntercambio("");
            const res = await fetch("/api/intercambios/estado/individual", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_intercambio: idIntercambioActivo,
                    estado: "rechazado",
                    id_usuario_actual: usuario.id_usuario,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || "No se pudo revertir el intercambio");

            setYaSolicitado(false);
            setIdIntercambioActivo(null);
        } catch (error) {
            console.error("Error revirtiendo intercambio:", error);
            setErrorIntercambio(error?.message || "Error al revertir el intercambio");
        } finally {
            setRevirtiendoIntercambio(false);
        }
    }

    return (
        <div className={styles.fondoContenedor}>
            <div className={`container shadow-sm bg-white rounded-4 p-4 p-md-5 ${styles.tarjetaPrincipal}`}>
                <div className="row g-4 align-items-start">
                    {/* Portada */}
                    <div className="col-12 col-sm-5 col-lg-4 text-center">
                        <div className={styles.portadaWrapper}>
                            <img 
                                src={libro.foto_portada} 
                                alt={libro.titulo} 
                                className={`rounded-3 shadow ${styles.portada}`}
                                onClick={() => setModalImagen(true)}
                                title="Haz clic para ver la imagen completa"
                            />
                            {libro.disponibilidad === 'reservado' && (
                                <span className={styles.badgeReservado}>Reservado</span>
                            )}
                        </div>
                    </div>

                    {/* Info del Libro */}
                    <div className="col-12 col-sm-7 col-lg-8">
                        <div className="ps-md-3">
                            <h1 className="fw-bold h2">{libro.titulo}</h1>
                            <p className="text-muted mb-4">de {libro.autor}</p>

                            <p className="small mb-1 text-secondary">Género: {libro.tipo_genero || "No especificado"}</p>
                            <p className="text-dark mb-4" style={{ textAlign: "justify", fontSize: "0.95rem" }}>
                                {libro.descripcion}
                            </p>

                            {/* Botones de acciones */}
                            <div className="mt-4">
                                {esMiLibro ? (  
                                    <div>
                                        <div className="d-flex flex-column gap-2 w-100">
                                            <div className="w-100">
                                                <Boton 
                                                    texto="Editar Libro" 
                                                    variant={libro.disponibilidad === 'reservado' ? "disabled" : "default"} 
                                                    disabled={libro.disponibilidad === 'reservado'} 
                                                    onClick={() => setAbrirPopupEditar(true)}
                                                />
                                            </div>
                                            <div className="w-100">
                                                {/*botón eliminar*/}
                                                <Boton 
                                                    texto="Eliminar Libro" 
                                                    variant={libro.disponibilidad === 'reservado' ? "disabled" : "red"}
                                                    disabled={libro.disponibilidad === 'reservado'} 
                                                    onClick={() => setAbrirPopupEliminar(true)}
                                                />
                                            </div>
                                        </div>
                                        
                                        {/*bloqueo visible*/}
                                        {libro.disponibilidad === 'reservado' && (
                                            <div className="alert alert-warning d-flex align-items-center mt-3 rounded-3 small py-2" role="alert">
                                                <div>
                                                    No puedes modificar ni eliminar este libro porque se encuentra bloqueado en un intercambio activo.
                                                </div>
                                            </div>
                                        )}
                                    </div>   
                                ) : (
                                    <div className={`card border shadow-sm p-3 rounded-4 d-flex align-items-center gap-3 ${styles.propietarioCard}`}>
                                        <div 
                                            className="d-flex align-items-center gap-2 flex-grow-1" 
                                            style={{ cursor: "pointer" }}
                                            onClick={() => router.push(`/perfilUsuario?id=${libro.id_usuario}`)}
                                        >
                                            <img 
                                                src={libro.foto_perfil || "/perfilUsuario.svg"} 
                                                alt={libro.nick_usuario || "Usuario"}
                                                className={styles.avatarMini}
                                            />
                                            <div>
                                                <p className="mb-0 x-small text-muted" style={{ fontSize: "0.7rem" }}>
                                                    Propietario:
                                                </p>
                                                <p className="mb-0 fw-bold small">{libro.nick_usuario || "Usuario desconocido"}</p>
                                                <span 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(`/perfilUsuario?id=${libro.id_usuario}&tab=valoraciones`);
                                                    }}
                                                    style={{ cursor: "pointer", display: "inline-block" }}
                                                    title="Ver valoraciones"
                                                >
                                                    <Estrellas valoracion={libro.puntuacion_promedio} />
                                                </span>
                                            </div>
                                        </div>

                                        <div className={styles.botonIntercambio}>
                                            {libro.disponibilidad === 'reservado' ? (
                                                <Boton texto="Reservado" variant="disabled" disabled />
                                            ) : yaSolicitado ? (
                                                <Boton 
                                                    texto={revirtiendoIntercambio ? "Revirtiendo..." : "Revertir intercambio"} 
                                                    variant="red"
                                                    onClick={handleRevertirIntercambio}
                                                    disabled={revirtiendoIntercambio}
                                                />
                                            ) : (
                                                <Boton 
                                                    texto={solicitandoIntercambio ? "Enviando..." : "Solicitar intercambio"} 
                                                    variant="default" 
                                                    onClick={handleSolicitarIntercambio} 
                                                    disabled={solicitandoIntercambio || verificandoSolicitud} 
                                                />
                                            )}
                                        </div>
                                    </div>
                                )}
                                {errorIntercambio && <p className="text-danger small mt-2 mb-0">{errorIntercambio}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección Reseñas*/}
                <div className={`mt-5 p-4 rounded-4 ${styles.seccionResenas}`}>
                    <Comentarios />
                </div>

                <PopUpIntercambioSolicitado 
                    isOpen={abrirPopupExito} 
                    onClose={() => setAbrirPopupExito(false)} 
                    userName={libro.nick_usuario || "el usuario"} 
                />

                {/* PopUp Editar Datos */}
                <PopUpEditarLibro 
                    isOpen={abrirPopupEditar} 
                    onClose={() => setAbrirPopupEditar(false)} 
                    libroActual={libro}
                    onActualizado={() => {
                        router.refresh();
                        fetch(`/api/libros/${id}`) 
                            .then((res) => res.json())
                            .then((data) => {
                                const resultado = Array.isArray(data) ? data[0] : data.data ? (Array.isArray(data.data) ? data.data[0] : data.data) : data;
                                if (resultado) {
                                    setLibro(resultado);
                                    guardarLibroActivo(resultado);
                                }
                            })
                            .catch((err) => console.error("Error recargando libro después de editar:", err));
                    }} 
                />

                {/*Confirmación de eliminación definitiva*/}
                <PopUp isOpen={abrirPopupEliminar} onClose={() => setAbrirPopupEliminar(false)} title="¿Deseas eliminar este libro de tu biblioteca?">
                    <div className="p-2 text-center">
                        <p className="mb-4 text-secondary">
                            Esta acción eliminará de forma permanente el libro de la comunidad. Esta acción no se puede deshacer.
                        </p>
                        <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
                            <Boton 
                                texto={eliminando ? "Eliminando..." : "Sí, eliminar"} 
                                variant="red" 
                                onClick={handleEliminarLibro} 
                                disabled={eliminando}
                            />
                            <Boton 
                                texto="No eliminar" 
                                onClick={() => setAbrirPopupEliminar(false)} 
                                disabled={eliminando}
                            />
                        </div>
                    </div>
                </PopUp>

                {/* Modal imagen extendida */}
                {modalImagen && (
                    <div className={styles.modalImagenOverlay} onClick={() => setModalImagen(false)}>
                        <div className={styles.modalImagenContenedor} onClick={(e) => e.stopPropagation()}>
                            <button className={styles.modalImagenCerrar} onClick={() => setModalImagen(false)} aria-label="Cerrar">✕</button>
                            <img src={libro.foto_portada} alt={libro.titulo} className={styles.modalImagen} />
                            <p className={styles.modalImagenTitulo}>{libro.titulo}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}