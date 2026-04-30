import React, { useState, useRef } from 'react';
import styles from './Portada.module.css';
import { useEffect } from 'react';
import { ImagePlus } from 'lucide-react';

const Portada = ({ name, value, onChange, setSubiendoPadre }) => {
  const [preview, setPreview] = useState(null);
  const [subiendoInterno, setSubiendoInterno] = useState(false); 
  const fileInputRef = useRef(null);

 useEffect(() => {
    // Si el valor que viene del formulario es null, limpiamos la vista previa
    if (value === null) {
      setPreview(null);
    }
  }, [value]);

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
   
    <div className={styles.container} onClick={() => !subiendoInterno && fileInputRef.current.click()}>
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
        <div className={styles.placeholder}>
          <ImagePlus className={styles.icon} size={48} strokeWidth={1.5} />
          <p className={styles.text}> Añadir Portada </p>
          <p className={styles.text}> PNG o JPG hasta 10MB</p>
        </div>
      )}
    </div>
  );
};

export default Portada;