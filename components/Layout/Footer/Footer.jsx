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
                        <Users size={20} aria-hidden="true" />
                        <p className={styles.teamTitleText}>Nuestro Equipo de Desarrollo</p>
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
            <div className={styles.footer}>
                <div className={styles.footerBottom}>
                    <p>
                        <AlertTriangle size={20} color="#63a26c" aria-hidden="true" /> Si tiene alguna
                        <Enlaces nomEnlace="incidencia " onClick={abrirPopupIncidencia} /> relacionada con el funcionamiento del sitio web pongase en contacto con nosotros pulsando
                        <Enlaces nomEnlace="aqui." onClick={abrirPopupIncidencia} />
                    </p>
                    <p>Desarrollo de Aplicaciones Web — IFP 2026</p>
                    <span>
                        <Copyright aria-hidden="true" size="14" /> 2026 LibroHubFlow. Todos los derechos reservados.
                    </span>
                </div>
            </div>

            <PopUpIncidencia isOpen={isPopupIncidenciaOpen} onClose={cerrarPopupIncidencia} />
        </div>
    );
}

function TeamCard({ name, role }) {
    return (
        <div className={styles.teamCard}>
            <div className={styles.avatar}>
                <Users size={18} aria-hidden="true" />
            </div>
            <div>
                <p className={styles.teamName}>{name}</p>
                <p className={styles.teamRole}>{role}</p>
            </div>
        </div>
    );
}
