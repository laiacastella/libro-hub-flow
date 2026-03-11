"use client";
import styles from "./FormIncidencia.module.css";
import { useState, useEffect } from "react";
import { Boton } from "@/components";

export default function FormIncidencia({ compact = false }) {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [formData, setFormData] = useState({
        nombreCompleto: "",
        correoElectronico: "",
        tipoIncidencia: "Error Técnico (Bug)",
        telefono: "",
        asunto: "",
        descripcion: "",
    });

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("/api/incidencia", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.error || "Error al enviar el reporte");
                return;
            }

            alert("Incidencia registrada correctamente. Nos pondremos en contacto pronto.");
            setFormData({
                nombreCompleto: "",
                correoElectronico: "",
                tipoIncidencia: "Error Técnico (Bug)",
                telefono: "",
                asunto: "",
                descripcion: "",
            });
        } catch (error) {
            console.error("Error al enviar el reporte:", error);
            alert("Error al enviar el reporte. Intenta de nuevo.");
        }
    };

    return (
        <div className={`${styles.formCard} ${compact ? styles.formCardCompact : ""}`}>
            <form onSubmit={handleSubmit}>
                <div className={`${styles.formGrid} ${compact ? styles.formGridCompact : ""}`}>
                    <div>
                        <label className={`${styles.label} ${compact ? styles.labelCompact : ""}`}>Nombre Completo *</label>
                        <input type="text" name="nombreCompleto" value={formData.nombreCompleto} placeholder="Ej. Juan Pérez" className={`${styles.input} ${compact ? styles.inputCompact : ""}`} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className={`${styles.label} ${compact ? styles.labelCompact : ""}`}>Correo Electrónico *</label>
                        <input type="email" name="correoElectronico" value={formData.correoElectronico} placeholder="juan.perez@empresa.com" className={`${styles.input} ${compact ? styles.inputCompact : ""}`} onChange={handleChange} required />
                    </div>
                </div>

                <div className={`${styles.formGrid} ${compact ? styles.formGridCompact : ""}`}>
                    <div>
                        <label className={`${styles.label} ${compact ? styles.labelCompact : ""}`}>Tipo de Incidencia *</label>
                        <select name="tipoIncidencia" value={formData.tipoIncidencia} className={`${styles.select} ${compact ? styles.inputCompact : ""}`} onChange={handleChange} required>
                            <option>Error Técnico (Bug)</option>
                            <option>Problema de Acceso</option>
                            <option>Sugerencia de Mejora</option>
                            <option>Otro</option>
                        </select>
                    </div>
                    <div>
                        <label className={`${styles.label} ${compact ? styles.labelCompact : ""}`} htmlFor="telefono">
                            Teléfono
                        </label>
                        <input type="tel" id="telefono" name="telefono" value={formData.telefono} placeholder="123 456 789" className={`${styles.input} ${compact ? styles.inputCompact : ""}`} onChange={handleChange} pattern="[0-9\s]{9,15}" />
                    </div>
                </div>

                <div className={`${styles.marginBottom} ${compact ? styles.marginBottomCompact : ""}`}>
                    <label className={`${styles.label} ${compact ? styles.labelCompact : ""}`}>Asunto *</label>
                    <input type="text" name="asunto" value={formData.asunto} placeholder="Breve resumen del problema" className={`${styles.input} ${compact ? styles.inputCompact : ""}`} onChange={handleChange} required />
                </div>

                <div className={`${styles.marginBottom} ${compact ? styles.marginBottomCompact : ""}`}>
                    <label className={`${styles.label} ${compact ? styles.labelCompact : ""}`}>Descripción Detallada*</label>
                    <textarea rows={compact ? 3 : 5} name="descripcion" value={formData.descripcion} placeholder="¿Qué incidencia ocurre?..." className={`${styles.textarea} ${compact ? styles.inputCompact : ""}`} onChange={handleChange} required></textarea>
                </div>

                <div className={`${styles.marginBottom} ${compact ? styles.marginBottomCompact : ""}`}>
                    <label className={`${styles.label} ${compact ? styles.labelCompact : ""}`}>Adjuntar Capturas de Pantalla</label>
                    <div className={`${styles.adjuntarContainer} ${compact ? styles.adjuntarContainerCompact : ""}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.adjuntarIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className={styles.adjuntarText}>
                            <span className={styles.adjuntarLink}>Sube un archivo</span> o arrastra y suelta aquí
                        </p>
                        <p className={styles.adjuntarSubtext}>PNG, JPG, GIF hasta 10MB</p>
                    </div>
                </div>
                <div className={`${styles.actions} ${compact ? styles.actionsCompact : ""}`}>
                    <Boton size={compact || isSmallScreen ? "small" : "medium"} type="submit" texto="Enviar Reporte" />
                    <Boton size={compact || isSmallScreen ? "small" : "medium"} type="button" texto="Cancelar" variant="red" />
                </div>
            </form>
        </div>
    );
}
