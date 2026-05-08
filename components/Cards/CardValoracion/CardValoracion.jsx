"use client";

import { useState, useEffect } from "react";
import styles from "./CardValoracion.module.css";
import { Estrellas } from "@/components/index";

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
                <div key={v.id_valoracion} className={styles.comentarioCard}>
                    <div className={styles.header}>
                        <div className={styles.usuarioInfo}>
                            <img
                                src={v.foto_perfil || "/default-avatar.png"}
                                alt={v.nick_usuario}
                                className={styles.perfilUsuario}
                            />
                            <div className={styles.usuarioDatos}>
                                <h2 className={styles.usuario}>{v.nick_usuario}</h2>
                                <p className={styles.tiempo}>{tiempoRelativo(v.fecha_valoracion)}</p>
                            </div>
                        </div>
                        <Estrellas valoracion={v.puntuacion} />
                    </div>
                    <p className={styles.comentario}>{v.valoracion}</p>
                </div>
            ))}
        </div>
    );
}