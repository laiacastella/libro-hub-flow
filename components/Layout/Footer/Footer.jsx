"use client";
import styles from "./Footer.module.css";
import { Users, AlertTriangle, Copyright } from "lucide-react";
import { useState } from "react";
import Enlaces from "@/components/UI/Enlaces/Enlaces";
import PopUpIncidencia from "@/components/PopUps/PopUpIncidencia/PopUpIncidencia";

export default function Footer() {
    const [isPopupIncidenciaOpen, setIsPopupIncidenciaOpen] = useState(false);

    const abrirPopupIncidencia = () => {
        setIsPopupIncidenciaOpen(true);
    };

    const cerrarPopupIncidencia = () => {
        setIsPopupIncidenciaOpen(false);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                {/* Equipo */}
                <div className={styles.teamSection}>
                    <div className={styles.teamTitle}>
                        <Users size={20} />
                        <h5>Nuestro Equipo de Desarrollo</h5>
                    </div>

                    <div className={styles.teamGrid}>
                        <TeamCard name="Michael Alexander Medina" role="Desarrollador Fullstack" />
                        <TeamCard name="Thalía Joannely Navarrete" role="Desarrolladora Fullstack" />
                        <TeamCard name="Luis Miguel Rojo" role="Desarrollador Fullstack" />
                        <TeamCard name="Laia Castellà" role="Desarrolladora Fullstack" />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerBottom}>
                    <p>
                        <AlertTriangle size={20} color="#63a26c" /> Si tiene alguna
                        <Enlaces nomEnlace="incidencia " onClick={abrirPopupIncidencia} /> relacionada con el funcionamiento del sitio web pongase en contacto con nosotros pulsando
                        <Enlaces nomEnlace="aqui." onClick={abrirPopupIncidencia} />
                    </p>
                    <p>Desarrollo de Aplicaciones Web — IFP 2026</p>
                    <span>
                        <Copyright size="14" /> 2026 LibroHubFlow. Todos los derechos reservados.
                    </span>
                </div>
            </footer>

            <PopUpIncidencia isOpen={isPopupIncidenciaOpen} onClose={cerrarPopupIncidencia} />
        </div>
    );
}

function TeamCard({ name, role }) {
    return (
        <div className={styles.teamCard}>
            <div className={styles.avatar}>
                <Users size={18} />
            </div>
            <div>
                <h4>{name}</h4>
                <p>{role}</p>
            </div>
        </div>
    );
}
