'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function ActaFormPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [actaData, setActaData] = useState({
    fecha: '',
    nombreEmpleado: '',
    nombreEmpresa: '',
    equipoRecibido: [''], // ahora es un array
  });

  useEffect(() => {
    const storedData = sessionStorage.getItem('actaData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      setActaData({
        ...parsedData,
        // Si equipoRecibido vino como string (porque lo hiciste join antes), conviértelo a array:
        equipoRecibido: typeof parsedData.equipoRecibido === 'string'
          ? parsedData.equipoRecibido.split(',').map((item: string) => item.trim())
          : parsedData.equipoRecibido,
      });
    }
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
    const { name, value } = e.target;

    if (name === 'equipoRecibido' && index !== undefined) {
      const nuevosEquipos = [...actaData.equipoRecibido];
      nuevosEquipos[index] = value;
      setActaData({ ...actaData, equipoRecibido: nuevosEquipos });
    } else {
      setActaData({ ...actaData, [name]: value });
    }
  };

  const handleAddEquipo = () => {
    setActaData(prev => ({
      ...prev,
      equipoRecibido: [...prev.equipoRecibido, ''],
    }));
  };

  const handleRemoveEquipo = (index: number) => {
    const nuevosEquipos = actaData.equipoRecibido.filter((_, i) => i !== index);
    setActaData({ ...actaData, equipoRecibido: nuevosEquipos });
  };

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    // Guardar los datos en sessionStorage
    sessionStorage.setItem('actaData', JSON.stringify({
      ...actaData,
      equipoRecibido: actaData.equipoRecibido.filter(e => e.trim() !== ''),
    }));
    router.push('/acta/preview');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#F5F5F5] via-[#EDEDED] to-[#E0E0E0] p-8">
      <form
        onSubmit={handlePreview}
        className="bg-white p-16 rounded-3xl shadow-2xl w-full max-w-4xl space-y-8 border border-gray-300">
        <h3 className="text-4xl font-extrabold text-[#4B677D] text-center mb-10">
          Acta de Entrega de Equipos
          {session?.user?.name}</h3>

        <div className="space-y-3">
          <label htmlFor="fecha" className="block text-lg font-semibold text-gray-700">
            Fecha:
          </label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={actaData.fecha}
            onChange={handleChange}
            required
            className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#E63946]" />
        </div>

        <div className="space-y-3">
          <label htmlFor="nombreEmpleado" className="block text-lg font-semibold text-gray-700">
            Nombre del empleado:
          </label>
          <input
            type="text"
            id="nombreEmpleado"
            name="nombreEmpleado"
            value={actaData.nombreEmpleado}
            onChange={handleChange}
            placeholder="Ejemplo: Juan Pérez"
            required
            className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#E63946]" />
        </div>

        <div className="space-y-3">
          <label htmlFor="nombreEmpresa" className="block text-lg font-semibold text-gray-700">
            Nombre de la empresa:
          </label>
          <select
              id="nombreEmpresa"
              name="nombreEmpresa"
              value={actaData.nombreEmpresa}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#E63946]"
            >
              <option value="">Seleccione una Empresa</option>
              <option value="Agroindustrias Diadema Zona Franca Honduras S.A">Agroindustrias Diadema Zona Franca Honduras S.A</option>
              <option value="Diadema Zona Franca">Diadema Zona Franca</option>
            </select>
        </div>

        {/* Equipos Recibidos */}
        <div className="space-y-4">
          <label className="block font-semibold">Equipo(s) Recibido(s):</label>
          <div className="max-h-64 overflow-y-auto pr-2 space-y-2">
            {actaData.equipoRecibido.map((equipo, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  name="equipoRecibido"
                  value={equipo}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Ejemplo: Laptop, Monitor..."
                  required
                  className="flex-1 px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#E63946]"
                />
                {actaData.equipoRecibido.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveEquipo(index)}
                    className="text-red-500 text-2xl font-bold px-2"
                  >
                    −
                  </button>
                )}
                {index === actaData.equipoRecibido.length - 1 &&
      actaData.equipoRecibido.length < 4 && (
                  <button
                    type="button"
                    onClick={handleAddEquipo}
                    className="text-green-600 text-2xl font-bold px-2"
                  >
                    ＋
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="w-full bg-[#E63946] hover:bg-[#d62839] text-white py-4 rounded-lg text-xl font-semibold transition-all">
          Vista Previa
        </button>

        <button type="button" onClick={() => { sessionStorage.removeItem('actaData'); router.push('/home'); }} className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-4 rounded-lg text-xl font-semibold transition-all">
          Regresar
        </button>

      </form>
    </div>
  );
}
