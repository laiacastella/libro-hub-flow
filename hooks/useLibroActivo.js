"use client";

import { useCallback, useEffect, useState } from "react";

const CLAVE_LIBRO_ACTIVO = "libroActivo";

export default function useLibroActivo() {
    const [libroActivo, setLibroActivo] = useState(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const guardado = localStorage.getItem(CLAVE_LIBRO_ACTIVO);
        if (!guardado) return;

        try {
            setLibroActivo(JSON.parse(guardado));
        } catch {
            localStorage.removeItem(CLAVE_LIBRO_ACTIVO);
        }
    }, []);

    const guardarLibroActivo = useCallback((libro) => {
        if (!libro) return;
        setLibroActivo(libro);

        if (typeof window !== "undefined") {
            localStorage.setItem(CLAVE_LIBRO_ACTIVO, JSON.stringify(libro));
        }
    }, []);

    const limpiarLibroActivo = useCallback(() => {
        setLibroActivo(null);

        if (typeof window !== "undefined") {
            localStorage.removeItem(CLAVE_LIBRO_ACTIVO);
        }
    }, []);

    return {
        libroActivo,
        guardarLibroActivo,
        limpiarLibroActivo,
    };
}
