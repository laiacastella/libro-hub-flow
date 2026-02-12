"use client";
import { createContext, useContext, useState } from "react";

const IntercambioContext = createContext();

export function IntercambioProvider({ children }) {
  const [intercambios, setIntercambios] = useState([]);
  const [intercambioActivo, setIntercambioActivo] = useState(null);

  // Avanzar estado
  async function avanzarEstado(id, estadoActual) {
    const flujoEstados = {
      solicitado: "seleccionado",
      seleccionado: "aceptado",
      aceptado: "valorar",
      rechazado: "finalizado",
      valorar: "finalizado",
      finalizado: "eliminado",
      eliminado: null,
    };
    const siguienteEstado = flujoEstados[estadoActual];
    if (!siguienteEstado) return;

    await fetch("/api/intercambios/estado", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_intercambio: id, estado: siguienteEstado }),
    });

    setIntercambios((prev) =>
      prev.map((i) =>
        i.id_intercambio === id
          ? { ...i, estado_solicitud: siguienteEstado }
          : i
      )
    );
  }

  // Seleccionar libro ofrecido
  async function seleccionarLibroOfrecido(id_intercambio, id_libro_ofrecido) {
    await fetch("/api/intercambios/libro", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_intercambio, id_libro_ofrecido }),
    });

    await fetch("/api/intercambios/estado", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_intercambio, estado: "seleccionado" }),
    });

    setIntercambios((prev) =>
      prev.map((i) =>
        i.id_intercambio === id_intercambio
          ? { ...i, estado_solicitud: "seleccionado", id_libro_ofrecido }
          : i
      )
    );
  }

  // Eliminar intercambio
  async function eliminarIntercambio(id) {
    await fetch("/api/intercambios", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_intercambio: id, estado: "eliminado" }),
    });

    setIntercambios((prev) => prev.filter((i) => i.id_intercambio !== id));
  }

  return (
    <IntercambioContext.Provider
      value={{
        intercambios,
        setIntercambios,
        intercambioActivo,
        setIntercambioActivo,
        avanzarEstado,
        seleccionarLibroOfrecido,
        eliminarIntercambio,
      }}
    >
      {children}
    </IntercambioContext.Provider>
  );
}

export function useIntercambio() {
  return useContext(IntercambioContext);
}
