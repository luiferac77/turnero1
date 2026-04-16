import { NextRequest, NextResponse } from 'next/server';
import { obtenerTurno, cancelarTurno } from '@/lib/turnos';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const turno = obtenerTurno(params.id);

    if (!turno) {
      return NextResponse.json({ error: 'Turno no encontrado' }, { status: 404 });
    }

    return NextResponse.json(turno);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener turno' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cancelado = cancelarTurno(params.id);

    if (!cancelado) {
      return NextResponse.json({ error: 'Turno no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ mensaje: 'Turno cancelado exitosamente' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al cancelar turno' }, { status: 500 });
  }
}
