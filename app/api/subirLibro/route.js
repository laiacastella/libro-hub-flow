import { db } from "@/lib/db";

// POST para insertar un nuevo libro
export async function POST(req) {
    try {
        // 1. Extraemos los datos que vienen del FormSubirLibro
        // Nota: id_usuario vendrá del hook que usas en el frontend y se envía en el body
        const { 
            id_usuario, 
            titulo, 
            autor, 
            foto_portada, 
            estado_fisico, 
            descripcion, 
            id_genero 
        } = await req.json();

        // 2. Validación de datos obligatorios según tu tabla SQL
        if (!id_usuario || !titulo || !autor || !id_genero || !estado_fisico) {
            return new Response(
                JSON.stringify({ success: false, error: "Faltan campos obligatorios" }), 
                { status: 400 }
            );
        }

        // 3. Preparar datos automáticos
        const disponibilidad = 1; // 1 = Disponible
        const fecha_publicacion = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        // 4. Insertar en la tabla 'libros'
        const [resultado] = await db.query(
            `INSERT INTO libros 
            (id_usuario, titulo, autor, foto_portada, estado_fisico, disponibilidad, descripcion, id_genero, fecha_publicacion) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                id_usuario, 
                titulo, 
                autor, 
                foto_portada, 
                estado_fisico, 
                disponibilidad, 
                descripcion, 
                id_genero, 
                fecha_publicacion
            ]
        );

        // 5. Respuesta exitosa
        return new Response(
            JSON.stringify({ 
                success: true, 
                id_libro: resultado.insertId,
                message: "Libro registrado correctamente" 
            }),
            { status: 200 }
        );

    } catch (error) {
        console.error("Error en API Libros:", error);
        return new Response(
            JSON.stringify({ success: false, error: "Error al guardar el libro en el servidor" }),
            { status: 500 }
        );
    }
}