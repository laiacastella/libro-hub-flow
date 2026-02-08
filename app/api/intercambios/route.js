import { db } from "@/lib/db";

export async function GET() {
    try {
        const [rows] = await db.query(`
            SELECT i.*,
                   ls.titulo AS libro_solicitado_titulo,
                   ls.autor AS libro_solicitado_autor,
                   ls.foto_portada AS libro_solicitado_foto,
                   lo.titulo AS libro_ofrecido_titulo,
                   lo.autor AS libro_ofrecido_autor,
                   lo.foto_portada AS libro_ofrecido_foto
            FROM intercambios i
            LEFT JOIN libros ls ON i.id_libro_solicitado = ls.id_libro
            LEFT JOIN libros lo ON i.id_libro_ofrecido = lo.id_libro
        `);

        return Response.json(rows);
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Error BBDD" }, { status: 500 });
    }
}
