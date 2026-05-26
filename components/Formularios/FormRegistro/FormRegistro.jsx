"use client";

import { Boton, Input, Select, PopUp } from "@/components";
import styles from './FormRegistro.module.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, User, ShieldCheck, Camera, CheckCircle } from "lucide-react";
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

    const [showSuccess, setShowSuccess] = useState(false);

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

    const manejarRedireccionLogin = () => {
        setShowSuccess(false);
        router.push("/inicioSesion"); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("¡El botón funciona y llamó a handleSubmit!", form);

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
                }
            } 

            setShowSuccess(true);

        } catch (err) {
            console.error("❌ Error completo en el cliente:", err);
            setMensaje(`Error al crear usuario: ${err.message}`);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.encabezado} >
                <blockquote className={styles.frase}> 
                    Elige tu próxima aventura. La puerta está abierta, solo falta que des el primer paso 
                </blockquote>
            </header>

            <form className={styles.formulario} onSubmit={handleSubmit}>
                <div className={styles.fantasma}>
                    <section className={styles.fotoPerfil}> 
                        <div className={styles.seccionTitulo}>
                            <Camera size={25} className={styles.icono}/> 
                            <h2 className={styles.subtitulos}>Foto de Perfil</h2>
                        </div>

                        <div className="row g-1 my-1 justify-content-center">
                            <div className="col-12 col-md-6 text-center">
                                <label htmlFor="foto-avatar" className={styles.avatarContenedor}>
                                    <input 
                                        id="foto-avatar"
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleFileChange} 
                                        className={styles.inputOculto} 
                                    />

                                    <div className={styles.circuloAvatar}>
                                        {preview && preview.trim() !== "" ? (
                                            <Image 
                                                src={preview} 
                                                alt="Preview" 
                                                width={140} 
                                                height={140} 
                                                className={styles.previewImage} 
                                                unoptimized      
                                            />
                                        ) : (
                                            <div className={styles.avatarVacio}></div>
                                        )}
                                        <div className={styles.insigniaCamara}>
                                            <Camera size={18} color="#ffffff" />
                                        </div>
                                    </div>
                                    <span className={styles.textoElegir}>Elegir Foto</span>
                                </label> 
                            </div> 
                        </div> 
                    </section>
                </div>

                <section className={styles.infoGeneral}>
                    <div className={styles.seccionTitulo}>
                        <User size={25} className={styles.icono}/> 
                        <h2 className={styles.subtitulos}>Informacion General</h2>
                    </div>

                    <Input nombre="nombre" tipo="text" placeholder="Escribe tu nombre" value={form.nombre} onChange={handleChange} required />               
                    <Input nombre="apellidos" tipo="text" placeholder="Escribe tus apellidos" value={form.apellidos} onChange={handleChange} required />     
                    <Input nombre="nick_usuario" tipo="text" placeholder="Escribe tu nombre de usuario" value={form.nick_usuario} onChange={(e) => { handleChange(e); comprobarNick(e.target.value); }} required />       
                    
                    {nickDisponible === false && <p style={{ color: "red" }}>Este usuario ya existe</p>}
                    {nickDisponible === true && <p style={{ color: "green" }}>Usuario disponible</p>}

                    <Input nombre="email" tipo="email" placeholder="Correo Electrónico:" value={form.email} onChange={(e) => { handleChange(e); comprobarEmail(e.target.value); }} required />   

                    {emailDisponible === false && <p style={{ color: "red" }}>Este correo ya esta registrado</p>}
                    {emailDisponible === true && <p style={{ color: "green" }}>Correo disponible</p>}

                    <Input nombre="telefono" tipo="tel" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />                 
                </section>

                <section className={styles.seguridadUbi}>
                    <div className={styles.seccionTitulo}>
                        <ShieldCheck size={25} className={styles.icono}/> 
                        <h2 className={styles.subtitulos}>Seguridad y Ubicacion</h2>
                    </div>

                    <Input nombre="password" tipo="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />                 
                    <Input nombre="repPassword" tipo="password" placeholder="Repetir contraseña" value={form.repPassword} onChange={handleChange} required />          
                    
                    <Select id="provincia" name="id_provincia" value={provinciaSeleccionada} onChange={(e) => setProvinciaSeleccionada(e.target.value)} opciones={provinciasOptions} placeholder="Selecciona tu provincia" required />
                    <Select id="poblacion" name="id_poblacion" value={poblacionSeleccionada} onChange={(e) => setPoblacionSeleccionada(e.target.value)} opciones={poblacionesOptions} placeholder="Selecciona tu población" disabled={!provinciaSeleccionada} required />

                    <Input nombre="codigo_postal" tipo="text" placeholder="Código Postal:" value={form.codigo_postal} onChange={handleChange} required maxLength={5} soloNumeros={true} />      
                </section>

    
                {mensaje && (
                    <div className = {styles.errorMensaje} >
                        <p style={{ color: "red", fontWeight: "bold" }}>⚠️ {mensaje}</p>
                    </div>
                )}

                <div className={styles.botonEnviar}>
                    <Boton type="submit" texto="Crear usuario" icono={UserPlus} />
                </div>
            </form>

            
            <PopUp isOpen={showSuccess} onClose={manejarRedireccionLogin} title="¡Registro Completado!">
                <div style={{ textAlign: 'center', padding: '10px' }}>
                    <CheckCircle size={50} color="#63A26C" style={{ marginBottom: '15px' }} />
                    <h3>¡Usuario creado exitosamente!</h3>
                    <p>Bienvenido a la plataforma. Ya puedes iniciar sesión con tus credenciales.</p>
                    <div style={{ marginTop: '20px' }}>
                        <Boton texto="Aceptar" onClick={manejarRedireccionLogin} variant="default" />
                    </div>
                </div>
            </PopUp>    
        </div>
    );
};

export default FormRegistro;
