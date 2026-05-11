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

// PATCH individual: actualiza solo la columna del usuario que actua (envia o recibe)
export async function PATCH(req) {
  try {
    const { id_intercambio, estado, id_usuario_actual } = await req.json();

    // Validar que se reciban los datos necesarios
    if (!id_intercambio || !estado || !id_usuario_actual) {
      return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });
    }

    // Validar aceptacion
    const errorAceptacion = await validarAceptacion(id_intercambio, estado);
    if (errorAceptacion) return errorAceptacion;

    const [rows] = await db.query(
      `SELECT 
      id_usuario_recibe, 
      id_usuario_envia, 
      estado_usuario_envia, 
      estado_usuario_recibe 
      FROM intercambios 
      WHERE id_intercambio = ? 
      LIMIT 1`,
      [id_intercambio]
    );

    if (!rows.length) {
      return new Response(JSON.stringify({ error: "Intercambio no encontrado" }), { status: 404 });
    }

     // Determinar si actualiza la columna de quien envia o quien recibe
    const intercambio = rows[0]; // asignar el intercambio encontrado a una variable
    const idUsuarioActual = Number(id_usuario_actual); // id del usuario que realiza la acción
    const esUsuarioEnvia = idUsuarioActual === Number(intercambio.id_usuario_envia); // true o false
    const esUsuarioRecibe = idUsuarioActual === Number(intercambio.id_usuario_recibe);

    if (!esUsuarioEnvia && !esUsuarioRecibe) {
      return new Response(JSON.stringify({ error: "Usuario no autorizado" }), { status: 403 });
    }

    const columnaObjetivo = esUsuarioEnvia ? "estado_usuario_envia" : "estado_usuario_recibe";
    
    // query para actualizar
    await db.query(
      `UPDATE intercambios 
      SET ${columnaObjetivo} = ? 
      WHERE id_intercambio = ?`,
      [estado, id_intercambio]
    );

    // Verificar si ambos finalizaron para archivar libros
    const [statusRows] = await db.query(
      `SELECT id_libro_ofrecido, id_libro_solicitado, estado_usuario_envia, estado_usuario_recibe FROM intercambios WHERE id_intercambio = ? LIMIT 1`,
      [id_intercambio]
    );

    if (statusRows.length) {
      const s = statusRows[0];
      const enviaValorar = String(s.estado_usuario_envia) === "valorar";
      const recibeValorar = String(s.estado_usuario_recibe) === "valorar";
      
      if (enviaValorar && recibeValorar) {
        await db.query(
          "UPDATE libros SET disponibilidad = 'archivado' WHERE id_libro IN (?, ?)",
          [s.id_libro_ofrecido, s.id_libro_solicitado]
        );
      }
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error("Error PATCH /estado/individual:", error);
    return new Response(JSON.stringify({ error: "Error al actualizar estado individual" }), { status: 500 });
  }
}