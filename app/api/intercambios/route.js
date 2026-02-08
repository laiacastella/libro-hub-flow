import { db } from "@/lib/db";

export async function GET() {
    try {
        const [rows] = await db.query(`
            SELECT intercambios.*,
                solicitado.titulo AS libro_solicitado_titulo,
                solicitado.autor AS libro_solicitado_autor,
                solicitado.foto_portada AS libro_solicitado_foto,
                ofrecido.titulo AS libro_ofrecido_titulo,
                ofrecido.autor AS libro_ofrecido_autor,
                ofrecido.foto_portada AS libro_ofrecido_foto
            FROM intercambios
            LEFT JOIN libros solicitado
                ON intercambios.id_libro_solicitado = solicitado.id_libro
            LEFT JOIN libros ofrecido
                ON intercambios.id_libro_ofrecido = ofrecido.id_libro
            WHERE intercambios.estado_solicitud != 'eliminado';
        `);

        return Response.json(rows);
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Error BBDD" }, { status: 500 });
    }
}

export async function PATCH(req) {
    const { id_intercambio, estado } = await req.json();

    await db.query("UPDATE intercambios SET estado_solicitud = ? WHERE id_intercambio = ?", [estado, id_intercambio]);

    return Response.json({ ok: true });
}
