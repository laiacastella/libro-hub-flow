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
    
        const timeoutRef = useRef(null);

        const comprobarNick = (nick) => {
            clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(async () => {
                if (!nick) return;

                const res = await fetch(`/api/check-nick?nick=${nick}`);
                const data = await res.json();

                setNickDisponible(data.disponible);
            }, 500);
        };
    
        const comprobarEmail = (email) => {
            clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(async () => {
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
    
            const errorPassword = comprobarPassword(form.password, form.repPassword);

            if (errorPassword) {
                setMensaje(errorPassword);
                return;
            }
    
            try {
                const body = {
                    id_usuario: usuario.id_usuario,
                };

                Object.keys(form).forEach((key) => {
                    if (form[key] !== "") {
                        body[key] = form[key];
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
                    const usuarioActualizado = {
                        ...usuario,
                        ...body,
                        provincia: provincias.find(p => p.id_provincia === Number(body.id_provincia))?.provincia || usuario.provincia,
                        poblacion: poblaciones.find(p => p.id_poblacion === Number(body.id_poblacion))?.poblacion || usuario.poblacion,
                    };

                    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioActualizado));
                    window.dispatchEvent(new Event("usuarioActualizado"));

                    router.push("/perfilUsuario");
                    router.refresh();
                }
    
            } catch (err) {
                console.error(err);
                setMensaje("Error al crear usuario");
            }
        };

    return (
        <form onSubmit={handleSubmit} className={`row g-3 my-4 ${styles.form}`}>
            <div className={`col-12 col-md-6`}>
                <Input
                    label="Nombre:"
                    tipo="text"
                    nombre="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                />
            </div>

            <div className={`col-12 col-md-6`}>
                <Input
                    label="Apellidos:"
                    tipo="text"
                    nombre="apellidos"
                    value={form.apellidos}
                    onChange={handleChange}
                />
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
                {nickDisponible === false && (
                    <p style={{ color: "red" }}>Este usuario ya existe</p>
                )}

                {nickDisponible === true && (
                    <p style={{ color: "green" }}>Usuario disponible</p>
                )}
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
                {emailDisponible === false && (
                    <p style={{ color: "red" }}>Este correo ya esta registrado</p>
                )}

                {emailDisponible === true && (
                    <p style={{ color: "green" }}>Correo disponible</p>
                )}
            </div>

            <div className={`col-12 col-md-6`}>
                <Input
                    label="Contraseña:"
                    tipo="password"
                    nombre="password"
                    value={form.password}
                    onChange={handleChange}
                />
            </div>

            <div className={`col-12 col-md-6`}>
                <Input
                    label="Repetir Contraseña:"
                    tipo="password"
                    nombre="repPassword"
                    value={form.repPassword}
                    onChange={handleChange}
                />
            </div>

            <div className={`col-12 col-md-6`}>
                <Input
                    label="Teléfono:"
                    tipo="tel"
                    nombre="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                />
            </div>

            <div className={`col-12 col-md-6`}>
                <Input
                    label="Código Postal:"
                    tipo="text"
                    nombre="codigo_postal"
                    maxLength={5}
                    soloNumeros={true} 
                    value={form.codigo_postal}
                    onChange={handleChange}
                />
            </div>

            <div className={`col-12 col-md-6`}>
                <Select
                    id="provincia"
                    nombre="id_provincia"
                    label="Provincia:"
                    value={form.id_provincia}
                    onChange={handleChange}
                    opciones={provinciasOptions}
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
                {mensaje && <p>{mensaje}</p>}
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
