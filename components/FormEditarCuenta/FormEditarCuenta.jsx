import styles from "./FormEditarCuenta.module.css";
import { useEffect, useState } from "react";

export default function FormEditarCuenta() {
    // Estado para almacenar las provincias
    const [provincias, setProvincias] = useState([]);
    // Prueba de conexión a la API
    useEffect(() => {
        fetch("/api/provincias")
            .then((res) => res.json())
            .then((data) => setProvincias(data));
    }, []);

    return (
        <form className={styles.form}>
            <div className={styles.formField}>
                <label htmlFor="nombreCompleto">Nombre Completo</label>
                <input type="text" id="nombreCompleto" name="nombreCompleto" className={styles.input} />
            </div>

            <div className={styles.formField}>
                <label htmlFor="nickUsuario">Nombre de usuario</label>
                <input type="text" id="nickUsuario" name="nickUsuario" className={styles.input} />
            </div>

            <div className={styles.formField}>
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" className={styles.input} />
            </div>

            <div className={styles.formField}>
                <label htmlFor="email">Correo Electrónico</label>
                <input type="email" id="email" name="email" className={styles.input} />
            </div>

            <div className={styles.formField}>
                <label htmlFor="telefono">Teléfono</label>
                <input type="tel" id="telefono" name="telefono" className={styles.input} />
            </div>

            <div className={styles.formField}>
                <label htmlFor="codigoPostal">Código Postal</label>
                <input type="text" id="codigoPostal" name="codigoPostal" className={styles.input} />
            </div>

            <div className={styles.formField}>
                <label htmlFor="provincia">Provincia</label>
                <select name="provincia" id="provincia" className={styles.input}>
                    <option value="">Selecciona tu provincia</option>
                    {provincias.map((p) => (
                        <option key={p.id_provincia} value={p.id_provincia}>
                            {p.provincia}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.formField}>
                <label htmlFor="poblacion">Población</label>
                <select name="poblacion" id="poblacion" className={styles.input}>
                    <option value="">Selecciona tu población</option>
                    {/* Aquí se cargan las poblaciones dependiendo de la provincia seleccionada */}
                </select>
            </div>

            <button type="submit">Guardar Cambios</button>
        </form>
    );
}
