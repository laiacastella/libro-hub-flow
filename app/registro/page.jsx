"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './registro.module.css';

export default function Registro() {
  const [formData, setFormData] = useState({
    nick: '', email: '', password: '', nombre: '', 
    apellidos: '', telefono: '', cp: '', provincia: '', poblacion: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const enviar = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/registro', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
    if(res.ok) alert("¡Usuario creado con éxito!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src="/logo-librohub.png" alt="LibroHub Flow" className={styles.logo} />
        
        <form onSubmit={enviar}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nombre:</label>
            <input className={styles.input} name="nombre" onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Apellidos:</label>
            <input className={styles.input} type="apellidos" name="apellidos" onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Nick:</label>
            <input className={styles.input} name="nick" onChange={handleChange} />
          </div>

           <div className={styles.formGroup}>
            <label className={styles.label}>Email:</label>
            <input className={styles.input} type="email" name="email" onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password:</label>
            <input className={styles.input} type="password" name="password" onChange={handleChange} />
          </div>

           <div className={styles.formGroup}>
            <label className={styles.label}>Móvil:</label>
            <input className={styles.input} type="telefono" name="telefono" onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Provincia/Ciudad (IDs):</label>
            <div className={styles.inputGroup}>
                <input className={styles.inputSmall} name="provincia" placeholder="Prov" onChange={handleChange} />
                <input className={styles.inputSmall} name="poblacion" placeholder="Pob" onChange={handleChange} />
            </div>
          </div>
          
          <button type="submit" className={styles.button}>
            CREAR USUARIO 👤+
          </button>
        </form>
        
        <p className={styles.footerText}>
          ¿Ya tienes una cuenta? <Link href="/login" className={styles.link}>Iniciar Sesión</Link>
        </p>
      </div>
    </div>
  );
}