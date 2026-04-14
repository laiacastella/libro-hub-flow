"use client";

import useUsuario from "@/hooks/useUsuario";

export default function useUsuarioIntercambio() {
    const usuario = useUsuario(); // Obtener el usuario actual desde el hook useUsuario
    const idUsuarioActual = usuario?.id_usuario;

    function obtenerTipoUsuarioIntercambio(intercambio) {
        // ids de propietario y solicitante del intercambio
        const idPropietario = Number(intercambio?.id_usuario_propietario);
        const idSolicitante = Number(intercambio?.id_usuario_solicitante);
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