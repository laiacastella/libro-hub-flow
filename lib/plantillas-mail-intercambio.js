import { db } from "./db";
import { transporter } from "./mailer";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// Plantilla base para emails
const crearPlantillaEmail = (titulo, contenido) => `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #444; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 15px;">
        <h2 style="color: #2e7d32; text-align: center;">${titulo}</h2>
        
        ${contenido}
        
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        
        <p style="font-size: 13px; color: #999; text-align: center;">
            Gracias por ser parte de nuestra comunidad y por ayudar a dar una segunda vida a los libros. <br>
            Con cariño, el equipo de <strong>LibroHubFlow</strong>.
        </p>
    </div>
`;

// Email 1: Intercambio aceptado - notificar al solicitante
export async function enviarEmailIntercambioAceptado(idIntercambio) {
    try {
        const [info] = await db.query(
            `SELECT 
                i.id_usuario_envia,
                i.id_usuario_recibe,
                i.id_libro_solicitado,
                i.id_libro_ofrecido,
                u_envia.email AS email_solicitante,
                u_envia.nombre AS nombre_solicitante,
                u_recibe.nombre AS nombre_propietario,
                u_recibe.telefono AS telefono_propietario,
                l_solicitado.titulo AS titulo_solicitado,
                l_ofrecido.titulo AS titulo_ofrecido
            FROM intercambios i
            JOIN usuarios u_envia ON u_envia.id_usuario = i.id_usuario_envia
            JOIN usuarios u_recibe ON u_recibe.id_usuario = i.id_usuario_recibe
            JOIN libros l_solicitado ON l_solicitado.id_libro = i.id_libro_solicitado
            LEFT JOIN libros l_ofrecido ON l_ofrecido.id_libro = i.id_libro_ofrecido
            WHERE i.id_intercambio = ?`,
            [idIntercambio]
        );

        if (info.length === 0) return;

        const {
            email_solicitante,
            nombre_solicitante,
            nombre_propietario,
            telefono_propietario,
            titulo_solicitado,
            titulo_ofrecido,
            id_usuario_envia,
        } = info[0];

        const enlaceSolicitud = `${BASE_URL}/perfilUsuario?tab=solicitudes&id=${id_usuario_envia}`;

        const contenido = `
            <p style="font-size: 16px; line-height: 1.6;">
                ¡Hola, ${nombre_solicitante}!
            </p>
            
            <p style="font-size: 16px; line-height: 1.6;">
                <strong>${nombre_propietario}</strong> ha aceptado tu solicitud de intercambio.
            </p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 10px; margin: 20px 0;">
                <p style="margin: 5px 0; font-size: 15px;">
                    <strong>Tu libro solicitado:</strong> "${titulo_solicitado}"
                </p>
                <p style="margin: 5px 0; font-size: 15px;">
                    <strong>Libro ofrecido:</strong> "${titulo_ofrecido || "No especificado"}"
                </p>
                <p style="margin: 5px 0; font-size: 15px;">
                    <strong>Contacto de ${nombre_propietario}:</strong> ${telefono_propietario || "No disponible"}
                </p>
            </div>
            
            <p style="font-size: 15px; color: #666; font-style: italic; text-align: center;">
                "La lectura es la conversación con los muertos. El intercambio de libros es la conversación con los vivos."
            </p>

            <div style="text-align: center; margin: 30px 0;">
                <a href="${enlaceSolicitud}" 
                   style="background-color: #2e7d32; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                    Ver detalles del intercambio
                </a>
            </div>
        `;

        await transporter.sendMail({
            from: `"LibroHubFlow" <${process.env.EMAIL_USER}>`,
            to: email_solicitante,
            subject: `¡Tu intercambio ha sido aceptado!`,
            html: crearPlantillaEmail("Intercambio Aceptado", contenido),
        });
    } catch (e) {
        console.error("Error al enviar email de aceptación:", e.message);
    }
}

// Email 2: Intercambio rechazado - notificar al solicitante
export async function enviarEmailIntercambioRechazado(idIntercambio) {
    try {
        const [info] = await db.query(
            `SELECT 
                i.id_usuario_envia,
                i.id_usuario_recibe,
                i.id_libro_solicitado,
                u_envia.email AS email_solicitante,
                u_envia.nombre AS nombre_solicitante,
                u_recibe.nombre AS nombre_propietario,
                l_solicitado.titulo AS titulo_solicitado
            FROM intercambios i
            JOIN usuarios u_envia ON u_envia.id_usuario = i.id_usuario_envia
            JOIN usuarios u_recibe ON u_recibe.id_usuario = i.id_usuario_recibe
            JOIN libros l_solicitado ON l_solicitado.id_libro = i.id_libro_solicitado
            WHERE i.id_intercambio = ?`,
            [idIntercambio]
        );

        if (info.length === 0) return;

        const {
            email_solicitante,
            nombre_solicitante,
            nombre_propietario,
            titulo_solicitado,
        } = info[0];

        const enlaceBiblioteca = `${BASE_URL}/biblioteca`;

        const contenido = `
            <p style="font-size: 16px; line-height: 1.6;">
                Hola, ${nombre_solicitante}.
            </p>
            
            <p style="font-size: 16px; line-height: 1.6;">
                Lamentamos informarte que <strong>${nombre_propietario}</strong> ha rechazado tu solicitud de intercambio para el libro "${titulo_solicitado}".
            </p>
            
            <p style="font-size: 16px; line-height: 1.6;">
                No te desanimes, hay muchos otros libros esperando por ti en nuestra comunidad.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${enlaceBiblioteca}" 
                   style="background-color: #2e7d32; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                    Explorar más libros
                </a>
            </div>
            
            <p style="font-size: 15px; color: #666; font-style: italic; text-align: center;">
                "Cada rechazo nos acerca a la oportunidad correcta."
            </p>
        `;

        await transporter.sendMail({
            from: `"LibroHubFlow" <${process.env.EMAIL_USER}>`,
            to: email_solicitante,
            subject: `Tu solicitud de intercambio no ha sido aceptada`,
            html: crearPlantillaEmail("Intercambio Rechazado", contenido),
        });
    } catch (e) {
        console.error("Error al enviar email de rechazo:", e.message);
    }
}

// Email 3: Intercambio completado (ambos han valorado) - notificar a ambos
export async function enviarEmailIntercambioCompletado(idIntercambio) {
    try {
        const [info] = await db.query(
            `SELECT 
                i.id_usuario_envia,
                i.id_usuario_recibe,
                i.id_libro_solicitado,
                i.id_libro_ofrecido,
                u_envia.email AS email_envia,
                u_envia.nombre AS nombre_envia,
                u_recibe.email AS email_recibe,
                u_recibe.nombre AS nombre_recibe,
                l_solicitado.titulo AS titulo_solicitado,
                l_ofrecido.titulo AS titulo_ofrecido
            FROM intercambios i
            JOIN usuarios u_envia ON u_envia.id_usuario = i.id_usuario_envia
            JOIN usuarios u_recibe ON u_recibe.id_usuario = i.id_usuario_recibe
            JOIN libros l_solicitado ON l_solicitado.id_libro = i.id_libro_solicitado
            LEFT JOIN libros l_ofrecido ON l_ofrecido.id_libro = i.id_libro_ofrecido
            WHERE i.id_intercambio = ?`,
            [idIntercambio]
        );

        if (info.length === 0) return;

        const {
            email_envia,
            nombre_envia,
            email_recibe,
            nombre_recibe,
            titulo_solicitado,
            titulo_ofrecido,
        } = info[0];

        const contenidoEmail = (nombreUsuario, nombreOtro, libroRecibido, libroEntregado) => {
            return `
                <p style="font-size: 16px; line-height: 1.6;">
                    ¡Felicidades, ${nombreUsuario}!
                </p>
                
                <p style="font-size: 16px; line-height: 1.6;">
                    Tu intercambio con <strong>${nombreOtro}</strong> se ha completado exitosamente.
                </p>
                
                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 10px; margin: 20px 0;">
                    <p style="margin: 5px 0; font-size: 15px;">
                        <strong>Libro recibido:</strong> "${libroRecibido}"
                    </p>
                    <p style="margin: 5px 0; font-size: 15px;">
                        <strong>Libro entregado:</strong> "${libroEntregado || "No especificado"}"
                    </p>
                </div>
                
                <p style="font-size: 16px; line-height: 1.6;">
                    Gracias por confiar en LibroHubFlow. esperamos que disfrutes de tu nuevo libro.
                </p>
                
                <p style="font-size: 15px; color: #666; font-style: italic; text-align: center;">
                    "Un libro es un regalo que puedes abrir una y otra vez."
                </p>
            `;
        };

        // Email al solicitante (envía)
        await transporter.sendMail({
            from: `"LibroHubFlow" <${process.env.EMAIL_USER}>`,
            to: email_envia,
            subject: `¡Intercambio completado con éxito!`,
            html: crearPlantillaEmail(
                "Intercambio Completado",
                contenidoEmail(nombre_envia, nombre_recibe, titulo_solicitado, titulo_ofrecido)
            ),
        });

        // Email al propietario (recibe)
        await transporter.sendMail({
            from: `"LibroHubFlow" <${process.env.EMAIL_USER}>`,
            to: email_recibe,
            subject: `¡Intercambio completado con éxito!`,
            html: crearPlantillaEmail(
                "Intercambio Completado",
                contenidoEmail(nombre_recibe, nombre_envia, titulo_ofrecido, titulo_solicitado)
            ),
        });
    } catch (e) {
        console.error("Error al enviar email de intercambio completado:", e.message);
    }
}

// Email 4: Recordatorio al otro usuario cuando uno confirma (notificar que falta confirmar)
export async function enviarEmailRecordatorioConfirmar(idIntercambio, idUsuarioDestino) {
    try {
        const [info] = await db.query(
            `SELECT 
                i.id_usuario_envia,
                i.id_usuario_recibe,
                i.id_libro_solicitado,
                i.id_libro_ofrecido,
                i.estado_usuario_envia,
                i.estado_usuario_recibe,
                u_envia.nombre AS nombre_envia,
                u_envia.email AS email_envia,
                u_recibe.nombre AS nombre_recibe,
                u_recibe.email AS email_recibe,
                l_solicitado.titulo AS titulo_solicitado,
                l_ofrecido.titulo AS titulo_ofrecido
            FROM intercambios i
            JOIN usuarios u_envia ON u_envia.id_usuario = i.id_usuario_envia
            JOIN usuarios u_recibe ON u_recibe.id_usuario = i.id_usuario_recibe
            JOIN libros l_solicitado ON l_solicitado.id_libro = i.id_libro_solicitado
            LEFT JOIN libros l_ofrecido ON l_ofrecido.id_libro = i.id_libro_ofrecido
            WHERE i.id_intercambio = ?`,
            [idIntercambio]
        );

        if (info.length === 0) return;

        const intercambio = info[0];
        
        // Determinar si es el usuario que envía o recibe
        const esUsuarioEnvia = Number(idUsuarioDestino) === Number(intercambio.id_usuario_envia);
        
        // Verificar que el usuario aún no haya confirmado
        const estadoUsuario = esUsuarioEnvia ? intercambio.estado_usuario_envia : intercambio.estado_usuario_recibe;
        if (estadoUsuario !== "aceptado") {
            return;
        }
        
        const nombreUsuario = esUsuarioEnvia ? intercambio.nombre_envia : intercambio.nombre_recibe;
        const emailUsuario = esUsuarioEnvia ? intercambio.email_envia : intercambio.email_recibe;
        const nombreOtro = esUsuarioEnvia ? intercambio.nombre_recibe : intercambio.nombre_envia;
        const libroRecibido = esUsuarioEnvia ? intercambio.titulo_solicitado : intercambio.titulo_ofrecido;
        
        // Enlace directo para confirmar desde el email
        const enlaceConfirmar = `${BASE_URL}/api/intercambios/confirmar-email?id_intercambio=${idIntercambio}&id_usuario=${idUsuarioDestino}`;
        
        const contenido = `
            <p style="font-size: 16px; line-height: 1.6;">
                ¡Hola, ${nombreUsuario}!
            </p>
            
            <p style="font-size: 16px; line-height: 1.6;">
                <strong>${nombreOtro}</strong> ya ha confirmado que recibió su libro en el intercambio.
            </p>
            
            <div style="background-color: #e8f5e9; padding: 15px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #4caf50;">
                <p style="margin: 5px 0; font-size: 15px;">
                    <strong>📚 Tu libro:</strong> "${libroRecibido}"
                </p>
                <p style="margin: 5px 0; font-size: 15px;">
                    <strong>👤 Intercambio con:</strong> ${nombreOtro}
                </p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6;">
                ¿Tú ya recibiste tu libro? Confirma la entrega y valora a ${nombreOtro} para completar el intercambio.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${enlaceConfirmar}" 
                   style="background-color: #2e7d32; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; font-size: 16px;">
                    ✅ Confirmar que recibí mi libro
                </a>
            </div>
            
            <p style="font-size: 14px; color: #666; text-align: center; margin-top: 20px;">
                Si el botón no funciona, copia y pega este enlace en tu navegador:<br>
                <span style="word-break: break-all; color: #2e7d32;">${enlaceConfirmar}</span>
            </p>
            
            <p style="font-size: 15px; color: #666; font-style: italic; text-align: center;">
                "Un libro compartido es una historia vivida dos veces."
            </p>
        `;

        await transporter.sendMail({
            from: `"LibroHubFlow" <${process.env.EMAIL_USER}>`,
            to: emailUsuario,
            subject: `📬 ${nombreOtro} ya confirmó el intercambio. ¿Y tú?`,
            html: crearPlantillaEmail("Tu intercambio está casi completo", contenido),
        });
    } catch (e) {
        console.error("Error al enviar email de recordatorio:", e.message);
    }
}

// Email 5: Notificación de nueva valoración recibida
export async function enviarEmailNuevaValoracion(idValoracion) {
    try {
        const [info] = await db.query(
            `SELECT 
                v.id_usuario_evaluador,
                v.id_usuario_evaluado,
                v.puntuacion,
                v.valoracion,
                u_evaluador.nombre AS nombre_evaluador,
                u_evaluador.nick_usuario AS nick_evaluador,
                u_evaluado.email AS email_evaluado,
                u_evaluado.nombre AS nombre_evaluado,
                i.id_intercambio,
                l_solicitado.titulo AS titulo_solicitado,
                l_ofrecido.titulo AS titulo_ofrecido
            FROM valoraciones v
            JOIN usuarios u_evaluador ON u_evaluador.id_usuario = v.id_usuario_evaluador
            JOIN usuarios u_evaluado ON u_evaluado.id_usuario = v.id_usuario_evaluado
            JOIN intercambios i ON i.id_intercambio = v.id_intercambio
            JOIN libros l_solicitado ON l_solicitado.id_libro = i.id_libro_solicitado
            LEFT JOIN libros l_ofrecido ON l_ofrecido.id_libro = i.id_libro_ofrecido
            WHERE v.id_valoracion = ?`,
            [idValoracion]
        );

        if (info.length === 0) return;

        const {
            email_evaluado,
            nombre_evaluado,
            nombre_evaluador,
            nick_evaluador,
            puntuacion,
            valoracion,
            titulo_solicitado,
            titulo_ofrecido,
            id_usuario_evaluado,
        } = info[0];

        const enlacePerfil = `${BASE_URL}/perfilUsuario?id=${id_usuario_evaluado}`;
        
        // Generar estrellas visuales
        const estrellas = "★".repeat(puntuacion) + "☆".repeat(5 - puntuacion);
        
        const contenido = `
            <p style="font-size: 16px; line-height: 1.6;">
                ¡Hola, ${nombre_evaluado}!
            </p>
            
            <p style="font-size: 16px; line-height: 1.6;">
                Has recibido una nueva valoración de <strong>${nombre_evaluador}</strong>.
            </p>
            
            <div style="background-color: #e8f5e9; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #4caf50;">
                <p style="margin: 5px 0; font-size: 24px; color: #f59e0b; letter-spacing: 2px;">
                    ${estrellas}
                </p>
                <p style="margin: 10px 0; font-size: 15px; color: #333; font-style: italic;">
                    "${valoracion}"
                </p>
                <p style="margin: 5px 0; font-size: 14px; color: #666;">
                    <strong>Intercambio:</strong> "${titulo_solicitado}" por "${titulo_ofrecido || "No especificado"}"
                </p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6;">
                Tu puntuación promedio ha sido actualizada. ¡Gracias por ser parte de nuestra comunidad de lectores!
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${enlacePerfil}" 
                   style="background-color: #2e7d32; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                    Ver mi perfil
                </a>
            </div>
            
            <p style="font-size: 15px; color: #666; font-style: italic; text-align: center;">
                "Las valoraciones construyen confianza entre lectores."
            </p>
        `;

        await transporter.sendMail({
            from: `"LibroHubFlow" <${process.env.EMAIL_USER}>`,
            to: email_evaluado,
            subject: `⭐ Has recibido una valoración de ${nick_evaluador || nombre_evaluador}`,
            html: crearPlantillaEmail("Nueva valoración recibida", contenido),
        });
    } catch (e) {
        console.error("Error al enviar email de nueva valoración:", e.message);
    }
}
