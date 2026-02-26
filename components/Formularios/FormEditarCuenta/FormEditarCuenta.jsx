"use client";
import styles from "./FormEditarCuenta.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Boton } from "@/components";

export default function FormEditarCuenta() {

    const [provincias, setProvincias] = useState([]);
    const [poblaciones, setPoblaciones] = useState([]);

    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");

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

    return (
        <form className={styles.form}>
            <div className={styles.formField}>
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" className={styles.input} />
            </div>

            <div className={styles.formField}>
                <label htmlFor="apellidos">Apellidos:</label>
                <input type="text" id="apellidos" name="apellidos" className={styles.input} />
            </div>

            <div className={styles.formField}>
                <label htmlFor="nickUsuario">Nombre de usuario:</label>
                <input type="text" id="nickUsuario" name="nickUsuario" className={styles.input} />
            </div>

            <div className={styles.formField}>
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" name="password" className={styles.input} />
            </div>

            <div className={styles.formField}>
                <label htmlFor="password">Repetir Contraseña:</label>
                <input type="password" id="password" name="password" className={styles.input} />
            </div>

            <div className={styles.formField}>
                <label htmlFor="email">Correo Electrónico:</label>
                <input type="email" id="email" name="email" className={styles.input} />
            </div>

            <div className={styles.formField}>
                <label htmlFor="telefono">Teléfono:</label>
                <input type="tel" id="telefono" name="telefono" className={styles.input} />
            </div>

            <div className={styles.formField}>
                <label htmlFor="codigoPostal">Código Postal:</label>
                <input type="text" id="codigoPostal" name="codigoPostal" className={styles.input} />
            </div>

            <div className={styles.formField}>
                <label htmlFor="provincia">Provincia:</label>
                <select
                    name="provincia"
                    id="provincia"
                    className={styles.input}
                    value={provinciaSeleccionada}
                    onChange={(e) => setProvinciaSeleccionada(e.target.value)}
                >
                    <option value="">Selecciona tu provincia</option>

                    {provincias.map((p) => (
                        <option key={p.id_provincia} value={p.id_provincia}>
                            {p.provincia}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.formField}>
                <label htmlFor="poblacion">Población:</label>
                <select name="poblacion" id="poblacion" className={styles.input}>
                    <option value="">Selecciona tu población</option>

                    {Array.isArray(poblaciones) && poblaciones.map((p) => (
                        <option key={p.id_poblacion} value={p.id_poblacion}>
                            {p.poblacion}
                        </option>
                    ))}
                </select>
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
