"use client";

import styles from "./PopUpCambiarFoto.module.css";
import { Input, Boton } from "@/components/index";
import Image from "next/image";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import useUsuario from "@/hooks/useUsuario";
import { useEffect, useState } from "react";

const PopUpCambiarFoto = ({ cerrar }) => {

    const router = useRouter();

    useEffect(() => {
        document.body.classList.add("no-scroll");
        return () => document.body.classList.remove("no-scroll");
    }, []);

    const usuario = useUsuario();
    const [mensaje, setMensaje] = useState("");
    const [archivo, setArchivo] = useState(null);
    const [preview, setPreview] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setMensaje("Solo se permiten imágenes");
            return;
        }

        const maxSize = 2 * 1024 * 1024;

        if (file.size > maxSize) {
            setMensaje("La imagen es demasiado grande (máx 2MB)");
            return;
        }

        setArchivo(file);
        setPreview(URL.createObjectURL(file));
        setMensaje("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!archivo) {
            setMensaje("Selecciona una imagen");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("archivo", archivo);

            const resUpload = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const dataUpload = await resUpload.json();

            if (dataUpload.status_code !== 200) {
                setMensaje("Error al subir la imagen");
                return;
            }

            const displayUrl = dataUpload.image.display_url;

            await fetch("/api/usuarios/actualizar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_usuario: usuario.id_usuario,
                    foto_perfil: displayUrl,
                }),
            });

            const usuarioActualizado = {
                ...usuario,
                foto_perfil: displayUrl
            };

            localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioActualizado));
            window.dispatchEvent(new Event("usuarioActualizado"));

            cerrar();
            router.refresh();

        } catch (err) {
            console.error(err);
            setMensaje("Error al cambiar la foto");
        }
    };

    return (
        <div className={styles.fondo} onClick={cerrar}>
            <div className={styles.contenido} onClick={(e) => e.stopPropagation()}>
                <Boton texto={<X />} variant="cerrar" title="Cerrar ventana" className={styles.cerrarX} onClick={cerrar} />

                <h2>Cambiar foto de perfil</h2>

                <Image 
                    src={usuario?.foto_perfil || "/perfilUsuario.svg"}
                    alt="perfil" 
                    width={100} 
                    height={100} 
                    className="rounded-circle" 
                    unoptimized 
                />

                <p className={styles.texto}>Selecciona una nueva imagen para tu perfil:</p>

                <form onSubmit={handleSubmit}>
                    <div className={styles.cambioFoto}>
                        <Input className={styles.inputField} tipo="file" accept="image/*" onChange={handleFileChange} />
                        {preview && (
                            <div className={styles.previewContainer}>
                                <Image 
                                    src={preview}
                                    alt="Preview"
                                    width={300}
                                    height={300}
                                    className={styles.previewImage}
                                    unoptimized
                                />
                            </div>
                        )}
                    </div>

                    <Boton type="submit" texto="Cambiar foto" />
                </form>

                {mensaje && <p>{mensaje}</p>}
            </div>
        </div>
    );
};

export default PopUpCambiarFoto;