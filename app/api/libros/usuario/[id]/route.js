import { db } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const soloDisponibles = searchParams.get("solo_disponibles") === "true";

    const query = soloDisponibles
      ? "SELECT * FROM libros WHERE id_usuario = ? AND disponibilidad = 'disponible'"
      : "SELECT * FROM libros WHERE id_usuario = ?";

    const [rows] = await db.query(query, [id]);

    return Response.json(rows);
  } catch (error) {
    return Response.json(
      { error: "Error BBDD" },
      { status: 500 }
    );
  }
}
