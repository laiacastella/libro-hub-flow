"use client";
import { useCallback } from "react";

export function cumpleFiltroIntercambio(filtro, { esPropietario, esSolicitante, estadoUsuario }) {
    const esRechazado = estadoUsuario === "rechazado";
    const esEliminado = estadoUsuario === "eliminado";

    switch (filtro) {
        case "todas":
            return (esPropietario || esSolicitante) && !esEliminado;
        case "recibidas":
            return esPropietario && !esRechazado;
        case "realizadas":
            return esSolicitante && !esRechazado;
        case "historial":
            return esPropietario || esSolicitante;
        default:
            return false;
    }
}

export default function useIntercambio() {
    const obtenerIntercambios = useCallback(async () => {
        const response = await fetch("/api/intercambios");
        if (!response.ok) throw new Error("No se pudieron cargar los intercambios");
        return response.json();
    }, []);

    const actualizarEstadoIntercambio = useCallback(async (idIntercambio, estado, idUsuarioActual = null) => {
        const response = await fetch("/api/intercambios/estado/individual", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_intercambio: idIntercambio, estado, id_usuario_actual: idUsuarioActual }),
        });

        if (!response.ok) throw new Error("No se pudo actualizar el estado individual del intercambio");

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
        actualizarEstadoComunIntercambio,
        enviarValoracion,
    };
}
