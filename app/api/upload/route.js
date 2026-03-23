import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const data = await req.formData();
        const archivo = data.get("archivo");

        // No hay archivo
        if (!archivo) {
            return NextResponse.json(
                { error: "No se subió ningún archivo" },
                { status: 400 }
            );
        }

        // Tipo archivo inválido
        if (!archivo.type || !archivo.type.startsWith("image/")) {
            return NextResponse.json(
                { error: "Solo se permiten imágenes" },
                { status: 400 }
            );
        }

        // Tamaño máximo (2MB)
        const maxSize = 2 * 1024 * 1024;

        if (archivo.size > maxSize) {
            return NextResponse.json(
                { error: "La imagen es demasiado grande (máx 2MB)" },
                { status: 400 }
            );
        }

        // Tipos permitidos (extra seguridad)
        const tiposValidos = ["image/jpeg", "image/png", "image/webp"];

        if (!tiposValidos.includes(archivo.type)) {
            return NextResponse.json(
                { error: "Formato de imagen no permitido" },
                { status: 400 }
            );
        }

        // Subida a Freeimage
        const form = new FormData();
        form.append("key", "6d207e02198a847aa98d0a2a901485a5");
        form.append("action", "upload");
        form.append("source", archivo);
        form.append("format", "json");

        const respuesta = await fetch("https://freeimage.host/api/1/upload", {
            method: "POST",
            body: form,
        });

        const resultado = await respuesta.json();

        return NextResponse.json(resultado);

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error al subir la imagen" },
            { status: 500 }
        );
    }
}