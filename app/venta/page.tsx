'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function VentaFormPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [ventaData, setVentaData] = useState({
    descripcion: '',
    marca: '',
    modelo: '',
    numeroSerie: '',
    nombreEquipo: '',
    fechaEntrega: '',
    motivoEntrega: '',
    estadoGeneral: ''
  });

  useEffect(() => {
    const storedData = sessionStorage.getItem('ventaData');
    if (storedData) {
      setVentaData(JSON.parse(storedData));
    }

    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVentaData({ ...ventaData, [name]: value });
  };

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem('ventaData', JSON.stringify(ventaData));
    router.push('/venta/ventapreview');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#F5F5F5] via-[#EDEDED] to-[#E0E0E0] p-8">
      <form
        onSubmit={handlePreview}
        className="bg-white p-16 rounded-3xl shadow-2xl w-full max-w-6xl border border-gray-300 space-y-10"
      >
        <h3 className="text-4xl font-extrabold text-[#4B677D] text-center">
          Venta de Equipos {session?.user?.name}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Descripción */}
          <div className="space-y-3">
            <label htmlFor="descripcion" className="block text-lg font-semibold text-gray-700">
              Descripción del equipo:
            </label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              value={ventaData.descripcion}
              onChange={handleChange}
              placeholder="Ejemplo: Laptop con SSD"
              required
              className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#E63946]"
            />
          </div>

          {/* Marca */}
          <div className="space-y-3">
            <label htmlFor="marca" className="block text-lg font-semibold text-gray-700">
              Marca:
            </label>
            <select
              id="marca"
              name="marca"
              value={ventaData.marca}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#E63946]"
            >
              <option value="">Seleccione una marca</option>
              <option value="DELL">DELL</option>
              <option value="HP">HP</option>
              <option value="MAC">MAC</option>
              <option value="LENOVO">LENOVO</option>
            </select>
          </div>

          {/* Modelo */}
          <div className="space-y-3">
            <label htmlFor="modelo" className="block text-lg font-semibold text-gray-700">
              Modelo:
            </label>
            <input
              type="text"
              id="modelo"
              name="modelo"
              value={ventaData.modelo}
              onChange={handleChange}
              placeholder="Ejemplo: Latitude 5510"
              required
              className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#E63946]"
            />
          </div>

          {/* Número de serie */}
          <div className="space-y-3">
            <label htmlFor="numeroSerie" className="block text-lg font-semibold text-gray-700">
              Número de serie:
            </label>
            <input
              type="text"
              id="numeroSerie"
              name="numeroSerie"
              value={ventaData.numeroSerie}
              onChange={handleChange}
              placeholder="Ejemplo: SN12345678"
              required
              className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#E63946]"
            />
          </div>

          {/* Nombre del equipo */}
          <div className="space-y-3">
            <label htmlFor="nombreEquipo" className="block text-lg font-semibold text-gray-700">
              Nombre del equipo:
            </label>
            <input
              type="text"
              id="nombreEquipo"
              name="nombreEquipo"
              value={ventaData.nombreEquipo}
              onChange={handleChange}
              placeholder="Ejemplo: EQUIPO-JPEREZ"
              required
              className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#E63946]"
            />
          </div>

          {/* Fecha de entrega */}
          <div className="space-y-3">
            <label htmlFor="fechaEntrega" className="block text-lg font-semibold text-gray-700">
              Fecha de entrega:
            </label>
            <input
              type="date"
              id="fechaEntrega"
              name="fechaEntrega"
              value={ventaData.fechaEntrega}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#E63946]"
            />
          </div>
        </div>

        {/* Motivo */}
        <div className="space-y-3">
          <label htmlFor="motivoEntrega" className="block text-lg font-semibold text-gray-700">
            Motivo de entrega o venta:
          </label>
          <textarea
            id="motivoEntrega"
            name="motivoEntrega"
            value={ventaData.motivoEntrega}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#E63946]"
          />
        </div>

        {/* Estado general */}
        <div className="space-y-3">
          <label htmlFor="estadoGeneral" className="block text-lg font-semibold text-gray-700">
            Estado general del equipo:
          </label>
          <textarea
            id="estadoGeneral"
            name="estadoGeneral"
            value={ventaData.estadoGeneral}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#E63946]"
          />
        </div>

        {/* Botones */}
        <div className="flex flex-col md:flex-row gap-6 pt-6">
          <button
            type="submit"
            className="w-full bg-[#E63946] hover:bg-[#d62839] text-white py-4 rounded-lg text-xl font-semibold transition-all"
          >
            Vista Previa
          </button>

          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem('ventaData');
              router.push('/home');
            }}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-4 rounded-lg text-xl font-semibold transition-all"
          >
            Regresar
          </button>
        </div>
      </form>
    </div>
  );
}
