"use client";

import { useEffect, useState } from "react";

export default function useUsuario() {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const cargarUsuario = () => {
            const data = localStorage.getItem("usuarioLogueado");
            if (data) setUsuario(JSON.parse(data));
        };

        cargarUsuario();

        window.addEventListener("usuarioActualizado", cargarUsuario);

        return () => {
            window.removeEventListener("usuarioActualizado", cargarUsuario);
        };
    }, []);

    return usuario;
}