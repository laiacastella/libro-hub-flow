"use client";

import { useState } from "react";

export default function RegistroAvatarPage() {
    const [archivo, setArchivo] = useState(null);
    const [urlImagen, setUrlImagen] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setArchivo(file);
        if (file) {
            setUrlImagen(URL.createObjectURL(file));
        }
    };

    const handleSubir = async () => {
        if (!archivo) return;

        let urlSubida = "";

        // Subir imagen a Freeimage.host
        const formData = new FormData();
        formData.append("archivo", archivo);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.status_code === 200) {
                urlSubida = data.image.display_url;
                setUrlImagen(urlSubida);
            } else {
                alert("Error al subir la imagen");
                console.log(data);
                return;
            }
        } catch (err) {
            alert("Error al subir la imagen");
            console.error(err);
            return;
        }

        // Guardar solo la URL en la BBDD
        try {
            const res = await fetch("/api/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ foto_perfil: urlSubida }),
            });

            const data = await res.json();
            if (data.success) {
                setMensaje("Imagen guardada con ID: " + data.id_usuario);
            } else {
                setMensaje("Error: " + data.error);
            }
        } catch (err) {
            console.error(err);
            setMensaje("Error al guardar la imagen");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Subir Imagen de Usuario</h1>

            <input type="file" accept="image/*" onChange={handleFileChange} />

            {urlImagen && (
                <div style={{ marginTop: "20px" }}>
                    <h2>Previsualización:</h2>
                    <img src={urlImagen} alt="Previsualización" width={150} />
                </div>
            )}

            <button onClick={handleSubir} style={{ marginTop: "10px" }}>
                Subir y Guardar
            </button>

            {mensaje && <p style={{ marginTop: "20px" }}>{mensaje}</p>}
        </div>
    );
}
