import { db } from "@/lib/db";

export async function PATCH(req) {
  try {
    const { id_intercambio, id_libro_ofrecido } = await req.json();
    console.log("PATCH /api/intercambios/libro", { id_intercambio, id_libro_ofrecido });

    if (!id_intercambio || !id_libro_ofrecido) {
      return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });
    }

    // Actualizar libro ofrecido y mover ambos estados individuales a "seleccionado"
    const [result] = await db.query(
      `UPDATE intercambios
       SET id_libro_ofrecido = ?,
           estado_usuario_envia = 'seleccionado',
           estado_usuario_recibe = 'seleccionado'
       WHERE id_intercambio = ?`,
      [id_libro_ofrecido, id_intercambio]
    );

    if (!result.affectedRows) {
      return new Response(JSON.stringify({ error: "Intercambio no encontrado" }), { status: 404 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error("Error PATCH /libro:", error);
    return new Response(JSON.stringify({ error: "Error al actualizar libro ofrecido" }), { status: 500 });
  }
}
