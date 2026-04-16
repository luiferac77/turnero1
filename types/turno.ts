export interface Turno {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  fecha: string;
  hora: string;
  servicio: string;
  estado: 'confirmado' | 'pendiente' | 'cancelado';
  createdAt: string;
}

export interface HorarioDisponible {
  fecha: string;
  hora: string;
  disponible: boolean;
}
