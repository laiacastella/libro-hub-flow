'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from './page.module.css'
import { FormLogin, Enlaces, PopUp, Boton, Input } from "@/components";
import Link from "next/link";

export default function InicioSesion () {

    const router = useRouter ()
    const [openPassword, setOpenPassword] = useState(false);
    const [email, setEmail] = useState("");

    const password = () => {
        setOpenPassword(true);
    };

    const manejarLoginCorrecto = () => {
        router.push('/biblioteca')
    }

    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("");

    const handleEnviar = async () => {
        if (!email) {
            setMensaje("Introduce un email válido");
            setTipoMensaje("error");
            return;
        }

        try {
            setLoading(true);
            setMensaje("");
            setTipoMensaje("");

            const res = await fetch("/api/usuarios/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            await res.json();

            setMensaje("Revisa tu correo para restablecer la contraseña");
            setTipoMensaje("success");
            setEmail("");

        } catch (error) {
            setMensaje("Error de servidor");
            setTipoMensaje("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className = {styles.contenedorPagina}>
            <div className={styles.estiloForm}>
                <div className={styles.contenedorLogo}>
                    <Link href="/">
                        <img src="/logo-h1Negro.svg" alt="logo App" />
                    </Link>
                </div>

                <div className={styles.contenedorLogo}>
                    <img src="icono-inicioSesion.svg" alt="logo inicio sesion" />
                </div>

                <FormLogin onLoginSuccess={manejarLoginCorrecto} />

                <div className={styles.textoLogin}>
                    <Enlaces nomEnlace="¿Olvidaste tu contraseña?" onClick={password} />
                    <p>
                        {" "}
                        ¿No tienes una cuenta?
                        <Enlaces nomEnlace="Registrarse" ruta="/registro" />
                    </p>
                </div>
            </div>

            <PopUp
                isOpen={openPassword}
                onClose={() => setOpenPassword(false)}
                title="Restablecer contraseña"
                cerrarAlHacerClickFuera={true}
                footer={
                    <>
                        <Input
                            tipo="email"
                            placeholder="ejemplo@gmail.com"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Boton
                            texto={loading ? "Enviando..." : "Enviar"}
                            onClick={handleEnviar}
                        />
                    </>
                }>

                <p>Introduce tu dirección de correo electrónico y si es correcto recibirás un enlace para resetear tu contraseña:</p>
                {mensaje && (
                    <p style={{ color: tipoMensaje === "error" ? "red" : "green" }}>
                        {mensaje}
                    </p>
                )}
            </PopUp>
        </main>
    )
}