import { db } from "@/lib/db";
import { paginate } from "@/lib/paginate";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 6;

        const result = await paginate(db, "libros", page, limit);

        return Response.json(result);
    } catch (error) {
        return Response.json(
            { error: "Error BBDD" },
            { status: 500 }
        );
    }
}
