import styles from "./Boton.module.css";

export default function Boton({
    nomEnlace,
    onClick,
    title,
    type = "button",
    className = "",
    variant = "default", // default, red o disabled
    disabled = false,
}) {
    const variantClass = variant === "red" ? styles.red : variant === "disabled" ? styles.disabled : styles.default;

    return (
        <button onClick={onClick} className={`${styles.boton} ${variantClass} ${className}`} title={title} type={type} disabled={disabled || variant === "disabled"}>
            {nomEnlace}
        </button>
    );
}
