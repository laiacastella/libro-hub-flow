'use client'

import { useRouter } from "next/navigation";
import FormSubirLibro from '../../../components/Formularios/FormSubirLibro/FormSubirLibro';
import styles from './pageSubirL.module.css'

export default function Subirlibro () {
    const router = useRouter();
return (
    <main className = {styles.contenedorMain}>

        <FormSubirLibro />
        
    </main>
)
}

