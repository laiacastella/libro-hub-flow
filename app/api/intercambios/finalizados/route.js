import { db } from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id_usuario = searchParams.get("user");

    if (!id_usuario) {
      return new Response(JSON.stringify({ error: "Falta id_usuario" }), { status: 400 });
    }

    const [rows] = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM intercambios
      WHERE 
        (id_usuario_envia = ? OR id_usuario_recibe = ?)
        AND estado_usuario_envia = 'finalizado'
        AND estado_usuario_recibe = 'finalizado'
      `,
      [id_usuario, id_usuario]
    );

    return new Response(
      JSON.stringify({ total: rows[0].total }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Error GET /intercambios/finalizados:", error);

    return new Response(
      JSON.stringify({ error: "Error al obtener intercambios finalizados" }),
      { status: 500 }
    );
  }
}