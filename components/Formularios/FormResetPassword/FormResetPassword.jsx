"use client";

import { useState } from "react";
import { Input, Boton } from "@/components";
import styles from "./FormResetPassword.module.css";
import comprobarPassword from "@/hooks/comprobarPassword";

const FormResetPassword = ({ token, onSuccess }) => {
    const [password_hash, setPassword] = useState("");
    const [repPassword, setRepPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!password_hash || !repPassword) {
            setError("Rellena todos los campos");
            return;
        }

        const errorPassword = comprobarPassword(password_hash, repPassword);

        if (errorPassword) {
            setError(errorPassword);
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("/api/usuarios/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    password_hash,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Error al cambiar contraseña");
                return;
            }

            setSuccess("Contraseña actualizada correctamente");

            setTimeout(() => {
                onSuccess?.();
            }, 1500);

        } catch (error) {
            setError("Error de servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input
                tipo="password"
                placeholder="Nueva contraseña"
                value={password_hash}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Input
                tipo="password"
                placeholder="Repetir contraseña"
                value={repPassword}
                onChange={(e) => setRepPassword(e.target.value)}
            />

            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}

            <Boton
                type="submit"
                texto={loading ? "Guardando..." : "Cambiar contraseña"}
                disabled={loading}
            />
        </form>
    );
};

export default FormResetPassword;