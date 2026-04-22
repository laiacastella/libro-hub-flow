"use client";

import { useEffect, useState } from "react";

export default function useUsuario() {
    const [usuario, setUsuario] = useState(() => {
        if (typeof window !== "undefined") {
            const data = localStorage.getItem("usuarioLogueado");
            return data ? JSON.parse(data) : null;
        }
        return null;
    });

    useEffect(() => {
        const cargarUsuario = () => {
            const data = localStorage.getItem("usuarioLogueado");
            if (data) setUsuario(JSON.parse(data));
        };

        window.addEventListener("usuarioActualizado", cargarUsuario);

        return () => {
            window.removeEventListener("usuarioActualizado", cargarUsuario);
        };
    }, []);

    return usuario;
}