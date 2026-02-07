"use client";

import HeaderHome from "@/components/HeaderHome/HeaderHome.jsx";
import Footer from "@/components/Footer/Footer.jsx";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
    // Estado para almacenar las provincias
    const [provincias, setProvincias] = useState([]);
    // Prueba de conexión a la API
    useEffect(() => {
        fetch("/api/usuarios")
            .then((res) => res.json())
            .then((data) => setProvincias(data));
    }, []);

    return (
        <>
            <HeaderHome />
            <main>
                {provincias.map((p) => (
                    <div key={p.id_usuario}>
                        <p>{p.nombre}</p>
                        <img src={p.foto_perfil} alt="" />
                    </div>
                ))}
                <div className={styles.bienvenida}>
                    <div className={styles.explicacionMasBoton}>
                        <div className={styles.explicacion}>
                            <strong>LibroFlowHub</strong> es la plataforma web de intercambios de libros donde la pasión por la lectura fluye sin límites. Descubre nuevas historias, dale una segunda vida a tus libros y comienza tu próximo capítulo con un solo clic.
                            <b>Un proceso simple para descubrir tu proxima lectura.</b>
                        </div>
                        <button className={styles.boton} onClick={() => router.push("")}>
                            Encuentra tu libro
                        </button>
                    </div>
                </div>

                <div className={styles.porque}>
                    <h2>¿Por qué LibroHubFlow?</h2>

                    <div className={styles.cards}>
                        <div className={styles.card}>
                            <img src="/icono-card1-home.svg" alt="card-one" />
                            <p>Añade facilmente los libros que quieres intercambiar</p>
                        </div>
                        <div className={styles.card}>
                            <img src="/icono-card2-home.svg" alt="card-two" />
                            <p>Explora miles de ejemplares de otros usuarios y solicita los que te interesen con un solo clic</p>
                        </div>
                        <div className={styles.card}>
                            <img src="/icono-card3-home.svg" alt="card-three" />
                            <p>Una vez aceptado el intercambio , coordina el envio con el otro usuario</p>
                        </div>
                        <div className={styles.card}>
                            <img src="/icono-card4-home.svg" alt="card-four" />
                            <p>Intercambiaste, leíste... ¡Ahora inspira! ¿Lo prestas o lo recomiendas?</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
