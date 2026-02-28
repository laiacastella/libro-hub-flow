"use client";
import styles from "./FormEditarCuenta.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Boton, Input, Select } from "@/components";

export default function FormEditarCuenta() {

    const [provincias, setProvincias] = useState([]);
    const [poblaciones, setPoblaciones] = useState([]);

    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");
    const [poblacionSeleccionada, setPoblacionSeleccionada] = useState("");

    // Cargar provincias al iniciar
    useEffect(() => {
        fetch("/api/provincias")
            .then((res) => res.json())
            .then((data) => setProvincias(data));
    }, []);

    // Cargar poblaciones cuando cambia la provincia
    useEffect(() => {
        if (provinciaSeleccionada) {
            fetch(`/api/poblaciones?id_provincia=${provinciaSeleccionada}`)
                .then((res) => res.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        setPoblaciones(data);
                    } else {
                        setPoblaciones([]);
                    }
                });
        } else {
            setPoblaciones([]);
        }
    }, [provinciaSeleccionada]);

    const provinciasOptions = provincias.map(p => ({
        value: p.id_provincia,
        label: p.provincia
    }));

    const poblacionesOptions = poblaciones.map(p => ({
        value: p.id_poblacion,
        label: p.poblacion
    }));

    return (
        <form className={styles.form}>
            <div className={styles.formField}>
                <Input label="Nombre:" tipo="text" id="nombre" nombre="nombre" />
            </div>

            <div className={styles.formField}>
                <Input label="Apellidos:" tipo="text" id="apellidos" nombre="apellidos" />
            </div>

            <div className={styles.formField}>
                <Input label="Nombre de usuario:" tipo="text" id="nickUsuario" nombre="nickUsuario" />
            </div>

            <div className={styles.formField}>
                <Input label="Contraseña:" tipo="password" id="password" nombre="password" />
            </div>

            <div className={styles.formField}>
                <Input label="Repetir Contraseña:" tipo="password" id="repPassword" nombre="repPassword" />
            </div>

            <div className={styles.formField}>
                <Input label="Correo Electrónico:" tipo="email" id="email" nombre="email" />
            </div>

            <div className={styles.formField}>
                <Input label="Teléfono:" tipo="tel" id="telefono" nombre="telefono" />
            </div>

            <div className={styles.formField}>
                <Input label="Código Postal:" tipo="text" id="codigoPostal" nombre="codigoPostal" maxLength={5} soloNumeros={true} />
            </div>

            <div className={styles.formField}>
                <Select
                    id="provincia"
                    nombre="provincia"
                    label="Provincia:"
                    value={provinciaSeleccionada}
                    onChange={(e) => setProvinciaSeleccionada(e.target.value)}
                    opciones={provinciasOptions}
                    placeholder="Selecciona tu provincia"
                />
            </div>

            <div className={styles.formField}>
                <Select
                    id="poblacion"
                    nombre="poblacion"
                    label="Población:"
                    value={poblacionSeleccionada}
                    onChange={(e) => setPoblacionSeleccionada(e.target.value)}
                    opciones={poblacionesOptions}
                    placeholder="Selecciona tu población"
                    disabled={!provinciaSeleccionada}
                />
            </div>

            <div className={styles.botones}>
                <Boton type="submit" texto="Guardar cambios" />
                <Link href="/perfilUsuarioPropio">
                    <Boton type="button" texto="Cancelar" variant="red" />
                </Link>
            </div>
        </form>
    );
}
