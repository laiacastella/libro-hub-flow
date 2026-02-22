import styles from "./Boton.module.css";

export default function Boton({
    texto,
    onClick,
    title,
    type = "button",
    className = "",
    variant = "default", // default, red o disabled
    disabled = false,
}) {
    const variantClass = variant === "red" ? styles.red : variant === "disabled" ? styles.disabled : variant === "cerrar" ? styles.cerrar : styles.default;
    const isCerrar = variant === "cerrar";
    const buttonClass = isCerrar ? `${variantClass} ${className}` : `${styles.boton} ${variantClass} ${className}`;

    return (
        <button onClick={onClick} className={buttonClass} title={title} type={type} disabled={disabled || variant === "disabled"}>
            {texto}
        </button>
    );
}
