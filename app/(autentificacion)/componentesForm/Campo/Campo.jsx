import styles from "./Campo.module.css";
const Campo = ({ tipo, nombre, texto, ...resto }) => {
    return <input className={styles.campoForm} type={tipo} placeholder={texto} name={nombre} {...resto} />;
};

export default Campo;
