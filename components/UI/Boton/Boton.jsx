"use client";
import styles from "./Boton.module.css";
import { useRouter } from "next/navigation";

export default function Boton({
    texto,
    onClick,
    ariaLabel,
    title,
    type = "button",
    className = "",
    variant = "default", // default, red, disabled o cerrar
    size = "medium", // small, medium o large
    disabled = false,
    enlace,
    icono : Icon,
    customClassName = false, // Si es true, usa solo el className personalizado
}) {
    const router = useRouter();

    // Si customClassName es true, usa solo el className proporcionado
    if (customClassName) {
        const handleClick = (e) => {
            if (type === "submit") return;

            if (onClick) onClick(e);
            if (enlace) router.push(enlace);
        };

        return (
            <button aria-label={ariaLabel} onClick={handleClick} className={className} title={title} type={type} disabled={disabled}>
                {Icon && <Icon />}
                <span>{texto}</span>
            </button>
        );
    }

    const variantClass = variant === "red" ? styles.red : variant === "disabled" ? styles.disabled : variant === "cerrar" ? styles.cerrar : styles.default;
    const sizeClass = size === "small" ? styles.small : size === "large" ? styles.large : styles.medium;
    const isCerrar = variant === "cerrar";
    const buttonClass = isCerrar ? `${variantClass} ${className}` : `${styles.boton} ${sizeClass} ${variantClass} ${className}`;

    const handleClick = (e) => {
        if (type === "submit") return;
        
        if (onClick) onClick(e);
        if (enlace) router.push(enlace);
    };

    return (
        <button aria-label={ariaLabel} onClick={handleClick} className={buttonClass} title={title} type={type} disabled={disabled || variant === "disabled"}>
            {Icon && <Icon />}
            <span>{texto}</span>
        </button>
    );
}
