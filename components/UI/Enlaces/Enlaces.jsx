import Link from "next/link";
import styles from './Enlaces.module.css'

const Enlaces = ({ ruta, nomEnlace, onClick }) => {

    if (onClick) {
        return (
            <a onClick={onClick} className={styles.enlaces}>
                {nomEnlace}
            </a>
        )
    }

    return (
        <Link href={ruta} className={styles.enlaces}>
            {nomEnlace}
        </Link>
    )
}

export default Enlaces