import { db } from "@/lib/db";

// Validar que si el estado es "aceptado", el intercambio tenga un libro ofrecido seleccionado
async function validarAceptacion(idIntercambio, estado) {
  if (estado !== "aceptado") return null;

    // Consultar el intercambio para verificar si tiene libro ofrecido
  const [rows] = await db.query(
    "SELECT id_libro_ofrecido FROM intercambios WHERE id_intercambio = ? LIMIT 1",
    [idIntercambio]
  );

  // Si no se encuentra el intercambio o no tiene libro ofrecido, retornar error
  if (!rows.length || !rows[0].id_libro_ofrecido) {
    return new Response(
      JSON.stringify({ error: "Debes seleccionar un libro ofrecido antes de aceptar el intercambio" }),
      { status: 400 }
    );
  }

  return null;
}

// PATCH comun: actualiza el estado de propietario y solicitante a la vez
export async function PATCH(req) {
  try {
    const { id_intercambio, estado } = await req.json();

    // Validar que se reciban los datos necesarios
    if (!id_intercambio || !estado) {
      return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });
    }

    // Validar aceptacion
    const errorAceptacion = await validarAceptacion(id_intercambio, estado);
    if (errorAceptacion) return errorAceptacion;

    // Si es aceptado, obtener IDs de libros y marcar como reservados
    if (estado === "aceptado") {
      const [intercambioRows] = await db.query(
        "SELECT id_libro_solicitado, id_libro_ofrecido FROM intercambios WHERE id_intercambio = ? LIMIT 1",
        [id_intercambio]
      );

      if (!intercambioRows.length) {
        return new Response(JSON.stringify({ error: "Intercambio no encontrado" }), { status: 404 });
      }

      const { id_libro_solicitado, id_libro_ofrecido } = intercambioRows[0];

      // Actualizar intercambio
      await db.query(
        `UPDATE intercambios SET estado_usuario_envia = ?, estado_usuario_recibe = ? WHERE id_intercambio = ?`,
        [estado, estado, id_intercambio]
      );

      // Marcar libros como reservados
      await db.query(
        "UPDATE libros SET disponibilidad = 'reservado' WHERE id_libro IN (?, ?)",
        [id_libro_solicitado, id_libro_ofrecido]
      );

      // Rechazar otros intercambios que involucren estos libros
      await db.query(
        `UPDATE intercambios 
         SET estado_usuario_envia = 'rechazado', 
             estado_usuario_recibe = 'rechazado' 
         WHERE id_intercambio != ? 
           AND (estado_usuario_envia NOT IN ('finalizado', 'rechazado', 'eliminado') 
                OR estado_usuario_recibe NOT IN ('finalizado', 'rechazado', 'eliminado'))
           AND (id_libro_solicitado IN (?, ?) OR id_libro_ofrecido IN (?, ?))`,
        [id_intercambio, id_libro_solicitado, id_libro_ofrecido, id_libro_solicitado, id_libro_ofrecido]
      );

      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // Para otros estados, solo actualizar intercambio
    const [result] = await db.query(
      `UPDATE intercambios 
      SET estado_usuario_envia = ?, 
      estado_usuario_recibe = ? 
      WHERE id_intercambio = ?`,
      [estado, estado, id_intercambio]
    );
    
    // Si no se afectó ninguna fila, el intercambio no se encontró
    if (!result.affectedRows) {
      return new Response(JSON.stringify({ error: "Intercambio no encontrado" }), { status: 404 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error("Error PATCH /estado/comun:", error);
    return new Response(JSON.stringify({ error: error.message || "Error al actualizar estado comun" }), { status: 500 });
  }
}