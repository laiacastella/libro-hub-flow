"use client";
import { useEffect } from "react";
import styles from "./PopUpIntercambioSolicitado.module.css";
import { Boton } from "@/components/index";

const PopUpIntercambioSolicitado = ({ isOpen, onClose, userName }) => {
    
    // Bloqueo de scroll
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <dialog 
                className={styles.popup} 
                open 
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.container}>
                    <h2 className={styles.titulo}>
                        ¡Ya le avisamos a <strong>{userName}</strong> que te interesa el intercambio!
                    </h2>
                    
                    <div className={styles.cuerpo}>
                        <p>
                            <strong>{userName}</strong> va a recibir un mensaje con tus datos de contacto. 
                            Si él/ella también está interesado/a en hacer match se va a comunicar contigo.
                        </p>
                        
                        <p className={styles.textoSecundario}>
                            Estás dando una segunda vida a un libro y apoyando un modelo más sostenible y consciente. 
                            Cada libro que compartimos es una historia que sigue viva y una huella menos en el planeta.
                        </p>
                        
                        <p className={styles.felicitacion}>¡Felicitaciones por ser parte del cambio!</p>
                    </div>

                    <div className={styles.footer}>
                        {/*componente Boton*/}
                        <Boton 
                            texto="ACEPTAR" 
                            variant="default" 
                            onClick={onClose} 
                            className={styles.botonAceptar}
                        />
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default PopUpIntercambioSolicitado;