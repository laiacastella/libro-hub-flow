import { db } from "@/lib/db";

export async function POST(req) {
    try {
       
        const body = await req.json();
        const { 
            id_usuario, 
            titulo, 
            autor, 
            foto_portada, 
            estado_fisico, 
            descripcion, 
            id_genero 
        } = body;

        if (!id_usuario || !titulo || !autor || !id_genero || !estado_fisico) {
            return new Response(
                JSON.stringify({ success: false, error: "Faltan campos obligatorios para registrar el libro" }), 
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const disponibilidad = 1; 
        const fecha_publicacion = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
        
        const idUsuarioNum = Number(id_usuario);
        const idGeneroNum = Number(id_genero);

        const querySQL = `
            INSERT INTO libros 
            (id_usuario, titulo, autor, foto_portada, estado_fisico, disponibilidad, descripcion, id_genero, fecha_publicacion) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [resultado] = await db.query(querySQL, [
            idUsuarioNum, 
            titulo, 
            autor, 
            foto_portada || null,
            estado_fisico, 
            disponibilidad, 
            descripcion || "",  
            idGeneroNum, 
            fecha_publicacion
        ]);

  
        return new Response(
            JSON.stringify({ 
                success: true, 
                id_libro: resultado.insertId,
                message: "¡Libro publicado con éxito en LibroHubFlow!" 
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error("❌ Error en API Libros:", error.message);
        
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: "Error interno al procesar el registro en la base de datos" 
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}