import styles from "./Boton.module.css";

export default function Boton({
    texto,
    onClick,
    title,
    type = "button",
    className = "",
    variant = "default", // default, red, disabled o cerrar
    size = "medium", // small, medium o large
    disabled = false,
}) {
    const variantClass = variant === "red" ? styles.red : variant === "disabled" ? styles.disabled : variant === "cerrar" ? styles.cerrar : styles.default;
    const sizeClass = size === "small" ? styles.small : size === "large" ? styles.large : styles.medium;
    const isCerrar = variant === "cerrar";
    const buttonClass = isCerrar ? `${variantClass} ${className}` : `${styles.boton} ${sizeClass} ${variantClass} ${className}`;

    return (
        <button onClick={onClick} className={buttonClass} title={title} type={type} disabled={disabled || variant === "disabled"}>
            {texto}
        </button>
    );
}
