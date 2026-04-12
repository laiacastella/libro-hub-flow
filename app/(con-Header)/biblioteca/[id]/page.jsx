"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useUsuario from "@/hooks/useUsuario";
import useLibroActivo from "@/hooks/useLibroActivo";
import { Comentarios, Estrellas } from "@/components";
import styles from "./ficha.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FichaLibro() {
    const { id } = useParams();
    const [libro, setLibro] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [solicitandoIntercambio, setSolicitandoIntercambio] = useState(false);
    const [errorIntercambio, setErrorIntercambio] = useState("");

    const usuario = useUsuario();
    const { guardarLibroActivo } = useLibroActivo();
    console.log("ID del libro en FichaLibro:", id);
    useEffect(() => {
        if (id) {
            setCargando(true);
            fetch(`/api/libros/${id}`) // trae libro por id
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

    const esMiLibro = libro && usuario && Number(libro.id_usuario) === Number(usuario.id_usuario);

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
                    id_usuario_solicitante: usuario.id_usuario,
                    id_usuario_propietario: libro.id_usuario,
                    id_libro_solicitado: Number(id),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.error || "No se pudo solicitar el intercambio");
            }

            alert("Solicitud de intercambio enviada");
        } catch (error) {
            console.error("Error solicitando intercambio:", error);
            setErrorIntercambio(error?.message || "Error al solicitar intercambio");
        } finally {
            setSolicitandoIntercambio(false);
        }
    }

    return (
        <div className={styles.fondoContenedor}>
            {/* Tarjeta principal*/}
            <div className={`container shadow-sm bg-white rounded-4 p-4 p-md-5 ${styles.tarjetaPrincipal}`}>
                <div className="row g-4 align-items-start">
                    {/* Portada */}
                    <div className="col-12 col-md-4 text-center">
                        <img src={libro.foto_portada} alt={libro.titulo} className={`img-fluid rounded-3 shadow ${styles.portada}`} />
                    </div>

                    {/* Info del Libro */}
                    <div className="col-12 col-md-8">
                        <div className="ps-md-3">
                            <h1 className="fw-bold h2">{libro.titulo}</h1>
                            <p className="text-muted mb-4">de {libro.autor}</p>

                            <p className="small mb-1 text-secondary">Género: {libro.tipo_genero || "No especificado"}</p>
                            <p className="text-dark mb-4" style={{ textAlign: "justify", fontSize: "0.95rem" }}>
                                {libro.descripcion}
                            </p>

                            {/* Condicional de botones según diseño */}
                            <div className="mt-4">
                                {esMiLibro ? (
                                    <button className={`btn btn-success px-4 py-2 ${styles.btnPrincipal}`}>Editar Datos Libro</button>
                                ) : (
                                    <div className="card border shadow-sm p-3 rounded-4 d-flex flex-row align-items-center justify-content-between gap-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className={styles.avatarMini}></div>
                                            <div>
                                                <p className="mb-0 x-small text-muted" style={{ fontSize: "0.7rem" }}>
                                                    Propietario:
                                                </p>
                                                <p className="mb-0 fw-bold small">{libro.nick_usuario || "Usuario desconocido"}</p>
                                                <Estrellas valoracion={libro.puntuacion_promedio} />
                                            </div>
                                        </div>
                                        <button className={`btn btn-success px-3 ${styles.btnPrincipal}`} onClick={handleSolicitarIntercambio} disabled={solicitandoIntercambio}>
                                            {solicitandoIntercambio ? "Enviando..." : "Solicitar intercambio"}
                                        </button>
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
            </div>
        </div>
    );
}
