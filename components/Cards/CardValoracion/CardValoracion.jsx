"use client";

import { useState, useEffect } from "react";
import styles from "./CardValoracion.module.css";
import { Estrellas } from "@/components/index";
import { useRouter } from "next/navigation";

function tiempoRelativo(fecha) {
    const ahora = new Date();
    const fechaValoracion = new Date(fecha);
    const diferenciaMs = ahora - fechaValoracion;
    const minutos = Math.floor(diferenciaMs / 60000);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (minutos < 1) return "ahora mismo";
    if (minutos < 60) return `hace ${minutos} min`;
    if (horas < 24) return `hace ${horas} h`;
    if (dias < 30) return `hace ${dias} d`;
    return fechaValoracion.toLocaleDateString("es-ES");
}

export default function CardValoracion({ userId }) {
    const [valoraciones, setValoraciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        const fetchValoraciones = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`/api/valoraciones/usuario/${userId}`);
                if (!res.ok) {
                    throw new Error("Error al cargar las valoraciones");
                }
                const data = await res.json();
                setValoraciones(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchValoraciones();
    }, [userId]);

    if (loading) {
        return (
            <div className={styles.valoracionesContainer}>
                <div className={styles.loading}>Cargando valoraciones...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.valoracionesContainer}>
                <div className={styles.error}>{error}</div>
            </div>
        );
    }

    if (valoraciones.length === 0) {
        return (
            <div className={styles.valoracionesContainer}>
                <div className={styles.estadoVacio}>
                    <h3 className={styles.estadoVacioTitulo}>Tu reputación está por estrenarse</h3>
                    <p className={styles.estadoVacioTexto}>Completa intercambios y recibe valoraciones para construir tu perfil de confianza.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.valoracionesContainer}>
            {valoraciones.map((v) => (
                <div key={v.id_valoracion} className={`container-fluid mb-4 p-4 ${styles.comentarioCard}`}>
                    <div className="row g-0 align-items-center mb-2">
                        <div
                            className="col-auto me-2" 
                            style={{ cursor: "pointer" }}
                            onClick={() => router.push(`/perfilUsuario?id=${v.id_usuario_evaluador}`)}
                        >
                            <div className={styles.avatarWrapper}>
                                <img 
                                    src={v.foto_perfil || "/default-avatar.png"} 
                                    alt={v.nick_usuario} 
                                    className={styles.perfilUsuario} 
                                />
                            </div>
                        </div>

                        <div
                            className="col d-flex flex-column" 
                            style={{ cursor: "pointer" }}
                            onClick={() => router.push(`/perfilUsuario?id=${v.id_usuario_evaluador}`)}
                        >
                            <span className={styles.nombreUsuario}>{v.nick_usuario}</span>
                            <span className={styles.tiempoPublicacion}>{tiempoRelativo(v.fecha_valoracion)}</span>
                        </div>

                        <div className="col-auto">
                            <Estrellas valoracion={v.puntuacion} />
                        </div>
                    </div>

                    <div className="row g-0">
                        <div className="col-12">
                            <div className={styles.cajaComentario}>
                                <p className="mb-0">{v.valoracion}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
