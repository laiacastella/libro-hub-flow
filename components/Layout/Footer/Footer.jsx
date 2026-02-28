import { Enlaces } from "@/components";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className = {styles.contenedorFooter}>
            <div className={styles.pie}>
                <div className={styles.informacion}>
            
                    <p>Aplicacion web DAW de IFP 2024/2026</p>
                    <p>Conformado por:</p>
                        <ul>
                            <li>Laia Castellà</li>
                            <li>Luis Miguel Rojo</li>
                            <li>Michael Alexander Medina</li>
                            <li>Thalía Joannely Navarrete</li>
                        </ul>
                    
                </div>

                <div className={styles.incidencia}>
                    <p>
                        Si tiene alguna
                        <Enlaces nomEnlace="Incidencia " ruta="/incidencia" /> relacionada con el funcionamiento del sitio web pongase en contacto con nosotros pulsando
                        <Enlaces nomEnlace="aqui." ruta="/incidencia" />
                    </p>
                </div>
            </div>
        </footer>
    );
}
