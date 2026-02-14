import { db } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    console.log("ID recibido en API:", params); // Verificar que el ID se recibe correctamente
    const [rows] = await db.query(
      "SELECT libros.*, generos.tipo_genero FROM libros INNER JOIN generos ON libros.id_genero = generos.id_genero WHERE libros.id_libro = ?;",
      [id],
    );

    if (rows.length === 0) {
      return Response.json({ error: "Libro no encontrado" }, { status: 404 });
    }

    return Response.json(rows[0]);
  } catch (error) {
    return Response.json({ error: "Error BBDD" }, { status: 500 });
  }
}
