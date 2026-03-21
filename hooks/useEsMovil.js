"use client";

import { useState, useEffect } from "react";

export default function useEsMovil() {
    const [esMovil, setEsMovil] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");

        const actualizar = () => {
            setEsMovil(mediaQuery.matches);
        };

        actualizar();

        mediaQuery.addEventListener("change", actualizar);

        return () => {
            mediaQuery.removeEventListener("change", actualizar);
        };
    }, []);

    return esMovil;
}
