"use client"
import { useState, useEffect } from "react";

export default function EscribirTexto({
  texto = "",
  velocidad = 50,
  Tipo = "h1"
}) {
  const [contenido, setContenido] = useState("");
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (indice < texto.length) {
      const timeout = setTimeout(() => {
        setContenido((prev) => prev + texto.charAt(indice));
        setIndice(indice + 1);
      }, velocidad);

      return () => clearTimeout(timeout);
    }
  }, [indice, texto, velocidad]);

  return <Tipo>{contenido}</Tipo>;
}