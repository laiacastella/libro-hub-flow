import { useState } from "react";
import styles from "./PopUpBiblioteca.module.css";
import { Biblioteca } from "@/components/index";

const PopUpBiblioteca = ({ isOpen, onClose, intercambio, avanzarEstado }) => {
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);

  console.log(
    "libro seleccionado",
    libroSeleccionado,
    "intercambio",
    intercambio?.id_intercambio,
  );

  const handleCerrarPopup = async () => {
    if (libroSeleccionado && intercambio) {
      try {
        console.log("Enviando PATCH /libro con:", {
          id_intercambio: intercambio?.id_intercambio,
          id_libro_ofrecido: libroSeleccionado?.id_libro,
        });

        await fetch("/api/intercambios/libro", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_intercambio: intercambio.id_intercambio,
            id_libro_ofrecido: libroSeleccionado,
          }),
        });

        // Actualiza localmente
        avanzarEstado(intercambio.id_intercambio, "solicitado"); // para cambiar estado a "seleccionado" en UI
      } catch (error) {
        console.error(error);
        alert("No se pudo seleccionar el libro");
      }
    }
    onClose();
  };

  if (!isOpen || !intercambio) return null;
  return (
    <div className={styles.overlay} onClick={onClose}>
      <dialog
        className={styles.modal}
        open
        onClick={(e) => e.stopPropagation()}
      >
        <button
          title="Cerrar ventana"
          className={styles.cerrar}
          onClick={() => {
            onClose();
            setLibroSeleccionado(null);
          }}
        >
          ✖
        </button>

        <div className={styles.header}>
          <h2>Biblioteca del usuario</h2>
          <div className={styles.botonesSeleccion}>
            <button
              className={styles.botonAceptar}
              onClick={() => {
                // avanzarEstado(intercambio.id_intercambio, "seleccionado");
                handleCerrarPopup();
                setLibroSeleccionado(null);
                // setIdIntercambio(intercambio.id_intercambio);
                onClose();
              }}
            >
              Seleccionar libro
            </button>
            <button
              className={styles.botonAceptar}
              onClick={() => {
                avanzarEstado(intercambio.id_intercambio, "seleccionado");
                // setIdIntercambio(intercambio.id_intercambio);
                onClose();
              }}
            >
              Aceptar Intercambio
            </button>
            <button
              className={styles.botonRechazar}
              onClick={() => {
                avanzarEstado(intercambio.id_intercambio, "rechazado");
                onClose();
              }}
            >
              Rechazar
            </button>
          </div>
        </div>

        <p>
          Libro solicitado:{" "}
          <strong>{intercambio.libro_solicitado_titulo}</strong>
        </p>

        <Biblioteca
          todos={false}
          userId={intercambio.id_usuario}
          className={styles.bibliotecaContainer}
          setLibroSeleccionado={setLibroSeleccionado}
          libroSeleccionado={libroSeleccionado}
        />
      </dialog>
    </div>
  );
};

export default PopUpBiblioteca;
