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

interface Acta {
  id: number;
  fecha: string;
  nombreEmpleado: string;
  nombreEmpresa: string;
}

interface VentaData {
  id: string;
  descripcion: string;
  marca: string;
  modelo: string;
  numeroSerie: string;
  nombreEquipo: string;
  fechaEntrega: string;
  motivoEntrega: string;
  estadoGeneral: string;
}

export default function HistorialGeneral() {
  const router = useRouter();
  const [vista, setVista] = useState<'requisicion' | 'acta' | 'venta'>('requisicion');
  const [requisiciones, setRequisiciones] = useState<Requisicion[]>([]);
  const [actas, setActas] = useState<Acta[]>([]);
  const [ventas, setVentas] = useState<VentaData[]>([]);

  // Agrega estos nuevos estados:
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calcula el total de páginas:
  const totalPages = Math.ceil(requisiciones.length / itemsPerPage);

  // Obtiene solo los datos de la página actual:
  const paginatedRequisiciones = requisiciones.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const [currentPageActas, setCurrentPageActas] = useState(1);
  const itemsPerPageActas = 10;

  const totalPagesActas = Math.ceil(actas.length / itemsPerPageActas);

  const paginatedActas = actas.slice(
    (currentPageActas - 1) * itemsPerPageActas,
    currentPageActas * itemsPerPageActas
  );

  const handleNextPageActas = () => {
    if (currentPageActas < totalPagesActas) setCurrentPageActas(currentPageActas + 1);
  };

  const handlePrevPageActas = () => {
    if (currentPageActas > 1) setCurrentPageActas(currentPageActas - 1);
  };

  const [currentPageVentas, setCurrentPageVentas] = useState(1);
  const itemsPerPageVentas = 10;
  const totalPagesVentas = Math.ceil(ventas.length / itemsPerPageVentas);

  const paginatedVentas = ventas.slice(
    (currentPageVentas - 1) * itemsPerPageVentas,
    currentPageVentas * itemsPerPageVentas
  );

  const handlePrevPageVentas = () => {
    if (currentPageVentas > 1) setCurrentPageVentas(currentPageVentas - 1);
  };

  const handleNextPageVentas = () => {
    if (currentPageVentas < totalPagesVentas) setCurrentPageVentas(currentPageVentas + 1);
  };


  useEffect(() => {
    if (vista === 'requisicion') {
      fetch('/api/requisicion/historial')
        .then((res) => res.json())
        .then((data) => setRequisiciones(data));
    } else if (vista === 'acta') {
      fetch('/api/acta/historial')
        .then((res) => res.json())
        .then((data) => setActas(data));
    } else if (vista === 'venta') {
      fetch('/api/venta/historial')
        .then((res) => res.json())
        .then((data) => setVentas(data));
    }
  }, [vista]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-28">
      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 w-[95%] max-w-[1400px] min-h-[75vh] p-10 mt-6">
        <h1 className="text-3xl font-bold text-gray-700 mb-8 text-center">Historial</h1>

        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setVista('requisicion')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${vista === 'requisicion'
              ? 'bg-[#E63946] hover:bg-[#d62839] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            Requisiciones
          </button>
          <button
            onClick={() => setVista('acta')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${vista === 'acta'
              ? 'bg-[#6B7280] hover:bg-[#5a616d] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            Actas
          </button>
          <button
            onClick={() => setVista('venta')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${vista === 'venta'
              ? 'bg-[#E63946] hover:bg-[#d62839] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            Venta de Equipo
          </button>
        </div>

        <div className="overflow-x-auto">
          {/* Requisiciones */}
          {vista === 'requisicion' && (
            <>
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
                  {paginatedRequisiciones.map((req) => (
                    <tr key={req.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
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
                          Ver Copia
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

              {/* Controles de paginación */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-6">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  <span>Página {currentPage} de {totalPages}</span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          )}


          {/* Actas */}
          {vista === 'acta' && (
            <>
              <table className="w-full text-sm text-left text-gray-700 border border-gray-300 rounded-lg">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="px-4 py-3 font-semibold">#</th>
                    <th className="px-4 py-3 font-semibold">Fecha</th>
                    <th className="px-4 py-3 font-semibold">Empleado</th>
                    <th className="px-4 py-3 font-semibold">Empresa</th>
                    <th className="px-4 py-3 font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedActas.map((acta) => (
                    <tr key={acta.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-4 py-2">{String(acta.id)}</td>
                      <td className="px-4 py-2">{new Date(acta.fecha).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{acta.nombreEmpleado}</td>
                      <td className="px-4 py-2">{acta.nombreEmpresa}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => router.push(`/acta/copia/${acta.id}`)}
                          className="text-blue-600 hover:underline"
                        >
                          Ver Copia
                        </button>
                      </td>
                    </tr>
                  ))}
                  {actas.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-gray-400">
                        No hay actas registradas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Paginación */}
              {actas.length > itemsPerPageActas && (
                <div className="flex justify-center items-center gap-4 mt-4">
                  <button
                    onClick={handlePrevPageActas}
                    disabled={currentPageActas === 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  <span>
                    Página {currentPageActas} de {totalPagesActas}
                  </span>
                  <button
                    onClick={handleNextPageActas}
                    disabled={currentPageActas === totalPagesActas}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          )}


          {/* Venta de Equipos */}
          {vista === 'venta' && (
            <>
              <table className="w-full text-sm text-left text-gray-700 border border-gray-300 rounded-lg">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="px-4 py-3 font-semibold">Fecha</th>
                    <th className="px-4 py-3 font-semibold">Equipo</th>
                    <th className="px-4 py-3 font-semibold">Marca</th>
                    <th className="px-4 py-3 font-semibold">Modelo</th>
                    <th className="px-4 py-3 font-semibold">Serie</th>
                    <th className="px-4 py-3 font-semibold">Motivo</th>
                    <th className="px-4 py-3 font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedVentas.map((venta) => (
                    <tr key={venta.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-4 py-2">{new Date(venta.fechaEntrega).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{venta.nombreEquipo}</td>
                      <td className="px-4 py-2">{venta.marca}</td>
                      <td className="px-4 py-2">{venta.modelo}</td>
                      <td className="px-4 py-2">{venta.numeroSerie}</td>
                      <td className="px-4 py-2">{venta.motivoEntrega}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => router.push(`/venta/copia/${venta.id}`)}
                          className="text-blue-600 hover:underline"
                        >
                          Ver Copia
                        </button>
                      </td>
                    </tr>
                  ))}
                  {ventas.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-10 text-gray-400">
                        No hay ventas registradas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Paginación */}
              {ventas.length > itemsPerPageVentas && (
                <div className="flex justify-center items-center gap-4 mt-4">
                  <button
                    onClick={handlePrevPageVentas}
                    disabled={currentPageVentas === 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  <span>
                    Página {currentPageVentas} de {totalPagesVentas}
                  </span>
                  <button
                    onClick={handleNextPageVentas}
                    disabled={currentPageVentas === totalPagesVentas}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
