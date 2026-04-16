export async function paginate(
    db,
    table,
    page = 1,
    limit = 6,
    search = "",
    user = null
) {
    const offset = (page - 1) * limit;

    let conditions = [];
    let params = [];

    if (search) {
        conditions.push("(titulo LIKE ? OR autor LIKE ?)");
        params.push(`%${search}%`, `%${search}%`);
    }

    if (user) {
        conditions.push("id_usuario = ?");
        params.push(user);
    }

    const whereClause =
        conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";

    const [totalResult] = await db.query(
        `SELECT COUNT(*) AS total FROM ${table} ${whereClause}`,
        params
    );

    const totalItems = totalResult[0].total;
    const totalPaginas = Math.ceil(totalItems / limit);

    const [rows] = await db.query(
        `SELECT * FROM ${table} ${whereClause} LIMIT ? OFFSET ?`,
        [...params, limit, offset]
    );

    return {
        page,
        limit,
        totalPaginas,
        totalItems,
        data: rows
    };
}