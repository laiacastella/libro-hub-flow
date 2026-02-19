
import { Enlaces } from "@/components";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <main>
            <div className={styles.pie}>
                <div className={styles.informacion}>
                    <p>Aplicacion web realizada por el grupo 3 de alumnos de DAW de IFP 2024/2026</p>
                    <p>Formado por:
                        Laia Castellà,
                        Luis Miguel Rojo,
                        Michael Alexander Medina y
                        Thalía Joannely Navarrete</p>
                </div>

                <div className={styles.incidencia}>
                    <p>
                        Si tiene alguna
                        <Enlaces 
                            nomEnlace="Incidencia " 
                            ruta="/Incidencia"
                        /> relacionada con el funcionamiento de la web 
                        pongase en contacto con nosotros pulsando
                        <Enlaces 
                            nomEnlace="aqui." 
                            ruta="/Incidencia"
                        />
                    </p>
                </div>
            </div>
        </main>
    );
}
