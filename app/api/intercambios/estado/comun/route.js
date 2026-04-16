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

    // Validar aceptación si el nuevo estado es "aceptado"
    const errorAceptacion = await validarAceptacion(id_intercambio, estado);
    if (errorAceptacion) return errorAceptacion;

    // Actualizar el estado del intercambio para ambos usuarios
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

    const intercambioActualizado = {
      id_intercambio,
      estado_usuario_envia: estado,
      estado_usuario_recibe: estado,
    };

    console.log("PATCH /estado/comun actualizado:", intercambioActualizado);

    // Retornar confirmacion de exito
    return new Response(
      JSON.stringify({
        ok: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error PATCH /estado/comun:", error);
    return new Response(JSON.stringify({ error: "Error al actualizar estado comun" }), { status: 500 });
  }
}