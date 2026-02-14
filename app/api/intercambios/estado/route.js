import { db } from "@/lib/db";

export async function PATCH(req) {
  try {
    const { id_intercambio, estado } = await req.json();

    if (!id_intercambio || !estado) {
      return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });
    }

    await db.query(
      "UPDATE intercambios SET estado_solicitud = ? WHERE id_intercambio = ?",
      [estado, id_intercambio]
    );

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error("Error PATCH /estado:", error);
    return new Response(JSON.stringify({ error: "Error al actualizar estado" }), { status: 500 });
  }
}
