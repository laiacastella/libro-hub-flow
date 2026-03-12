import styles from './LibroCarrusel.module.css';

export default function LibroCarrusel({ libro }) {
    const manejarErrorImagen = (e) => {
        if (!e.target.dataset.tried) {
            e.target.dataset.tried = "true";
            e.target.src = "https://via.placeholder.com/150x200?text=Sin+Portada";
        }
    };

    return (
        <div className={styles.libroCard}>
            <img 
                src={libro.imagen || "https://via.placeholder.com/150x200?text=Sin+Portada"} 
                alt={libro.titulo} 
                className={styles.libroImage} 
                onError={manejarErrorImagen} 
            />
            <h2 className={styles.libroTitulo} title={libro.titulo}>{libro.titulo}</h2>
            <p className={styles.libroAutor}>{libro.autor}</p>
        </div>
    );
}