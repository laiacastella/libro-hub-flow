"use client";

import Header from "@/components/Header/page.jsx";
import Footer from "@/components/Footer/page.jsx";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function EditarCuenta() {
    
    const router = useRouter();

    return (
        <main>
            <Header />

            <div className={styles.fondo}>
                <h2 className={styles.titulo}>Mi información personal</h2>

                <div className={styles.perfil}>
                    <div className={styles.foto}>
                        <img src="/perfilUsuario.svg" alt="perfilUsuario" />
                        <br /><br />
                        <button
                            type="button"
                            className={styles.boton}
                            /*onClick={}*/
                            >
                            Cambiar foto <br />
                            de perfil
                        </button>
                    </div>
                    <div className={styles.datos}>
                        <h2>Nombre Apellidos (Nombre de usuario)</h2>
                        <h3>Ciudad, Provincia</h3>
                        <h3>Correo electrónico</h3>
                        <h3>Número de teléfono</h3>
                    </div>
                </div>

                <div>
                    <form className={styles.formulario} /*onSubmit={handleSubmit}*/>
                        <div className={styles.columnas}>
                            <div className={styles.columna}>
                            <label className={styles.label}>
                                Nombre completo:
                                <input className={styles.text} />
                            </label>

                            <label className={styles.label}>
                                Nombre de usuario
                                <input className={styles.text} />
                            </label>

                            <label className={styles.label}>
                                Teléfono
                                <input className={styles.text} />
                            </label>
                            </div>

                            <div className={styles.columna}>
                            <label className={styles.label}>
                                Correo electrónico
                                <input className={styles.text} />
                            </label>

                            <label className={styles.label}>
                                Código postal
                                <input className={styles.text} />
                            </label>

                            <label className={styles.label}>
                                Contraseña
                                <input className={styles.text} />
                            </label>
                            </div>
                        </div>

                        <div className={styles.botones}>
                            <button
                                type="button"
                                className={styles.cancelar}
                                onClick={() => router.push("/PerfilUsuarioPropio")}
                                >
                                Cancelar
                            </button>

                            <button type="submit" className={styles.guardar}>
                                Guardar cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer /> 
        </main>
    );
}