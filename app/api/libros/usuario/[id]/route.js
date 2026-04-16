import { db } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const [rows] = await db.query(
      "SELECT * FROM libros WHERE id_usuario = ?",
      [id]
    );

    return Response.json(rows);
  } catch (error) {
    return Response.json(
      { error: "Error BBDD" },
      { status: 500 }
    );
  }
}
