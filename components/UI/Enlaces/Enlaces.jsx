import Link from "next/link";
import styles from './Enlaces.module.css'

const Enlaces = ({ ruta, nomEnlace, onClick }) => {
    return (
        <Link 
            href={ruta} 
            onClick={onClick}
            className={styles.enlaces}
        >
            {nomEnlace}
        </Link>
    )
}

export default Enlaces
