"use client";
import { FormEditarCuenta, Boton, Input, EscribirTexto, PopUp } from "@/components/index";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import useUsuario from "@/hooks/useUsuario";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditarCuenta() {

    const usuario = useUsuario();
    const router = useRouter();

    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [archivo, setArchivo] = useState(null);
    const [preview, setPreview] = useState("");

    const abrirPopup = () => setMostrarPopup(true);
    const cerrarPopup = () => setMostrarPopup(false);

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

            cerrarPopup();
            router.refresh();

        } catch (err) {
            console.error(err);
            setMensaje("Error al cambiar la foto");
        }
    };

    return (
        <div className={`container my-4 ${styles.fondo}`}>
            <div className={styles.fondo}>
                <div>
                    <h2 className={styles.titulo}>
                        <Link href="perfilUsuario" >
                            <Undo2 size="30" color="#000000"/> 
                        </Link>
                        {" "}Mi información personal
                    </h2>
                </div>

                <div className={`row ${styles.perfil}`}>
                    <div className={`col-12 col-md-4 text-center ${styles.foto}`}>
                        <Image 
                            src={usuario?.foto_perfil || "/perfilUsuario.svg"}
                            alt="perfil" 
                            width={200} 
                            height={200} 
                            className={styles.fotoPerfil}
                            unoptimized 
                        />
                        <Boton type="button" onClick={abrirPopup} texto="Cambiar foto de perfil" size="small"/>
                    </div>

                    <div className={`col-12 col-md-8 ${styles.datos}`}>
                        <EscribirTexto texto={`${usuario?.nombre} ${usuario?.apellidos} (${usuario?.nick_usuario})`} Tipo="h2" velocidad="30" />
                        <EscribirTexto texto={`${usuario?.email}`} Tipo="h3" velocidad="30" />
                        <EscribirTexto texto={`${usuario?.poblacion}, ${usuario?.provincia}`} Tipo="h3" velocidad="30" />
                        <EscribirTexto texto={`${usuario?.codigo_postal}`} Tipo="h3" velocidad="30" />
                        <EscribirTexto texto={`${usuario?.telefono}`} Tipo="h3" velocidad="30" />
                    </div>
                </div>

                <div className={`row ${styles.form}`}>
                    <div>
                        <FormEditarCuenta />
                    </div>
                </div>
            </div>

            <PopUp
                isOpen={mostrarPopup}
                onClose={cerrarPopup}
                title="Cambiar foto de perfil"
                cerrarAlHacerClickFuera={true}
            >

                <div className={styles.contenido} onClick={(e) => e.stopPropagation()}>
                    <Image 
                        src={usuario?.foto_perfil || "/perfilUsuario.svg"}
                        alt="perfil" 
                        width={300}
                        height={300} 
                        className={styles.fotoPerfil}
                        unoptimized 
                    />

                    <p className={styles.texto}>Selecciona una nueva imagen para tu perfil:</p>

                    <form onSubmit={handleSubmit}>
                        <div className={styles.cambioFoto}>
                            <Input tipo="file" accept="image/*" onChange={handleFileChange} />

                            {preview && (
                                <div className={styles.previewContainer}>
                                    <Image 
                                        src={preview}
                                        alt="Preview"
                                        width={300}
                                        height={300}
                                        className={styles.fotoPerfil}
                                        unoptimized
                                    />
                                </div>
                            )}
                        </div>

                        <Boton type="submit" texto="Cambiar foto" />
                    </form>
                </div>
            </PopUp>
        </div>
    );
}
