"use client";
import Image from "next/image";
import styles from "./FormIncidencia.module.css";
import { useState, useRef } from "react";
import { Boton } from "@/components";

export default function FormIncidencia({ onClose }) {
    const maxPhotoSize = 10 * 1024 * 1024; // 10MB en bytes

    // Referencia al input file oculto para abrirlo desde el contenedor clicable.
    const fileInputRef = useRef(null);

    // Estados del formulario y de la imagen adjunta.
    const [archivo, setArchivo] = useState(null);
    const [preview, setPreview] = useState("");
    const [arrastrando, setArrastrando] = useState(false);
    const [formData, setFormData] = useState({
        nombreCompleto: "",
        correoElectronico: "",
        tipoIncidencia: "Error Técnico (Bug)",
        telefono: "",
        asunto: "",
        descripcion: "",
    });

    // Actualiza cualquier campo usando su name.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const processSelectedFile = (file, inputElement) => {
        if (!file) return;

        if (file.size > maxPhotoSize) {
            alert("La imagen debe ser menor de 10MB.");
            if (inputElement) inputElement.value = "";
            return;
        }

        if (preview) {
            URL.revokeObjectURL(preview);
        }

        setArchivo(file);
        setPreview(URL.createObjectURL(file));
    };

    // Guarda el archivo seleccionado y genera una URL temporal para la vista previa.
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        processSelectedFile(file, e.target);
    };

    // Cuando se arrastra encima
    const handleDragOver = (e) => {
        e.preventDefault();
        setArrastrando(true);
    };

    // Cuando se arrastra fuera del área
    const handleDragLeave = () => {
        setArrastrando(false);
    };

    // Cuando se suelta el archivo
    const handleDrop = (e) => {
        e.preventDefault();
        setArrastrando(false);

        const file = e.dataTransfer.files?.[0]; // Solo se procesa el primer archivo si se sueltan varios.
        processSelectedFile(file, fileInputRef.current); // Pasa la referencia del input.
    };

    // Envía la incidencia: primero sube la imagen (si existe) y luego manda el formulario.
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let capturaUrl = "";

            // Si hay archivo, se sube y se obtiene la URL de la captura.
            if (archivo) {
                const formDataUpload = new FormData();
                formDataUpload.append("archivo", archivo);

                const resUpload = await fetch("/api/upload", {
                    method: "POST",
                    body: formDataUpload,
                });

                const dataUpload = await resUpload.json();

                if (dataUpload.status_code === 200) {
                    capturaUrl = dataUpload.image.display_url;
                }
            }

            // Envío final de la incidencia al endpoint del backend.
            const response = await fetch("/api/incidencia", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, capturaUrl }),
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.error || "Error al enviar el reporte");
                return;
            }

            // Si todo fue bien, muestra mensaje y limpia formulario + adjunto.
            alert("Incidencia registrada correctamente. Nos pondremos en contacto pronto.");
            setFormData({
                nombreCompleto: "",
                correoElectronico: "",
                tipoIncidencia: "Error Técnico (Bug)",
                telefono: "",
                asunto: "",
                descripcion: "",
            });
            setArchivo(null);
            setPreview("");
        } catch (error) {
            console.error("Error al enviar el reporte:", error);
            alert("Error al enviar el reporte. Intenta de nuevo.");
        } finally {
            onClose();
        }
    };

    return (
        <div className={styles.formCard}>
            <form onSubmit={handleSubmit}>
                {/* datos personales */}
                <div className="row g-2 mb-2 mb-md-4">
                    <div className="col-6">
                        <label htmlFor="nombreCompleto" className={styles.label}>
                            Nombre Completo *
                        </label>
                        <input type="text" id="nombreCompleto" name="nombreCompleto" value={formData.nombreCompleto} placeholder="Ej. Juan Pérez" className={styles.input} onChange={handleChange} required />
                    </div>
                    <div className="col-6">
                        <label htmlFor="telefono" className={styles.label}>
                            Teléfono
                        </label>
                        <input type="tel" id="telefono" name="telefono" value={formData.telefono} placeholder="123 456 789" className={styles.input} onChange={handleChange} pattern="[0-9\s]{9,15}" />
                    </div>
                </div>

                {/* tipo de incidencia y correo de contacto */}
                <div className="row g-2 mb-2 mb-md-4">
                    <div className="col-12 col-md-6">
                        <label htmlFor="tipoIncidencia" className={styles.label}>
                            Tipo de Incidencia *
                        </label>
                        <select id="tipoIncidencia" name="tipoIncidencia" value={formData.tipoIncidencia} className={styles.select} onChange={handleChange} required>
                            <option value="">Selecciona un tipo</option>
                            <option value="Error Técnico (Bug)">Error Técnico (Bug)</option>
                            <option value="Problema de Acceso">Problema de Acceso</option>
                            <option value="Sugerencia de Mejora">Sugerencia de Mejora</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="correoElectronico" className={styles.label}>
                            Correo Electrónico *
                        </label>
                        <input type="email" id="correoElectronico" name="correoElectronico" value={formData.correoElectronico} placeholder="juan.perez@example.com" className={styles.input} onChange={handleChange} required />
                    </div>
                </div>

                {/* asunto */}
                <div className="row g-2 mb-2 mb-md-4">
                    <div className="col-12">
                        <label htmlFor="asunto" className={styles.label}>
                            Asunto *
                        </label>
                        <input type="text" id="asunto" name="asunto" value={formData.asunto} placeholder="Breve resumen del problema" className={styles.input} onChange={handleChange} required />
                    </div>
                </div>

                {/* descripción detallada del problema */}
                <div className="row g-2 mb-2 mb-md-4">
                    <div className="col-12">
                        <label htmlFor="descripcion" className={styles.label}>
                            Descripción Detallada*
                        </label>
                        <textarea rows={2} id="descripcion" name="descripcion" value={formData.descripcion} placeholder="¿Qué incidencia ocurre?..." className={styles.textarea} onChange={handleChange} required></textarea>
                    </div>
                </div>

                {/* carga opcional de captura de pantalla */}
                <div className="row g-2 mb-2 mb-md-4">
                    <div className="col-12 mt-0">
                        <label htmlFor="capturaPantalla" className={styles.label}>
                            Adjuntar Capturas de Pantalla
                        </label>
                        <input id="capturaPantalla" ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                        <div className={`${styles.adjuntarContainer} ${arrastrando ? styles.adjuntarContainerDragActive : ""}`} onClick={() => fileInputRef.current.click()} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                            {preview ? (
                                // Si hay una imagen seleccionada, muestra su vista previa.
                                <Image src={preview} alt="Preview" className={styles.previewImage} width={400} height={180} unoptimized />
                            ) : (
                                // Si no hay imagen, muestra el contenedor para subir una captura.
                                <>
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className={styles.adjuntarIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <div className={styles.adjuntarContent}>
                                        <p className={styles.adjuntarText}>
                                            <span className={styles.adjuntarLink}>Sube una captura</span> o arrastra y suelta aquí
                                        </p>
                                        <p className={styles.adjuntarSubtext}>PNG, JPG, GIF hasta 10MB</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Botones del formulario */}
                <div className={styles.acciones}>
                    <Boton className={styles.formButton} size="small" type="submit" texto="Enviar Reporte" />
                    <Boton className={styles.formButton} size="small" type="button" texto="Cancelar" variant="red" onClick={onClose} />
                </div>
            </form>
        </div>
    );
}
