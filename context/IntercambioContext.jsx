"use client";
import { createContext, useContext, useState, useEffect } from "react";

const IntercambioContext = createContext();

export function IntercambioProvider({ children }) {
  const [intercambios, setIntercambios] = useState([]);
  const [intercambioActivo, setIntercambioActivo] = useState(null);

  // Cargar todos los intercambios desde la API
  useEffect(() => {
    fetch("/api/intercambios")
      .then((res) => res.json())
      .then((data) => setIntercambios(data))
      .catch((err) => console.error("Error cargando intercambios:", err));
  }, []);

  // Avanzar estado de un intercambio
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

  // Abrir popup para un intercambio
  function abrirIntercambio(intercambio) {
    setIntercambioActivo(intercambio);
  }

  // Cerrar popup
  function cerrarIntercambio() {
    setIntercambioActivo(null);
  }

  return (
    <IntercambioContext.Provider
      value={{
        intercambios,
        intercambioActivo,
        setIntercambios,
        avanzarEstado,
        seleccionarLibroOfrecido,
        eliminarIntercambio,
        abrirIntercambio,
        cerrarIntercambio,
      }}
    >
      {children}
    </IntercambioContext.Provider>
  );
}

export function useIntercambio() {
  return useContext(IntercambioContext);
}
