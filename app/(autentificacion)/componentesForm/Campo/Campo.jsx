import styles from './Campo.module.css'
const Campo = ({tipo, nombre, texto}) => {
    return(
        <input 
        className = {styles.campoForm}
        type={tipo}
        placeholder={texto}
        name = {nombre}
        />
    )
}

export default Campo