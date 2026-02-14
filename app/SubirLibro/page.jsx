'use client'
import Header from '@/components/Header/Header.jsx'
import { useRouter } from "next/navigation";
import FormSubirLibro from '../(autentificacion)/componentesForm/FormSubirLibro/FormSubirLibro';

export default function Subirlibro () {
    const router = useRouter();
return (
    <main>
        <Header/>
        <FormSubirLibro />
        
    </main>
)
}

