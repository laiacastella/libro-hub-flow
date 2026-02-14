import { db } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    console.log("ID recibido en API:", params); // Verificar que el ID se recibe correctamente
    const [rows] = await db.query(
      "SELECT * FROM generos WHERE id_genero = ?",
      [id]
    );

    if (rows.length === 0) {
      return Response.json(
        { error: "Género no encontrado" },
        { status: 404 }
      );
    }

    return Response.json(rows[0]);
  } catch (error) {
    return Response.json(
      { error: "Error BBDD" },
      { status: 500 }
    );
  }
}
