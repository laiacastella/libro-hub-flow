"use client";

import { Boton, Input, Select } from "@/components";
import styles from './FormRegistro.module.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import Image from "next/image";
import comprobarPassword from "@/hooks/comprobarPassword";

const FormRegistro = () => {

    const router = useRouter();
    const [provincias, setProvincias] = useState([]);
    const [poblaciones, setPoblaciones] = useState([]);
    const [nickDisponible, setNickDisponible] = useState(null);
    const [emailDisponible, setEmailDisponible] = useState(null);
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");
    const [poblacionSeleccionada, setPoblacionSeleccionada] = useState("");

    useEffect(() => {
        fetch("/api/provincias")
            .then((res) => res.json())
            .then((data) => setProvincias(data));
    }, []);

    useEffect(() => {
        if (provinciaSeleccionada) {
            fetch(`/api/poblaciones?id_provincia=${provinciaSeleccionada}`)
                .then((res) => res.json())
                .then((data) => {
                    if (Array.isArray(data)) setPoblaciones(data);
                    else setPoblaciones([]);
                });
        } else {
            setPoblaciones([]);
        }
    }, [provinciaSeleccionada]);

    let timeout;

    const comprobarNick = (nick) => {
        clearTimeout(timeout);

        timeout = setTimeout(async () => {
            if (!nick) return;

            const res = await fetch(`/api/check-nick?nick=${nick}`);
            const data = await res.json();

            setNickDisponible(data.disponible);
        }, 500);
    };

    const comprobarEmail = (email) => {
        clearTimeout(timeout);

        timeout = setTimeout(async () => {
            if (!email) return;

            const res = await fetch(`/api/check-email?email=${email}`);
            const data = await res.json();

            setEmailDisponible(data.disponible);
        }, 500);
    };

    const provinciasOptions = provincias.map(p => ({
        value: p.id_provincia,
        label: p.provincia
    }));

    const poblacionesOptions = poblaciones.map(p => ({
        value: p.id_poblacion,
        label: p.poblacion
    }));

    const [form, setForm] = useState({
        nick_usuario: "",
        email: "",
        password: "",
        repPassword: "",
        nombre: "",
        apellidos: "",
        telefono: "",
        codigo_postal: "",
    });

    const [mensaje, setMensaje] = useState("");
    const [archivo, setArchivo] = useState(null);
    const [preview, setPreview] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setMensaje("Solo se permiten imágenes");
            setArchivo(null);
            setPreview("");
            return;
        }

        const maxSize = 2 * 1024 * 1024;

        if (file.size > maxSize) {
            setMensaje("La imagen es demasiado grande (máx 2MB)");
            setArchivo(null);
            setPreview("");
            return;
        }

        setArchivo(file);
        setPreview(URL.createObjectURL(file));
        setMensaje("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.nombre) {
            setMensaje("Tienes que introducir un Nombre");
            return;
        }
        
        if (!form.apellidos) {
            setMensaje("Tienes que introducir al menos un Apellido");
            return;
        }

        if (!form.nick_usuario) {
            setMensaje("Tienes que introducir un Nombre de usuario");
            return;
        }

        if (!form.email) {
            setMensaje("Tienes que introducir un Correo electronico");
            return;
        }

        if (!form.password) {
            setMensaje("Tienes que introducir una Contraseña");
            return;
        }

        const errorPassword = comprobarPassword(form.password, form.repPassword);

        if (errorPassword) {
            setMensaje(errorPassword);
            return;
        }

        if (!provinciaSeleccionada || !poblacionSeleccionada) {
            setMensaje("Selecciona provincia y población");
            return;
        }

        try {
            let fotoPerfil = "/perfilUsuario.svg";

            const body = {
                nick_usuario: form.nick_usuario,
                email: form.email,
                password: form.password,
                nombre: form.nombre,
                apellidos: form.apellidos,
                telefono: form.telefono || null,
                codigo_postal: form.codigo_postal || null,
                id_provincia: Number(provinciaSeleccionada),
                id_poblacion: Number(poblacionSeleccionada),
                foto_perfil: fotoPerfil,
            };

            const res = await fetch("/api/usuarios/registro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (!data.success) {
                setMensaje(data.error);
                return;
            }

            const usuarioId = data.id_usuario;

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

                    await fetch("/api/usuarios/foto", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id_usuario: usuarioId,
                            foto_perfil: displayUrl,
                        }),
                    });

                    router.push("/inicioSesion");
                } else {
                    router.push("/inicioSesion");
                }
            } else {
                router.push("/inicioSesion");
            }

        } catch (err) {
            console.error(err);
            setMensaje("Error al crear usuario");
        }
    };

    return (
        <div className={`container`}>
            <form className={`row g-3 my-4 ${styles.form}`} onSubmit={handleSubmit}>

                <div className="col-12 col-md-6">
                    <Input label="Nombre: *" tipo="text" nombre="nombre" value={form.nombre} onChange={handleChange} required />
                </div>

                <div className="col-12 col-md-6">
                    <Input label="Apellidos: *" tipo="text" nombre="apellidos" value={form.apellidos} onChange={handleChange} required />
                </div>

                <div className="col-12 col-md-6">
                    <Input label="Nombre de usuario: *" tipo="text" nombre="nick_usuario" value={form.nick_usuario} 
                        onChange={(e) => { handleChange(e); comprobarNick(e.target.value); }} required />
                    {nickDisponible === false && (
                        <p style={{ color: "red" }}>Este usuario ya existe</p>
                    )}

                    {nickDisponible === true && (
                        <p style={{ color: "green" }}>Usuario disponible</p>
                    )}
                </div>

                <div className="col-12 col-md-6">
                    <Input label="Correo Electrónico: *" tipo="email" nombre="email" value={form.email}
                        onChange={(e) => { handleChange(e); comprobarEmail(e.target.value); }} required />
                    {emailDisponible === false && (
                        <p style={{ color: "red" }}>Este correo ya esta registrado</p>
                    )}

                    {emailDisponible === true && (
                        <p style={{ color: "green" }}>Correo disponible</p>
                    )}
                </div>

                <div className="col-12 col-md-6">
                    <Input label="Contraseña: *" tipo="password" nombre="password" value={form.password} onChange={handleChange} required />
                </div>

                <div className="col-12 col-md-6">
                    <Input label="Repetir Contraseña: *" tipo="password" nombre="repPassword" value={form.repPassword} onChange={handleChange} required />
                </div>

                <div className="col-12 col-md-6">
                    <Input label="Teléfono:" tipo="tel" nombre="telefono" value={form.telefono} onChange={handleChange} />
                </div>

                <div className="col-12 col-md-6">
                    <Input label="Código Postal:" tipo="text" nombre="codigo_postal" value={form.codigo_postal} onChange={handleChange} maxLength={5} soloNumeros={true} />
                </div>

                <div className="col-12 col-md-6">
                    <Select
                        label="Provincia: *"
                        value={provinciaSeleccionada}
                        onChange={(e) => setProvinciaSeleccionada(e.target.value)}
                        opciones={provinciasOptions}
                        placeholder="Selecciona tu provincia"
                        required
                    />
                </div>

                <div className="col-12 col-md-6">
                    <Select
                        label="Población: *"
                        value={poblacionSeleccionada}
                        onChange={(e) => setPoblacionSeleccionada(e.target.value)}
                        opciones={poblacionesOptions}
                        placeholder="Selecciona tu población"
                        disabled={!provinciaSeleccionada}
                        required
                    />
                </div>

                <div className="row g-3 my-4 justify-content-center">
                    <div className="col-12 col-md-6 text-center">
                        <Input label="Imagen de perfil:" className={styles.inputField} tipo="file" accept="image/*" onChange={handleFileChange} />

                        {preview && (
                            <div className={styles.previewContainer}>
                                <Image src={preview} alt="Preview" width={300} height={300} className={styles.previewImage} unoptimized />
                            </div>
                        )}
                    </div>
                </div>

                <div className="row g-3 my-4 justify-content-center">
                    <div className="col-12 text-center">
                        <p>Todos los campos con * son obligatorios</p>
                        {mensaje && <p>{mensaje}</p>}
                    </div>

                    <div className="col-12 text-center">
                        <Boton type="submit" texto="Crear usuario" icono={UserPlus} />
                    </div>
                </div>

            </form>
        </div>
    );
};

export default FormRegistro;