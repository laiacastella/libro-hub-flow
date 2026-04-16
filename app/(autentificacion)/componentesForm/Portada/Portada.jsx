import React, { useState, useRef } from 'react';
import styles from './Portada.module.css';

const Portada = ({ name, onChange, setSubiendoPadre }) => {
  const [preview, setPreview] = useState(null);
  const [subiendoInterno, setSubiendoInterno] = useState(false); 
  const fileInputRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1.vista previa y bloquear botón del padre
    setPreview(URL.createObjectURL(file));
    setSubiendoInterno(true); 
    setSubiendoPadre(true);   

    const formData = new FormData();
    formData.append("archivo", file); 

    try {
      const res = await fetch("/api/upload", { 
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.image?.url) {
        const urlFinal = data.image.url;
        
        onChange({ target: { name: name, value: urlFinal } });
      } else {
          alert("La API no devolvió una URL válida");
      }

    } catch (error) {
      console.error("Error al subir:", error);
      alert("No se pudo subir la imagen al servidor");
    } finally {
 
      setSubiendoInterno(false);
      setSubiendoPadre(false); // Desbloqueamos el botón 
    }
  };

  return (
   
    <div className={styles.container} onClick={() => fileInputRef.current.click()}>
      <input 
        type="file" 
        ref={fileInputRef} 
        className={styles.hiddenInput} 
        onChange={handleFile} 
        accept="image/*" 
      />
      
      {/* Feedback visual mientras la imagen viaja al servidor */}
      {subiendoInterno && <div className={styles.loader}>Subiendo...</div>}
      
      {preview ? (
        <img src={preview} className={styles.preview} alt="Portada" />
      ) : (
        <span className={styles.icon}>⊕</span>
      )}
    </div>
  );
};

export default Portada;