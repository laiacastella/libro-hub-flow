"use client";

import { useState } from "react";
import { Boton, Input } from "@/components";
import { UserRoundKey } from "lucide-react";
import styles from "./FormLogin.module.css";

const FormLogin = ({ onLoginSuccess }) => {
    const [identificador, setIdentificador] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");
    const [cargando, setCargando] = useState(false);

    

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setErrorLogin("");

        if (!identificador.trim() || !password) {
            setErrorLogin("Introduce usuario/email y contraseña");
            return;
        }

        try {
            setCargando(true);

            const response = await fetch("/api/usuarios/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    identificador: identificador.trim(),
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorLogin(data?.error || "No se pudo iniciar sesión");
                return;
            }

            localStorage.setItem("usuarioLogueado", JSON.stringify(data.usuario));
            onLoginSuccess?.(data.usuario);
        } catch (error) {
            setErrorLogin("Error de conexión. Inténtalo de nuevo.");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div>
            <form className={styles.form} onSubmit={manejarSubmit}>
                <Input tipo="text" placeholder="Nombre de Usuario o Email" nombre="identificador" value={identificador} onChange={(e) => setIdentificador(e.target.value)} />

                <Input tipo="password" placeholder="Contraseña" nombre="contrasena" value={password} onChange={(e) => setPassword(e.target.value)} />

                {errorLogin && <p className={styles.errorLogin}>{errorLogin}</p>}

                <Boton type="submit" icono={UserRoundKey} texto={cargando ? "ENTRANDO..." : "INICIAR SESION"} disabled={cargando} />
            </form>
        </div>
    );
};

export default FormLogin;
