import { Turno } from '@/types/turno';

// Simulamos una base de datos en memoria
let turnos: Turno[] = [];

export const crearTurno = (turno: Omit<Turno, 'id' | 'createdAt'>): Turno => {
  const nuevoTurno: Turno = {
    ...turno,
    id: Math.random().toString(36).substring(7),
    createdAt: new Date().toISOString(),
  };
  turnos.push(nuevoTurno);
  return nuevoTurno;
};

export const obtenerTurnos = (): Turno[] => {
  return turnos;
};

export const obtenerTurnosPorEmail = (email: string): Turno[] => {
  return turnos.filter((t) => t.email === email);
};

export const obtenerTurno = (id: string): Turno | undefined => {
  return turnos.find((t) => t.id === id);
};

export const cancelarTurno = (id: string): boolean => {
  const turno = turnos.find((t) => t.id === id);
  if (turno) {
    turno.estado = 'cancelado';
    return true;
  }
  return false;
};

export const verificarDisponibilidad = (fecha: string, hora: string): boolean => {
  const turnosEnHorario = turnos.filter(
    (t) => t.fecha === fecha && t.hora === hora && t.estado !== 'cancelado'
  );
  return turnosEnHorario.length < 3; // Máximo 3 turnos por horario
};

export const generarHorariosDisponibles = (fecha: string): string[] => {
  const horas = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
  return horas.filter((hora) => verificarDisponibilidad(fecha, hora));
};
