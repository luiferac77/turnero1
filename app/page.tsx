'use client';

import { useState } from 'react';
import FormularioReserva from '@/components/FormularioReserva';
import MisTurnos from '@/components/MisTurnos';

export default function Home() {
  const [tab, setTab] = useState<'reservar' | 'misturnos'>('reservar');
  const [refetch, setRefetch] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            📅 Sistema de Turnero
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Reserva tu turno de forma fácil</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setTab('reservar')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              tab === 'reservar'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            Reservar Turno
          </button>
          <button
            onClick={() => setTab('misturnos')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              tab === 'misturnos'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            Mis Turnos
          </button>
        </div>

        {tab === 'reservar' && (
          <FormularioReserva
            onSuccess={() => {
              setRefetch(!refetch);
              setTimeout(() => setTab('misturnos'), 1000);
            }}
          />
        )}

        {tab === 'misturnos' && <MisTurnos refetch={refetch} />}
      </main>
    </div>
  );
}
