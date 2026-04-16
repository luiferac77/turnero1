import { NextRequest, NextResponse } from 'next/server';
import { crearTurno, obtenerTurnos } from '@/lib/turnos';

export async function GET(request: NextRequest) {
  try {
    const turnos = obtenerTurnos();
    return NextResponse.json(turnos);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener turnos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validar datos requeridos
    if (!data.nombre || !data.email || !data.telefono || !data.fecha || !data.hora || !data.servicio) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Crear turno
    const nuevoTurno = crearTurno({
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      fecha: data.fecha,
      hora: data.hora,
      servicio: data.servicio,
      estado: 'confirmado',
    });

    return NextResponse.json(nuevoTurno, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear turno' }, { status: 500 });
  }
}
