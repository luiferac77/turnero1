import { NextRequest, NextResponse } from 'next/server';
import { generarHorariosDisponibles } from '@/lib/turnos';

export async function GET(request: NextRequest) {
  try {
    const fecha = request.nextUrl.searchParams.get('fecha');

    if (!fecha) {
      return NextResponse.json(
        { error: 'Fecha es requerida' },
        { status: 400 }
      );
    }

    const horarios = generarHorariosDisponibles(fecha);

    return NextResponse.json({ horarios });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener horarios' }, { status: 500 });
  }
}
