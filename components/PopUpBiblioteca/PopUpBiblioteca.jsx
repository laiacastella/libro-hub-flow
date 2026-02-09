import styles from "./PopUpBiblioteca.module.css";
import { Biblioteca } from "@/components/index";

const PopUpBiblioteca = ({ isOpen, onClose, intercambio, avanzarEstado }) => {
  if (!isOpen || !intercambio) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <dialog
        className={styles.modal}
        open
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.cerrar} onClick={onClose}>
          ✖
        </button>

        <h2>Biblioteca del usuario</h2>
        <div className={styles.botonesSeleccion}>
              <button
                className={styles.botonAceptar}
                onClick={() => {
                  avanzarEstado(intercambio.id_intercambio, "aceptado");
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

        <p>
          Libro solicitado:{" "}
          <strong>{intercambio.libro_solicitado_titulo}</strong>
        </p>

        <Biblioteca userId={intercambio.id_usuario} className={styles.bibliotecaContainer} />
      </dialog>
    </div>
  );
};

export default PopUpBiblioteca;
