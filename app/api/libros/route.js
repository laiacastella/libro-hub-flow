import { db } from "@/lib/db";
import { paginate } from "@/lib/paginate";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const user = searchParams.get("user");

        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 6;
        const search = searchParams.get("search") || "";

        const result = await paginate(db, "libros", page, limit, search, user);

        return Response.json(result);
    } catch (error) {
        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
