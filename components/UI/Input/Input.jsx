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
    className = styles.input,
}) {
    
    const [visible, setVisible] = useState(false);

    const tipoFinal =
        tipo === "password" && visible ? "text" : tipo;

    return (
         <div className={styles.field}>
            
            {label && (
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
            )}

            <div className={styles.wrapper}>
                <input
                    type={tipoFinal}
                    id={id}
                    name={nombre}
                    className={className}
                    maxLength={maxLength}
                    inputMode={soloNumeros ? "numeric" : undefined}
                    pattern={soloNumeros ? "[0-9]*" : undefined}
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