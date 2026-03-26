"use client";

import { useEffect, useState } from "react";

export default function useUsuario() {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem("usuarioLogueado");

        if (data) {
            setUsuario(JSON.parse(data));
        }
    }, []);

    return usuario;
}