'use client';

import { useState } from 'react';

interface FormularioReservaProps {
  onSuccess?: () => void;
}

const servicios = [
  'Corte de cabello',
  'Afeitado',
  'Cuidado de barba',
  'Coloración',
  'Tratamiento capilar',
];

export default function FormularioReserva({ onSuccess }: FormularioReservaProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '',
    servicio: servicios[0],
  });

  const [horarios, setHorarios] = useState<string[]>([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleFechaChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fecha = e.target.value;
    setFormData({ ...formData, fecha, hora: '' });

    if (fecha) {
      setCargando(true);
      try {
        const response = await fetch(`/api/turnos/horarios?fecha=${fecha}`);
        const data = await response.json();
        setHorarios(data.horarios || []);
      } catch (error) {
        console.error('Error al cargar horarios:', error);
        setHorarios([]);
      } finally {
        setCargando(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');

    try {
      const response = await fetch('/api/turnos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMensaje('✅ Turno reservado exitosamente');
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          fecha: '',
          hora: '',
          servicio: servicios[0],
        });
        setHorarios([]);
        if (onSuccess) onSuccess();
      } else {
        const error = await response.json();
        setMensaje(`❌ ${error.error || 'Error al reservar'}`);
      }
    } catch (error) {
      setMensaje('❌ Error de conexión');
    } finally {
      setCargando(false);
    }
  };

  const mañanaMinima = new Date();
  mañanaMinima.setDate(mañanaMinima.getDate() + 1);
  const fechaMinima = mañanaMinima.toISOString().split('T')[0];

  const fechaMaxima = new Date();
  fechaMaxima.setDate(fechaMaxima.getDate() + 30);
  const fechaMáxima = fechaMaxima.toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Reservar Turno</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nombre completo
        </label>
        <input
          type="text"
          required
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Teléfono
        </label>
        <input
          type="tel"
          required
          value={formData.telefono}
          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="123456789"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Servicio
        </label>
        <select
          value={formData.servicio}
          onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        >
          {servicios.map((servicio) => (
            <option key={servicio} value={servicio}>
              {servicio}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Fecha
        </label>
        <input
          type="date"
          required
          value={formData.fecha}
          onChange={handleFechaChange}
          min={fechaMinima}
          max={fechaMáxima}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {formData.fecha && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Hora
          </label>
          {cargando ? (
            <p className="text-gray-500">Cargando horarios...</p>
          ) : horarios.length > 0 ? (
            <select
              required
              value={formData.hora}
              onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Selecciona una hora</option>
              {horarios.map((hora) => (
                <option key={hora} value={hora}>
                  {hora}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-red-500">No hay horarios disponibles para esta fecha</p>
          )}
        </div>
      )}

      {mensaje && (
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-100">
          {mensaje}
        </div>
      )}

      <button
        type="submit"
        disabled={cargando}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition"
      >
        {cargando ? 'Reservando...' : 'Reservar Turno'}
      </button>
    </form>
  );
}
