'use client'

import { useRouter } from "next/navigation";
import FormSubirLibro from '../../(autentificacion)/componentesForm/FormSubirLibro/FormSubirLibro';

export default function Subirlibro () {
    const router = useRouter();
return (
    <main>

        <FormSubirLibro />
        
    </main>
)
}

