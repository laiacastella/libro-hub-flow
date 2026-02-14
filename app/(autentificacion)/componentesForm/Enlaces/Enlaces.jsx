import styles from './Enlaces.module.css'
const Enlaces = ({ruta, nomEnlace}) => {
    return (
        <a className={styles.enlaces}href={ruta}>
            {nomEnlace}
        </a>
    )
}

export default Enlaces