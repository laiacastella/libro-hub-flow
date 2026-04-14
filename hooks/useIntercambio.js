"use client";
import { useCallback } from "react";

export default function useIntercambio() {
    const obtenerIntercambios = useCallback(async () => {
        const response = await fetch("/api/intercambios");
        if (!response.ok) throw new Error("No se pudieron cargar los intercambios");
        return response.json();
    }, []);

    const actualizarEstadoIntercambio = useCallback(async (idIntercambio, estado, idUsuarioActual = null) => {
        const response = await fetch("/api/intercambios/estado", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_intercambio: idIntercambio, estado, id_usuario_actual: idUsuarioActual }),
        });

        if (!response.ok) throw new Error("No se pudo actualizar el estado del intercambio");

        return response.json().catch(() => ({}));
    }, []);

    const eliminarIntercambio = useCallback(async (idIntercambio, idUsuarioActual = null) => {
        const response = await fetch("/api/intercambios/estado", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_intercambio: idIntercambio, estado: "eliminado", id_usuario_actual: idUsuarioActual }),
        });

        if (!response.ok) throw new Error("No se pudo eliminar el intercambio");

        return response.json().catch(() => ({}));
    }, []);

    const actualizarEstadoComunIntercambio = useCallback(async (idIntercambio, estado) => {
        const response = await fetch("/api/intercambios/estado/comun", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_intercambio: idIntercambio, estado }),
        });

        if (!response.ok) throw new Error("No se pudo actualizar el estado comun del intercambio");

        return response.json().catch(() => ({}));
    }, []);

    const enviarValoracion = useCallback(async (payload) => {
        const response = await fetch("/api/valoraciones", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error("No se pudo enviar la valoración. Inténtalo de nuevo.");
        }

        return response.json().catch(() => ({}));
    }, []);

    return {
        obtenerIntercambios,
        actualizarEstadoIntercambio,
        eliminarIntercambio,
        actualizarEstadoComunIntercambio,
        enviarValoracion,
    };
}
