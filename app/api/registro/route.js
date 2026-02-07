import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Desestructuramos usando los nombres que vienen del formulario
    const { nick, email, password, nombre, apellidos, telefono, cp, provincia, poblacion } = data;

    // 1. Encriptamos
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 2. Consulta con los nombres EXACTOS de tu compañero
    const query = `
      INSERT INTO Usuario 
      (nick_usuario, email, password_hash, nombre, apellidos, telefono, codigo_postal, id_provincia, id_poblacion) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const values = [nick, email, hashedPassword, nombre, apellidos, telefono, cp, provincia, poblacion];

    const [result] = await pool.execute(query, values);

    return NextResponse.json({ message: "Usuario creado", id: result.insertId });
  } catch (error) {
    console.error("Error SQL:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}