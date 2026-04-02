import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { identificador, password } = await req.json();

        if (!identificador || !password) {
            return new Response(JSON.stringify({ error: "Faltan credenciales" }), { status: 400 });
        }

        const loginValue = String(identificador).trim();
        const plainPassword = String(password);

        // Consulta para encontrar al usuario por email o nick_usuario
        const [rows] = await db.query(
            `SELECT 
                u.id_usuario,
                u.nick_usuario,
                u.email,
                u.nombre,
                u.apellidos,
                u.foto_perfil,
                u.password_hash,
                u.telefono,
                u.codigo_postal,
                u.puntuacion_promedio,
                p.provincia AS provincia,
                po.poblacion AS poblacion
            FROM usuarios u
            LEFT JOIN provincias p ON u.id_provincia = p.id_provincia
            LEFT JOIN poblaciones po ON u.id_poblacion = po.id_poblacion
            WHERE u.email = ? OR u.nick_usuario = ?
            LIMIT 1`,
            [loginValue, loginValue],
        );

        // Si no se encuentra el usuario se devuelve un error
        if (!rows.length) {
            return new Response(JSON.stringify({ error: "Usuario o contraseña incorrectos" }), { status: 401 });
        }

        const usuario = rows[0];

        // Aquí se compara la contraseña proporcionada con el hash almacenado en la base de datos.
        const passwordValido = await bcrypt.compare(plainPassword, usuario.password_hash);
        if (!passwordValido) {
            return new Response(JSON.stringify({ error: "Usuario o contraseña incorrectos" }), { status: 401 });
        }

        // Si la contraseña es correcta, devuelve la información del usuario
        return new Response(
            JSON.stringify({
                success: true,
                usuario: {
                    id_usuario: usuario.id_usuario,
                    nick_usuario: usuario.nick_usuario,
                    email: usuario.email,
                    nombre: usuario.nombre,
                    apellidos: usuario.apellidos,
                    telefono: usuario.telefono || null,
                    codigo_postal: usuario.codigo_postal || null,
                    foto_perfil: usuario.foto_perfil || null,
                    puntuacion_promedio: usuario.puntuacion_promedio,
                    provincia: usuario.provincia,
                    poblacion: usuario.poblacion,
                },
            }),
            { status: 200 },
        );
    } catch (error) {
        console.error("Error en login:", error);
        return new Response(JSON.stringify({ error: "Error al iniciar sesion" }), { status: 500 });
    }
}
