'use client';
import { useRouter } from "next/navigation";
import FormRegistro from '../componentesForm/FormRegistro/FormRegistro.jsx';
import styles from '../loginFondo.module.css'
export default function Registro() {
    const router = useRouter();
    return (
       
           <main className = {styles.contenedorPagina}>
          <FormRegistro/>
          </main>
    )
}