"use client";

import useUsuario from "@/hooks/useUsuario";

export default function useUsuarioIntercambio() {
    const usuario = useUsuario(); // Obtener el usuario actual desde el hook useUsuario
    const idUsuarioActual = usuario?.id_usuario;

    function obtenerTipoUsuarioIntercambio(intercambio) {
        // ids de propietario y solicitante del intercambio
        const idPropietario = intercambio?.id_usuario_propietario;
        const idSolicitante = intercambio?.id_usuario_solicitante;

        // Determinar si el usuario actual es propietario o solicitante
        const esPropietario = idUsuarioActual !== null && idPropietario === idUsuarioActual;
        const esSolicitante = idUsuarioActual !== null && idSolicitante === idUsuarioActual;

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