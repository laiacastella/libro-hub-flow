"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InfoLibro } from "@/components/InfoLibro/InfoLibro";

export default function FichaLibro({ params }) {
    const { id } = params;
    const router = useRouter();
    const [libro, setLibro] = useState(null);
    
    // Suponiendo que tenemos el ID del usuario logueado (ej:localStorage)
    const idUsuarioLogueado = 1; 

    useEffect(() => {
        // Fetch para obtener los datos del libro por su ID
        fetch(`http://localhost/tu-api/get_libro.php?id=${id}`)
            .then(res => res.json())
            .then(data => {
                // SI EL LIBRO ES MÍO, REDIRIGIR A EDITAR
                if (data.id_propietario === idUsuarioLogueado) {
                    router.push(`/biblioteca/editar/${id}`);
                } else {
                    setLibro(data);
                }
            });
    }, [id]);

    if (!libro) return <p>Cargando...</p>;

    return (
        <main>
            <InfoLibro libro={libro} />
        </main>
    );
}