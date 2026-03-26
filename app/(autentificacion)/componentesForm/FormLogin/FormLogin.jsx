"use client";
import { useState } from "react";
import Campo from "../Campo/Campo.jsx";
import Boton from "../Boton/Boton.jsx";
import { Enlaces, PopUpPassReset } from "@/components";
import styles from "../disenoForm.module.css";
import stylesTexto from "./FormLogin.module.css";
import Link from "next/link";

const FormLogin = ({ onLoginSuccess }) => {
    const [identificador, setIdentificador] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");
    const [cargando, setCargando] = useState(false);
    const [mostrarPopup, setMostrarPopup] = useState(false);

    const abrirPopup = () => {
        setMostrarPopup(true);
    };

    const cerrarPopup = () => {
        setMostrarPopup(false);
    };

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
            <form className={styles.estiloForm} onSubmit={manejarSubmit}>
                <div className={styles.contenedorLogo}>
                    <Link href="/">
                        <img src="/logo-h1Negro.svg" alt="logo App" />
                    </Link>
                </div>
                <div className={styles.contenedorLogo}>
                    <img src="icono-inicioSesion.svg" alt="logo inicio sesion" />
                </div>
                <div className={styles.contenedorCampos}>
                    <Campo tipo="text" texto="Nombre de Usuario o Email" nombre="identificador" value={identificador} onChange={(e) => setIdentificador(e.target.value)} />

                    <Campo tipo="password" texto="Contraseña" nombre="contrasena" value={password} onChange={(e) => setPassword(e.target.value)} />

                    {errorLogin && <p className={stylesTexto.errorLogin}>{errorLogin}</p>}

                    <Boton tipo="submit" nomBoton={cargando ? "ENTRANDO..." : "INICIAR SESION"} disabled={cargando} />

                    <div className={stylesTexto.textoLogin}>
                        <Enlaces nomEnlace="¿Olvidaste tu contraseña?" onClick={abrirPopup} />
                        <p>
                            {" "}
                            ¿No tienes una cuenta?
                            <Enlaces nomEnlace="Registrarse" ruta="/registro" />
                        </p>
                    </div>
                </div>
            </form>

            {mostrarPopup && <PopUpPassReset cerrar={cerrarPopup} />}
        </div>
    );
};

export default FormLogin;
