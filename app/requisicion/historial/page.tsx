'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Requisicion {
  id: string;
  numero: number;
  fecha: string;
  empresa: string;
  de: string;
  tipo: string;
}

export default function HistorialRequisiciones() {
  const router = useRouter();
  const [requisiciones, setRequisiciones] = useState<Requisicion[]>([]);

  useEffect(() => {
    fetch('/api/requisicion/historial')
      .then((res) => res.json())
      .then((data) => setRequisiciones(data))
      .catch((err) => console.error('Error cargando requisiciones:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-32 relative">
      {/* Barra de menú flotante */}
      <div className="absolute top-10 bg-white px-10 py-4 rounded-2xl shadow-xl border border-gray-200 w-[90%] max-w-[900px] flex justify-between items-center text-gray-500 font-semibold text-lg">
        <div className="flex gap-4">
          {['Departamento', 'Plantilla'].map((item, index) => (
            <button
              key={index}
              className="px-4 py-2 rounded-md hover:bg-[#E63946] hover:text-white transition-colors duration-200"
            >
              {item}
            </button>
          ))}
        </div>

        <div>
          <button
            onClick={() => router.push('/requisicion/historial')}
            className="px-4 py-2 rounded-md bg-[#E63946] text-white"
          >
            Historial
          </button>
        </div>

        <div className="flex gap-4">
          {['En Proceso', 'Configuración'].map((item, index) => (
            <button
              key={index}
              className="px-4 py-2 rounded-md hover:bg-[#E63946] hover:text-white transition-colors duration-200"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Card de historial */}
      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 w-[95%] max-w-[1400px] min-h-[75vh] p-10 mt-20">
        <h1 className="text-3xl font-bold text-gray-700 mb-8 text-center">Historial de Requisiciones</h1>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700 border border-gray-300 rounded-lg">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">Fecha</th>
                <th className="px-4 py-3 font-semibold">Empresa</th>
                <th className="px-4 py-3 font-semibold">De</th>
                <th className="px-4 py-3 font-semibold">Tipo</th>
                <th className="px-4 py-3 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {requisiciones.map((req) => (
                <tr
                  key={req.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">{String(req.numero).padStart(5, '0')}</td>
                  <td className="px-4 py-2">{req.fecha}</td>
                  <td className="px-4 py-2">{req.empresa}</td>
                  <td className="px-4 py-2">{req.de}</td>
                  <td className="px-4 py-2">{req.tipo}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => router.push(`/requisicion/pdf/${req.id}`)}
                      className="text-blue-600 hover:underline"
                    >
                      Ver PDF
                    </button>
                  </td>
                </tr>
              ))}
              {requisiciones.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400">
                    No hay requisiciones registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
