export async function paginate(db, table, page = 1, limit = 6) {
    const offset = (page - 1) * limit;

    const [totalResult] = await db.query(
        `SELECT COUNT(*) AS total FROM ${table}`
    );

    const totalItems = totalResult[0].total;
    const totalPaginas = Math.ceil(totalItems / limit);

    const [rows] = await db.query(
        `SELECT * FROM ${table} LIMIT ? OFFSET ?`,
        [limit, offset]
    );

    return {
        page,
        limit,
        totalPaginas,
        totalItems,
        data: rows
    };
}
