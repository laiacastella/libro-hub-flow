import styles from './BarraBusqueda.module.css';

export default function BarraBusqueda() {
  return (
    <div className={styles.contenedor}>
      <div className={styles.busquedaCaja}>
        <input 
          type="text" 
          className={styles.input} 
          placeholder="Ej: cien años de soledad" 
        />
        <button className={styles.boton}>
          <span className={styles.icono}>
            <img src="/icono-busqueda.png" alt="Buscar" />
          </span>
          <span className={styles.texto}>BUSCAR</span>
        </button>
      </div>
    </div>
  );
}