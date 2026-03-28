"use client";

import { useState, useEffect } from "react";

// función para elegir singular o plural
function plural(valor, singular, plural) {
    return valor === 1 ? singular : plural;
}

// Formatear tiempo relativo (hace X minutos, en X horas, etc)
function formatearTiempo(fechaEntrada, ahoraMs) {
    if (!fechaEntrada) return "";

    const fecha = new Date(String(fechaEntrada).replace(" ", "T"));
    if (isNaN(fecha)) return "";

    const diffMin = Math.floor(Math.abs(ahoraMs - fecha) / 60000);
    const esFuturo = ahoraMs < fecha;

    const texto = (valor, unidad) => (esFuturo ? `en ${valor} ${unidad}` : `hace ${valor} ${unidad}`);

    // Minutos
    if (diffMin < 60) {
        const minutos = Math.max(1, diffMin);
        return texto(minutos, plural(minutos, "minuto", "minutos"));
    }

    // Horas
    if (diffMin < 1440) {
        const horas = Math.floor(diffMin / 60);
        return texto(horas, plural(horas, "hora", "horas"));
    }

    // Días
    const dias = Math.floor(diffMin / 1440);
    return texto(dias, plural(dias, "día", "días"));
}

// Hook
export default function useTiempo(fechaEntrada) {
    const [ahora, setAhora] = useState(Date.now());

    useEffect(() => {
        // Actualiza cada minuto
        const interval = setInterval(() => {
            setAhora(Date.now());
        }, 60000);

        // Limpiar al desmontar
        return () => clearInterval(interval);
    }, []);

    return formatearTiempo(fechaEntrada, ahora);
}
