import React, { useState, useRef } from 'react';
import styles from './Portada.module.css';

const Portada = ({ name, onChange }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Crea URL temporal para ver la foto
      onChange(e); // Avisa al formulario padre
    }
  };

  return (
    <div className={styles.container} onClick={() => fileInputRef.current.click()}>
      <input 
        type="file" 
        name={name} 
        className={styles.hiddenInput} 
        ref={fileInputRef} 
        accept="image/*"
        onChange={handleFile}
      />

      {preview ? (
        <img src={preview} alt="Portada" className={styles.preview} />
      ) : (
        /* El icono que cambia de gris a verde al hacer hover en el padre */
        <span className={styles.icon}>⊕</span>
      )}
    </div>
  );
};

export default Portada;