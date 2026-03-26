"use client"
import styles from "./Input.module.css";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

export default function Input({
    label,
    tipo, // text, password, email, number, checkbox, radio, file, color, date, range, tel, url y search.
    id, 
    nombre,
    maxLength,
    soloNumeros = false,
    className,
    placeholder,
    fullWidth = false,
    accept,
    value,
    onChange,
    onFocus,
}) {
    
    const [visible, setVisible] = useState(false);

    const tipoFinal = tipo === "password" && visible ? "text" : tipo;

    return (
         <div className={styles.field} style={fullWidth ? { flex: 1, minWidth: 0 } : {}}>
            
            {label && (
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
            )}

            <div className={styles.wrapper} style={fullWidth ? { flex: 1, minWidth: 0 } : {}}>
                <input
                    type={tipoFinal}
                    id={id}
                    name={nombre}
                    placeholder={placeholder}
                    className={`${styles.input} ${className || ""}`}
                    maxLength={maxLength}
                    accept={accept}
                    inputMode={soloNumeros ? "numeric" : undefined}
                    pattern={soloNumeros ? "[0-9]*" : undefined}
                    {...(value !== undefined ? { value } : {})}
                    {...(onChange ? { onChange } : {})}
                    {...(onFocus ? { onFocus } : {})}
                    onInput={soloNumeros ? (e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                    } : undefined}
                />

                {tipo === "password" && (
                    <button
                        type="button"
                        className={styles.toggle}
                        onClick={() => setVisible(!visible)}
                    >
                        {visible ? <Eye /> : <EyeClosed />}
                    </button>
                )}
            </div>
        </div>
    );
}