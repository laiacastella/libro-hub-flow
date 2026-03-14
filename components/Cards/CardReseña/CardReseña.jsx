import styles from './CardReseña.module.css'; // Importamos sus propios estilos

export default function CardReseña({ testimonio }) {
    
    const manejarErrorFoto = (e) => {
        if (!e.target.dataset.tried) {
            e.target.dataset.tried = "true";
             
        }
    };

    return (
        <div className={styles.reseñaCard}>
           
            <div className={styles.perfilWrapper}>
                <img 
                    src={testimonio.foto} 
                    alt={`Foto de ${testimonio.nombre}`} 
                    className={styles.fotoPerfil} 
                    onError={manejarErrorFoto} 
                />
                <p className={styles.nombreUsuario}>{testimonio.nombre}</p>
            </div>

            <blockquote className={styles.opinionTexto}>
                "{testimonio.reseña}"
            </blockquote>
        </div>
    );
}