"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function RegistroPage() {
    const [form, setForm] = useState({
        nick_usuario: "",
        email: "",
        password: "",
        nombre: "",
        apellidos: "",
        telefono: "",
        id_provincia: "",
        id_poblacion: "",
    });
    const [mensaje, setMensaje] = useState("");
    const [idUsuario, setIdUsuario] = useState(null);

    const [archivo, setArchivo] = useState(null);
    const [preview, setPreview] = useState("");
    const [urlImagen, setUrlImagen] = useState("");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setArchivo(file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    password_hash: form.password,
                }),
            });

            const data = await res.json();

            if (!data.success) {
                setMensaje("Error: " + data.error);
                return;
            }

            const usuarioId = data.id_usuario;
            setIdUsuario(usuarioId);
            setMensaje("Usuario creado con ID: " + usuarioId);

            if (archivo) {
                const formData = new FormData();
                formData.append("archivo", archivo);

                const resUpload = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                const dataUpload = await resUpload.json();

                if (dataUpload.status_code === 200) {
                    const displayUrl = dataUpload.image.display_url;
                    setUrlImagen(displayUrl);

                    await fetch("/api/usuarios/foto", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id_usuario: usuarioId,
                            foto_perfil: displayUrl,
                        }),
                    });

                    setMensaje("Usuario creado y foto subida correctamente");
                } else {
                    setMensaje("Usuario creado, pero error al subir imagen");
                    console.log(dataUpload);
                }
            }
        } catch (err) {
            console.error(err);
            setMensaje("Error al crear usuario");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Registro de Usuario</h1>

            <form onSubmit={handleSubmit}>
                <input className={styles.inputField} name="nick_usuario" placeholder="Nick" value={form.nick_usuario} onChange={handleChange} required />
                <input className={styles.inputField} name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
                <input className={styles.inputField} name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required />
                <input className={styles.inputField} name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
                <input className={styles.inputField} name="apellidos" placeholder="Apellidos" value={form.apellidos} onChange={handleChange} />
                <input className={styles.inputField} name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
                <input className={styles.inputField} name="id_provincia" placeholder="ID Provincia" type="number" value={form.id_provincia} onChange={handleChange} />
                <input className={styles.inputField} name="id_poblacion" placeholder="ID Población" type="number" value={form.id_poblacion} onChange={handleChange} />

                <input className={styles.inputField} type="file" accept="image/*" onChange={handleFileChange} />
                {preview && (
                    <div className={styles.previewContainer}>
                        <img src={preview} alt="Preview" className={styles.previewImage} />
                    </div>
                )}

                <button className={styles.button} type="submit">
                    Registrar
                </button>
            </form>

            {mensaje && <p className={styles.message}>{mensaje}</p>}

            {urlImagen && (
                <div className={styles.previewContainer}>
                    <h4>Imagen subida:</h4>
                    <img src={urlImagen} alt="Foto subida" className={styles.previewImage} />
                    <p>
                        <a className={styles.link} href={urlImagen} target="_blank" rel="noopener noreferrer">
                            Abrir en otra pestaña
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
}
