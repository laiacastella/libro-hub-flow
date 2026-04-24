export async function PUT(req) {
    try {
        const { id_intercambio } = await req.json();

        if (!id_intercambio) {
            return Response.json(
                { error: "Falta id_intercambio" },
                { status: 400 }
            );
        }

        const [result] = await db.query(
            `
            UPDATE intercambios
            SET fecha_cierre = NOW()
            WHERE id_intercambio = ?
            `,
            [id_intercambio]
        );

        if (result.affectedRows === 0) {
            return Response.json(
                { error: "Intercambio no encontrado" },
                { status: 404 }
            );
        }

        return Response.json({
            message: "Intercambio cerrado correctamente"
        });

    } catch (error) {
        console.error("DB ERROR:", error?.message);
        console.error(error);

        return Response.json(
            { error: "Error BBDD" },
            { status: 500 }
        );
    }
}