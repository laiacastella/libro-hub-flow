"use client";
import { useState, useEffect } from "react";

export default function EscribirTexto({
  texto = "",
  velocidad = 50,
  Tipo = "h1"
}) {
  const [contenido, setContenido] = useState("");
  const [indice, setIndice] = useState(0);

  // Convertimos a string de forma segura al inicio
  const textoSeguro = texto || "";

  useEffect(() => {
    // Cuando el prop 'texto' cambia, reseteamos el estado
    setContenido("");
    setIndice(0);
  }, [texto]);

  useEffect(() => {
    // Verificamos la longitud
    if (indice < textoSeguro.length) {
      const timeout = setTimeout(() => {
        setContenido((prev) => prev + textoSeguro.charAt(indice));
        setIndice(indice + 1);
      }, velocidad);

      return () => clearTimeout(timeout);
    }
  }, [indice, textoSeguro, velocidad]);

  return <Tipo>{contenido}</Tipo>;
}