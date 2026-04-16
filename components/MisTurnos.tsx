'use client';

import { useState, useEffect } from 'react';
import { Turno } from '@/types/turno';

interface MisTurnosProps {
  email?: string;
  refetch?: boolean;
}

export default function MisTurnos({ email, refetch }: MisTurnosProps) {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [emailInput, setEmailInput] = useState(email || '');
  const [buscando, setBuscando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const buscarTurnos = async () => {
    if (!emailInput.trim()) {
      setMensaje('Por favor ingresa tu email');
      return;
    }

    setBuscando(true);
    setMensaje('');

    try {
      const response = await fetch('/api/turnos');
      const allTurnos = await response.json();
      const misTurnos = allTurnos.filter((t: Turno) => t.email === emailInput && t.estado !== 'cancelado');

      if (misTurnos.length === 0) {
        setMensaje('No hay turnos reservados para este email');
      }

      setTurnos(misTurnos);
    } catch (error) {
      setMensaje('Error al buscar turnos');
    } finally {
      setBuscando(false);
    }
  };

  useEffect(() => {
    if (refetch && email) {
      buscarTurnos();
    }
  }, [refetch]);

  const cancelarTurno = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas cancelar este turno?')) return;

    try {
      const response = await fetch(`/api/turnos/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setTurnos(turnos.filter((t) => t.id !== id));
        setMensaje('✅ Turno cancelado');
      } else {
        setMensaje('❌ Error al cancelar turno');
      }
    } catch (error) {
      setMensaje('❌ Error de conexión');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Mis Turnos</h2>

      <div className="flex gap-2">
        <input
          type="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="Ingresa tu email"
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={buscarTurnos}
          disabled={buscando}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          {buscando ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {mensaje && (
        <div className={`p-3 rounded-lg ${mensaje.includes('✅') ? 'bg-green-50 dark:bg-green-900 text-green-900 dark:text-green-100' : 'bg-red-50 dark:bg-red-900 text-red-900 dark:text-red-100'}`}>
          {mensaje}
        </div>
      )}

      {turnos.length > 0 && (
        <div className="space-y-2">
          {turnos.map((turno) => (
            <div key={turno.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Nombre</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{turno.nombre}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Servicio</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{turno.servicio}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Fecha</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{turno.fecha}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Hora</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{turno.hora}</p>
                </div>
              </div>
              <button
                onClick={() => cancelarTurno(turno.id)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
              >
                Cancelar Turno
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
