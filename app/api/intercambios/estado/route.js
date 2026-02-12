// app/api/intercambios/estado/route.js
import { db } from "@/lib/db";

export async function PATCH(req) {
  try {
    const { id_intercambio, estado } = await req.json();

    await db.query(
      "UPDATE intercambios SET estado_solicitud = ? WHERE id_intercambio = ?",
      [estado, id_intercambio]
    );

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error al actualizar estado" }, { status: 500 });
  }
}
