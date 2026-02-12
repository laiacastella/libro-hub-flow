import styles from "./CardSolicitud.module.css";
import PopUpBiblioteca from "../PopUpBiblioteca/PopUpBiblioteca";

import { useEffect, useState } from "react";

export default function CardSolicitud() {
  // Estados para controlar el popup y el intercambio activo
  const [open, setOpen] = useState(false);
  const [intercambioActivo, setIntercambioActivo] = useState(null);

  const [intercambios, setIntercambios] = useState([]); // todos intercambios
  // Definimos el flujo de estados para cada acción
  const flujoEstados = {
    solicitado: "seleccionado",
    seleccionado: "aceptado",
    aceptado: "valorar",
    rechazado: "finalizado",
    valorar: "finalizado",
    finalizado: "eliminado",
    eliminado: null,
  };
  // Etiquetas para cada estado del botón
  const etiquetasBoton = {
    solicitado: "Ver biblioteca",
    seleccionado: "Aceptar o rechazar",
    aceptado: "Intercambiado",
    rechazado: "Rechazado",
    valorar: "Valorar",
    finalizado: "Eliminar",
    eliminado: "Eliminado",
  };

  // Cargar intercambios
  useEffect(() => {
    fetch("/api/intercambios")
      .then((res) => res.json())
      .then((data) => setIntercambios(data));
  }, [open]); // recarga al cerrar el popup para reflejar cambios

  // Avanzar al siguiente estado
  async function avanzarEstado(id, estadoActual) {
    const siguienteEstado = flujoEstados[estadoActual];
    if (!siguienteEstado) return;

    // Actualizar en la api
    await fetch("/api/intercambios/estado", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_intercambio: id, estado: siguienteEstado }),
    });

    // Actualizar visualmente
    setIntercambios((prev) =>
      prev.map((i) =>
        i.id_intercambio === id
          ? { ...i, estado_solicitud: siguienteEstado }
          : i,
      ),
    );
  }

  // Eliminar visualmente (solo cuando sea finalizado)
  async function eliminarIntercambio(id) {
    await fetch("/api/intercambios", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_intercambio: id, estado: "eliminado" }),
    });

    setIntercambios((prev) => prev.filter((i) => i.id_intercambio !== id));
  }

  // Función para abrir el popup con el intercambio activo
  function abrirPopup(intercambio) {
    setIntercambioActivo(intercambio);
    setOpen(true);
  }
  // Función para cerrar el popup
  function cerrarPopup() {
    setOpen(false);
  }

  return (
    <>
      {intercambios.map((intercambio) => (
        <div key={intercambio.id_intercambio} className={styles.solicitudCard}>
          <div className={styles.librosContainer}>
            {/* Libro solicitado */}
            <div className={styles.libro}>
              <img
                src={intercambio.libro_solicitado_foto}
                alt={intercambio.libro_solicitado_titulo}
                className={styles.libroImagen}
                loading="lazy"
              />
              <p className={styles.libroTitulo}>
                {intercambio.libro_solicitado_titulo}
              </p>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.intercambioIcono}
              aria-hidden="true"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M20 10h-16l5.5 -6" />
              <path d="M4 14h16l-5.5 6" />
            </svg>

            {/* Libro ofrecido */}
            <div className={styles.libro}>
              {intercambio.libro_ofrecido_titulo ? (
                <>
                  <img
                    src={intercambio.libro_ofrecido_foto}
                    alt={intercambio.libro_ofrecido_titulo}
                    className={styles.libroImagen}
                    loading="lazy"
                  />
                  <p className={styles.libroTitulo}>
                    {intercambio.libro_ofrecido_titulo}
                  </p>
                </>
              ) : (
                <div 
                className={styles.libroNull}
                  onClick={() => abrirPopup(intercambio)}
                >
                  <div
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.libroIcono}
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M5 5a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -14" />
                      <path d="M9 5a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -14" />
                      <path d="M5 8h4" />
                      <path d="M9 16h4" />
                      <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041" />
                      <path d="M14 9l4 -1" />
                      <path d="M16 16l3.923 -.98" />
                    </svg>
                  </div>
                  <p className={styles.libroTitulo}>
                    Selecciona un libro
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Botones */}
          {intercambio.estado_solicitud === "solicitado" ? (
            <button
              className={styles.boton}
              onClick={() => abrirPopup(intercambio)}
            >
              Ver biblioteca
            </button>
          ) : ["finalizado", "rechazado"].includes(
              intercambio.estado_solicitud,
            ) ? (
            <button
              className={styles.boton}
              onClick={() => eliminarIntercambio(intercambio.id_intercambio)}
            >
              Eliminar
            </button>
          ) : flujoEstados[intercambio.estado_solicitud] ? (
            <button
              className={styles.boton}
              onClick={() =>
                avanzarEstado(
                  intercambio.id_intercambio,
                  intercambio.estado_solicitud,
                )
              }
            >
              {etiquetasBoton[intercambio.estado_solicitud]}
            </button>
          ) : null}
        </div>
      ))}
      <PopUpBiblioteca
        isOpen={open}
        onClose={cerrarPopup}
        intercambio={intercambioActivo}
        avanzarEstado={avanzarEstado}
      />
    </>
  );
}
