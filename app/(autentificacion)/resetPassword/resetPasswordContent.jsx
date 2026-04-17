"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { FormResetPassword, Boton } from "@/components/index";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const token = searchParams.get("token");

    const [loading, setLoading] = useState(true);
    const [validToken, setValidToken] = useState(false);

    useEffect(() => {
        const validateToken = async () => {
            try {
                const res = await fetch("/api/usuarios/validate-reset-token", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token }),
                });

                setValidToken(res.ok);
            } catch (error) {
                setValidToken(false);
            } finally {
                setLoading(false);
            }
        };

        if (token) validateToken();
        else setLoading(false);
    }, [token]);

    if (loading) {
        return (
            <div className={styles.contenedorPagina}>
                <div className={styles.estiloForm}>
                    <p>Validando enlace...</p>
                </div>
            </div>
        );
    }

    if (!validToken) {
        return (
            <div className={styles.contenedorPagina}>
                <div className={styles.estiloForm}>
                    <h2>Enlace inválido o expirado</h2>
                    <p>Solicita un nuevo restablecimiento de contraseña.</p>
                    <Boton texto="Volver al login" onClick={() => router.push("/inicioSesion")} />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.contenedorPagina}>
            <div className={styles.estiloForm}>
                <div className={styles.contenedorLogo}>
                    <img src="/logo-h1Negro.svg" alt="logo" />
                </div>

                <FormResetPassword
                    token={token}
                    onSuccess={() => router.push("/inicioSesion")}
                />
            </div>
        </div>
    );
}