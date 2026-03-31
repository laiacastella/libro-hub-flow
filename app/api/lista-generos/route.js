import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {

        const [rows] = await db.query("SELECT id_genero as id, tipo_genero as nombre FROM generos");
        
   
        return NextResponse.json(rows);
    } catch (error) {
       
        console.error("DETALLE DEL ERROR EN LA API:", error);
        
        return NextResponse.json(
            { error: "Error en la base de datos", detalle: error.message }, 
            { status: 500 }
        );
    }
}