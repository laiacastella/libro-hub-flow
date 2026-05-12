"use client";
import PopUp from "@/components/UI/PopUp/PopUp";
import { Boton } from "@/components/index";
import styles from "./PopUpIntercambioSolicitado.module.css";

const PopUpIntercambioSolicitado = ({ isOpen, onClose, userName }) => {
  // Definimos el footer que le pasaremos al PopUp base
  const footerModal = (
    <div className={styles.footerCentered}>
      <Boton 
        texto="ACEPTAR" 
        variant="default" 
        size="large" 
        onClick={onClose} 
      />
    </div>
  );

  return (
    <PopUp
      isOpen={isOpen}
      onClose={onClose}
      footer={footerModal}
      cerrarAlHacerClickFuera={true}
      popupClassName={styles.customContainer} 
    >
      <div className={styles.content}>
        <h2 className={styles.titulo}>
          ¡Ya le avisamos a <strong>{userName}</strong> que te interesa el intercambio!
        </h2>
        
        <div className={styles.textoCuerpo}>
          <p>
            <strong>{userName}</strong> va a recibir un mensaje con tus datos de contacto. 
            Si también está interesad@ en hacer match se va a comunicarse contigo.
          </p>
          
          <p className={styles.sostenibilidad}>
            Estás dando una segunda vida a un libro y apoyando un modelo más sostenible y consciente. 
            Cada libro que compartimos es una historia que sigue viva y una huella menos en el planeta.
          </p>
          
          <p className={styles.felicitacion}>¡Felicitaciones por ser parte del cambio!</p>
        </div>
      </div>
    </PopUp>
  );
};

export default PopUpIntercambioSolicitado;