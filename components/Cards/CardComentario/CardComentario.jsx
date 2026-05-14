"use client";
import { useEffect, useState } from "react";
import styles from "./CardComentario.module.css";
import { Trash2, Pencil } from "lucide-react";
import useUsuario from "@/hooks/useUsuario";
import useTiempo from "@/hooks/useTiempo";
import useLibroActivo from "@/hooks/useLibroActivo";
import Boton from "@/components/UI/Boton/Boton";
import FormEditarComentario from "@/components/Formularios/FormEditarComentario/FormEditarComentario";
import PopUp from "@/components/UI/PopUp/PopUp";
import { useRouter } from "next/navigation";

function ComentarioItem({ comentario, usuarioLogueado, comentarioEditandoId, iniciarEdicionComentario, manejarEliminarComentario, cancelarEdicionComentario, manejarComentarioEditado, mostrarError }) {
    const esMiComentario = usuarioLogueado && Number(comentario.id_usuario) === Number(usuarioLogueado.id_usuario);
    
    const router = useRouter();
    const tiempoTranscurrido = useTiempo(comentario.fecha_comentario);
    return (
        <div className={`container-fluid mb-4 ${styles.comentarioCard}`}>
            <div className="row g-0 align-items-center mb-2">
                <div
                    className="col-auto me-2" 
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push(`/perfilUsuario?id=${comentario.id_usuario}`)}
                >
                    <div className={styles.avatarWrapper}>
                        <img src={esMiComentario ? usuarioLogueado?.foto_perfil || "/perfilUsuario.svg" : comentario.foto_perfil} alt="avatar" className={styles.perfilUsuario} />
                    </div>
                </div>

                <div
                    className="col d-flex flex-column" 
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push(`/perfilUsuario?id=${comentario.id_usuario}`)}
                >
                    <span className={styles.nombreUsuario}>{esMiComentario ? usuarioLogueado?.nick_usuario : comentario.nick_usuario}</span>
                    <span className={styles.tiempoPublicacion}>{tiempoTranscurrido}</span>
                </div>

                {esMiComentario && (
                    <div className="col-auto d-flex gap-3">
                        <Boton type="button" variant="cerrar" className="p-0 d-inline-flex align-items-center justify-content-center" onClick={() => iniciarEdicionComentario(comentario)} ariaLabel="Editar comentario" texto={<Pencil size={18} className="text-secondary cursor-pointer hover-effect" />} />
                        <Boton type="button" variant="cerrar" className="p-0 d-inline-flex align-items-center justify-content-center" onClick={() => manejarEliminarComentario(comentario)} ariaLabel="Eliminar comentario" texto={<Trash2 size={18} className="text-danger cursor-pointer hover-effect" />} />
                    </div>
                )}
            </div>

            <div className="row g-0">
                <div className="col-12">
                    <div className={`${styles.cajaComentario} ${comentarioEditandoId === comentario.id_comentario ? styles.cajaComentarioEditando : ""}`}>{comentarioEditandoId === comentario.id_comentario ? <FormEditarComentario comentario={comentario} idUsuario={usuarioLogueado?.id_usuario} onCancelar={cancelarEdicionComentario} onComentarioEditado={(nuevoTexto) => manejarComentarioEditado(comentario.id_comentario, nuevoTexto)} onError={mostrarError} /> : <p className="mb-0">{comentario.comentario}</p>}</div>
                </div>
            </div>
        </div>
    );
}

export default function CardComentario({ comentarios, setComentarios }) {
    const usuarioLogueado = useUsuario();
    const { libroActivo } = useLibroActivo();
    const idLibro = libroActivo?.id_libro;
    const [comentarioEditandoId, setComentarioEditandoId] = useState(null);
    
    // Estados para los popups
    const [popupConfirmacion, setPopupConfirmacion] = useState({ isOpen: false, comentario: null });
    const [popupMensaje, setPopupMensaje] = useState({ isOpen: false, mensaje: "", tipo: "error" });

    useEffect(() => {
        if (!idLibro) return;
        fetch(`/api/comentarios?id_libro=${idLibro}`) // trae comentarios por id_libro
            .then((res) => res.json())
            .then((data) => {
                const comentarios = data?.data ?? data ?? [];
                setComentarios(Array.isArray(comentarios) ? comentarios : []);
            })
            .catch(() => setComentarios([]));
    }, [idLibro, setComentarios]);

    const iniciarEdicionComentario = (comentario) => {
        setComentarioEditandoId(comentario.id_comentario);
    };

    const cancelarEdicionComentario = () => {
        setComentarioEditandoId(null);
    };

    const manejarComentarioEditado = (idComentario, nuevoTexto) => {
        setComentarios((comentariosPrevios) => comentariosPrevios.map((comentarioActual) => (Number(comentarioActual.id_comentario) === Number(idComentario) ? { ...comentarioActual, comentario: nuevoTexto } : comentarioActual)));
        cancelarEdicionComentario();
        setPopupMensaje({ isOpen: true, mensaje: "Comentario actualizado correctamente", tipo: "exito" });
    };

    const mostrarError = (mensaje) => {
        setPopupMensaje({ isOpen: true, mensaje, tipo: "error" });
    };

    const manejarEliminarComentario = (comentario) => {
        setPopupConfirmacion({ isOpen: true, comentario });
    };

    const confirmarEliminacion = async () => {
        const comentario = popupConfirmacion.comentario;
        setPopupConfirmacion({ isOpen: false, comentario: null });

        try {
            const response = await fetch("/api/comentarios", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_comentario: comentario.id_comentario,
                    id_usuario: usuarioLogueado?.id_usuario,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setPopupMensaje({ isOpen: true, mensaje: data?.error || "No se pudo eliminar el comentario", tipo: "error" });
                return;
            }

            if (Number(comentarioEditandoId) === Number(comentario.id_comentario)) {
                cancelarEdicionComentario();
            }

            setComentarios((comentariosPrevios) => comentariosPrevios.filter((comentarioActual) => Number(comentarioActual.id_comentario) !== Number(comentario.id_comentario)));
        } catch {
            setPopupMensaje({ isOpen: true, mensaje: "Error de conexión. Inténtalo de nuevo.", tipo: "error" });
        }
    };

    const mostrarEstadoVacio = comentarios.length === 0;

    return (
        <>
            {mostrarEstadoVacio && (
                <div className={styles.estadoVacio}>
                    <h3 className={styles.estadoVacioTitulo}>Sin comentarios aún</h3>
                    <p className={styles.estadoVacioTexto}>Sé el primero en compartir tu opinión sobre este libro.</p>
                </div>
            )}
            {comentarios.map((comentario) => (
                <ComentarioItem 
                    key={comentario.id_comentario} 
                    comentario={comentario} 
                    usuarioLogueado={usuarioLogueado} 
                    comentarioEditandoId={comentarioEditandoId} 
                    iniciarEdicionComentario={iniciarEdicionComentario} 
                    manejarEliminarComentario={manejarEliminarComentario} 
                    cancelarEdicionComentario={cancelarEdicionComentario} 
                    manejarComentarioEditado={manejarComentarioEditado} 
                    mostrarError={mostrarError}
                />
            ))}

            {/* Popup de confirmación para eliminar */}
            <PopUp
                isOpen={popupConfirmacion.isOpen}
                onClose={() => setPopupConfirmacion({ isOpen: false, comentario: null })}
                title="¿Eliminar comentario?"
                footer={
                    <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                        <Boton 
                            texto="Cancelar" 
                            variant="secondary" 
                            onClick={() => setPopupConfirmacion({ isOpen: false, comentario: null })} 
                        />
                        <Boton 
                            texto="Eliminar" 
                            variant="red" 
                            onClick={confirmarEliminacion} 
                        />
                    </div>
                }
            >
                <p>¿Estás seguro de que quieres eliminar este comentario? Esta acción no se puede deshacer.</p>
            </PopUp>

            {/* Popup de mensaje (éxito o error) */}
            <PopUp
                isOpen={popupMensaje.isOpen}
                onClose={() => setPopupMensaje({ isOpen: false, mensaje: "", tipo: "error" })}
                title={popupMensaje.tipo === "exito" ? "¡Éxito!" : "Error"}
                footer={
                    <Boton 
                        texto="Aceptar" 
                        variant="default" 
                        onClick={() => setPopupMensaje({ isOpen: false, mensaje: "", tipo: "error" })} 
                    />
                }
            >
                <p>{popupMensaje.mensaje}</p>
            </PopUp>
        </>
    );
}
