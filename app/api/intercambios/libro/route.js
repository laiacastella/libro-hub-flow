// app/api/intercambios/libro/route.js
import { db } from "@/lib/db";

export async function PATCH(req) {
  try {
    const { id_intercambio, id_libro_ofrecido } = await req.json();

    await db.query(
      "UPDATE intercambios SET id_libro_ofrecido = ? WHERE id_intercambio = ?",
      [id_libro_ofrecido, id_intercambio]
    );

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error al actualizar libro ofrecido" }, { status: 500 });
  }
}
