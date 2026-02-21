"use client";
import styles from "./FormIncidencia.module.css";
import { useState } from "react";
import { Boton } from "@/components";

export default function FormIncidencia() {
    const [formData, setFormData] = useState({
        nombreCompleto: "",
        correoElectronico: "",
        tipoIncidencia: "Error Técnico (Bug)",
        asunto: "",
        descripcion: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);
    };

    return (
        <div className={styles.formCard}>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGrid}>
                    <div>
                        <label className={styles.label}>Nombre Completo *</label>
                        <input type="text" name="nombreCompleto" placeholder="Ej. Juan Pérez" className={styles.input} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className={styles.label}>Correo Electrónico *</label>
                        <input type="email" name="correoElectronico" placeholder="juan.perez@empresa.com" className={styles.input} onChange={handleChange} required />
                    </div>
                </div>

                <div className={styles.formGrid}>
                    <div>
                        <label className={styles.label}>Tipo de Incidencia *</label>
                        <select name="tipoIncidencia" className={styles.select} onChange={handleChange} required>
                            <option>Error Técnico (Bug)</option>
                            <option>Problema de Acceso</option>
                            <option>Sugerencia de Mejora</option>
                            <option>Otro</option>
                        </select>
                    </div>
                    <div>
                        <label className={styles.label} htmlFor="telefono">
                            Teléfono
                        </label>
                        <input type="tel" id="telefono" name="telefono" placeholder="123 456 789" className={styles.input} onChange={handleChange} pattern="[0-9\s]{9,15}" />
                    </div>
                </div>

                <div className={styles.marginBottom}>
                    <label className={styles.label}>Asunto *</label>
                    <input type="text" name="asunto" placeholder="Breve resumen del problema" className={styles.input} onChange={handleChange} required />
                </div>

                <div className={styles.marginBottom}>
                    <label className={styles.label}>Descripción Detallada*</label>
                    <textarea rows="5" name="descripcion" placeholder="¿Qué incidencia ocurre?..." className={styles.textarea} onChange={handleChange} required></textarea>
                </div>

                <div className={styles.marginBottom}>
                    <label className={styles.label}>Adjuntar Capturas de Pantalla</label>
                    <div className={styles.adjuntarContainer}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.adjuntarIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className={styles.adjuntarText}>
                            <span className={styles.adjuntarLink}>Sube un archivo</span> o arrastra y suelta aquí
                        </p>
                        <p className={styles.adjuntarSubtext}>PNG, JPG, GIF hasta 10MB</p>
                    </div>
                </div>
                <div className={styles.actions}>
                    <Boton type="button" nomEnlace="Enviar Reporte" />
                    <Boton type="button" nomEnlace="Cancelar" variant="red" />
                </div>
            </form>
        </div>
    );
}
