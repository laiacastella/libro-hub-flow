export async function paginate(
    db,
    table,
    page = 1,
    limit = 6,
    search = ""
) {
    const offset = (page - 1) * limit;

    let whereClause = "";
    let params = [];

    if (search) {
        whereClause = "WHERE titulo LIKE ? OR autor LIKE ?";
        params.push(`%${search}%`, `%${search}%`);
    }

    // COUNT con filtro
    const [totalResult] = await db.query(
        `SELECT COUNT(*) AS total FROM ${table} ${whereClause}`,
        params
    );

    const totalItems = totalResult[0].total;
    const totalPaginas = Math.ceil(totalItems / limit);

    // SELECT con filtro
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