"use client";
import styles from "./FormEditarCuenta.module.css";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Boton, Input, Select } from "@/components";
import useUsuario from "@/hooks/useUsuario";
import comprobarPassword from "@/hooks/comprobarPassword";

export default function FormEditarCuenta() {

        const router = useRouter();
        const usuario = useUsuario();
        const [provincias, setProvincias] = useState([]);
        const [poblaciones, setPoblaciones] = useState([]);
        const [nickDisponible, setNickDisponible] = useState(null);
        const [emailDisponible, setEmailDisponible] = useState(null);
        const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");
    
        const [form, setForm] = useState({
            nick_usuario: "",
            email: "",
            password: "",
            repPassword: "",
            nombre: "",
            apellidos: "",
            telefono: "",
            codigo_postal: "",
            id_provincia: "",
            id_poblacion: "",
        });

        // 1. Cargar las provincias de la API al montar el componente
        useEffect(() => {
            fetch("/api/provincias")
                .then((res) => res.json())
                .then((data) => setProvincias(data))
                .catch(err => console.error("Error cargando provincias:", err));
        }, []);

        // 2. Rellenar los campos de texto del usuario e identificar el ID de su provincia por su nombre
        useEffect(() => {
            if (usuario && provincias.length > 0) {
                // Buscamos en la lista de la API qué objeto coincide con el nombre de texto "usuario.provincia"
                const provinciaEncontrada = provincias.find(
                    p => p.provincia.toLowerCase().trim() === usuario.provincia?.toLowerCase().trim()
                );

                const idProvinciaStr = provinciaEncontrada ? String(provinciaEncontrada.id_provincia) : "";
                
                setForm(prev => ({
                    ...prev,
                    nick_usuario: usuario.nick_usuario || "",
                    email: usuario.email || "",
                    nombre: usuario.nombre || "",
                    apellidos: usuario.apellidos || "",
                    telefono: usuario.telefono || "",
                    codigo_postal: usuario.codigo_postal || "",
                    id_provincia: idProvinciaStr, // <-- ¡Ahora sí tiene su ID!
                }));
                
                if (idProvinciaStr) {
                    setProvinciaSeleccionada(idProvinciaStr);
                }
            }
        }, [usuario, provincias]);
    
        // 3. Cargar las poblaciones de esa provincia e identificar el ID de la población por su nombre
        useEffect(() => {
            if (provinciaSeleccionada) {
                fetch(`/api/poblaciones?id_provincia=${provinciaSeleccionada}`)
                    .then((res) => res.json())
                    .then((data) => {
                        if (Array.isArray(data)) {
                            setPoblaciones(data);
                            
                            // Buscamos el ID correspondiente al nombre de texto de la población
                            const poblacionEncontrada = data.find(
                                p => p.poblacion.toLowerCase().trim() === usuario?.poblacion?.toLowerCase().trim()
                            );

                            if (poblacionEncontrada) {
                                setForm(prev => ({
                                    ...prev,
                                    id_poblacion: String(poblacionEncontrada.id_poblacion) // <-- ¡ID de población recuperado!
                                }));
                            }
                        } else {
                            setPoblaciones([]);
                        }
                    })
                    .catch(err => console.error("Error cargando poblaciones:", err));
            } else {
                setPoblaciones([]);
            }
        }, [provinciaSeleccionada, usuario]);

        const timeoutRef = useRef(null);

        const comprobarNick = (nick) => {
            clearTimeout(timeoutRef.current);
            if (!nick || nick === usuario?.nick_usuario) {
                setNickDisponible(null);
                return;
            }
            timeoutRef.current = setTimeout(async () => {
                const res = await fetch(`/api/check-nick?nick=${nick}`);
                const data = await res.json();
                setNickDisponible(data.disponible);
            }, 500);
        };
    
        const comprobarEmail = (email) => {
            clearTimeout(timeoutRef.current);
            if (!email || email === usuario?.email) {
                setEmailDisponible(null);
                return;
            }
            timeoutRef.current = setTimeout(async () => {
                const res = await fetch(`/api/check-email?email=${email}`);
                const data = await res.json();
                setEmailDisponible(data.disponible);
            }, 500);
        };
    
        const provincesOptions = provincias.map(p => ({
            value: String(p.id_provincia),
            label: p.provincia
        }));
    
        const poblacionesOptions = poblaciones.map(p => ({
            value: String(p.id_poblacion),
            label: p.poblacion
        }));
    
        const [mensaje, setMensaje] = useState("");
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setForm(prev => ({
                ...prev,
                [name]: value,
                ...(name === "id_provincia" && { id_poblacion: "" })
            }));

            if (name === "id_provincia") {
                setProvinciaSeleccionada(value);
            }
        };
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            setMensaje("");

            if (form.password || form.repPassword) {
                const errorPassword = comprobarPassword(form.password, form.repPassword);
                if (errorPassword) {
                    setMensaje(errorPassword);
                    return;
                }
            }
    
            try {
                const body = { id_usuario: usuario.id_usuario };

                // Evaluamos los cambios para enviar solo lo modificado
                Object.keys(form).forEach((key) => {
                    if (key === "password" || key === "repPassword") {
                        if (form.password !== "") body.password = form.password;
                    } else if (key === "id_provincia" || key === "id_poblacion") {
                        // Para los selectores, comparamos el nombre actual seleccionado con el texto original del hook
                        const opcionSeleccionada = key === "id_provincia" 
                            ? provincesOptions.find(p => p.value === form[key])?.label 
                            : poblacionesOptions.find(p => p.value === form[key])?.label;

                        const valorOriginalTexto = key === "id_provincia" ? usuario.provincia : usuario.poblacion;

                        if (opcionSeleccionada && opcionSeleccionada !== valorOriginalTexto) {
                            body[key] = form[key];
                        }
                    } else {
                        const valorActual = String(form[key]).trim();
                        const valorOriginal = usuario[key] ? String(usuario[key]).trim() : "";

                        if (valorActual !== valorOriginal && valorActual !== "") {
                            body[key] = form[key];
                        }
                    }
                });
    
                const res = await fetch("/api/usuarios/actualizar", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });
    
                const data = await res.json();
                if (!data.success) {
                    setMensaje(data.error);
                    return;
                }
    
                if (data.success) {
                    // Reconstruimos el objeto para el localStorage guardando los NOMBRES en texto (como le gusta a tu hook)
                    const usuarioActualizado = {
                        ...usuario,
                        ...body,
                        provincia: provincesOptions.find(p => String(p.value) === String(form.id_provincia))?.label || usuario.provincia,
                        poblacion: poblacionesOptions.find(p => String(p.value) === String(form.id_poblacion))?.label || usuario.poblacion,
                    };

                    // Quitamos los IDs para que el localStorage guarde exactamente la estructura que espera tu hook
                    delete usuarioActualizado.id_provincia;
                    delete usuarioActualizado.id_poblacion;
                    delete usuarioActualizado.password;
                    delete usuarioActualizado.repPassword;

                    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioActualizado));
                    window.dispatchEvent(new Event("usuarioActualizado"));
                    router.push("/perfilUsuario");
                    router.refresh();
                }
            } catch (err) {
                console.error(err);
                setMensaje("Error al actualizar la cuenta");
            }
        };

    if (!usuario) {
        return <p style={{ textAlign: "center", margin: "2rem" }}>Cargando datos del perfil...</p>;
    }

    return (
        <form onSubmit={handleSubmit} className={`row g-3 my-4 ${styles.form}`}>
            <div className={`col-12 col-md-6`}>
                <Input label="Nombre:" tipo="text" nombre="nombre" value={form.nombre} onChange={handleChange} />
            </div>

            <div className={`col-12 col-md-6`}>
                <Input label="Apellidos:" tipo="text" nombre="apellidos" value={form.apellidos} onChange={handleChange} />
            </div>

            <div className={`col-12 col-md-6`}>
                <Input
                    label="Nombre de usuario:"
                    tipo="text"
                    nombre="nick_usuario"
                    value={form.nick_usuario}
                    onChange={(e) => {
                        handleChange(e);
                        comprobarNick(e.target.value);
                    }}
                />
                {nickDisponible === false && <p style={{ color: "red" }}>Este usuario ya existe</p>}
                {nickDisponible === true && <p style={{ color: "green" }}>Usuario disponible</p>}
            </div>

            <div className={`col-12 col-md-6`}>
                <Input
                    label="Correo Electrónico:"
                    tipo="email"
                    nombre="email"
                    value={form.email}
                    onChange={(e) => {
                        handleChange(e);
                        comprobarEmail(e.target.value);
                    }}
                />
                {emailDisponible === false && <p style={{ color: "red" }}>Este correo ya esta registrado</p>}
                {emailDisponible === true && <p style={{ color: "green" }}>Correo disponible</p>}
            </div>

            <div className={`col-12 col-md-6`}>
                <Input label="Contraseña:" tipo="password" nombre="password" value={form.password} onChange={handleChange} />
            </div>

            <div className={`col-12 col-md-6`}>
                <Input label="Repetir Contraseña:" tipo="password" nombre="repPassword" value={form.repPassword} onChange={handleChange} />
            </div>

            <div className={`col-12 col-md-6`}>
                <Input label="Teléfono:" tipo="tel" nombre="telefono" value={form.telefono} onChange={handleChange} />
            </div>

            <div className={`col-12 col-md-6`}>
                <Input label="Código Postal:" tipo="text" nombre="codigo_postal" maxLength={5} soloNumeros={true} value={form.codigo_postal} onChange={handleChange} />
            </div>

            <div className={`col-12 col-md-6`}>
                <Select
                    id="provincia"
                    nombre="id_provincia"
                    label="Provincia:"
                    value={form.id_provincia}
                    onChange={handleChange}
                    opciones={provincesOptions}
                    placeholder="Selecciona tu provincia"
                />
            </div>

            <div className={`col-12 col-md-6`}>
                <Select
                    id="poblacion"
                    nombre="id_poblacion"
                    label="Población:"
                    value={form.id_poblacion}
                    onChange={handleChange}
                    opciones={poblacionesOptions}
                    placeholder="Selecciona tu población"
                    disabled={!form.id_provincia}
                />
            </div>

            <div className={`col-12 col-md-6`}>
                {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}
            </div>

            <div className={`col-12 col-md-6`}>
                <div className="row g-2">
                    <div className={`col-12 col-md-6 ${styles.botones}`}>
                        <Boton type="submit" texto="Guardar cambios" size="small" />
                    </div>
                    <div className={`col-12 col-md-6 ${styles.botones}`}>
                        <Boton type="button" texto="Cancelar" variant="red" enlace="perfilUsuario" size="small" />
                    </div>
                </div>
            </div>
        </form>
    );
}