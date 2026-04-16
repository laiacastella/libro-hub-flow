"use client";

import useUsuario from "@/hooks/useUsuario";

export default function useUsuarioIntercambio() {
    const usuario = useUsuario(); // Obtener el usuario actual desde el hook useUsuario
    const idUsuarioActual = usuario?.id_usuario;

    function obtenerTipoUsuarioIntercambio(intercambio) {
        // Compatibilidad con ambos esquemas de columnas
        const idPropietario = Number(intercambio?.id_usuario_recibe ?? intercambio?.id_usuario_envia);
        const idSolicitante = Number(intercambio?.id_usuario_envia ?? intercambio?.id_usuario_recibe);
        const idActual = Number(idUsuarioActual);

        // Determinar si el usuario actual es propietario o solicitante
        const esPropietario = Number.isFinite(idActual) && idPropietario === idActual;
        const esSolicitante = Number.isFinite(idActual) && idSolicitante === idActual;

        return {
            esPropietario,
            esSolicitante
        };
    }

    return {
        idUsuarioActual,
        obtenerTipoUsuarioIntercambio,
    };
}