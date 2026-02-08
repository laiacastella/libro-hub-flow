import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const data = await req.formData();
        const archivo = data.get("archivo");

        if (!archivo) {
            return NextResponse.json({ error: "No se subió ningún archivo" }, { status: 400 });
        }

        // Creamos FormData para Freeimage.host
        const form = new FormData();
        form.append("key", "6d207e02198a847aa98d0a2a901485a5");
        form.append("action", "upload");
        form.append("source", archivo); // enviamos el archivo directamente
        form.append("format", "json");

        const respuesta = await fetch("https://freeimage.host/api/1/upload", {
            method: "POST",
            body: form,
        });

        const resultado = await respuesta.json();

        return NextResponse.json(resultado);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
