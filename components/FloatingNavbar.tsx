'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function FloatingNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const [showConfigMenu1, setShowConfigMenu1] = useState(false);
  const [showConfigMenu3, setShowConfigMenu3] = useState(false);

  // Mostrar null si todavía no tenemos el pathname
  if (!pathname) return null;

  // Rutas donde no se mostrará el navbar
  const hiddenRoutes = [
    '/acta',
    '/requisicion',
    '/venta',
  ];

  const isHidden = hiddenRoutes.some(route =>
    pathname.startsWith(route) && pathname !== '/home'
  );

  if (isHidden) return null;

  return (
    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white px-10 py-4 rounded-2xl shadow-xl border border-gray-200 w-[900px] flex justify-between items-center text-gray-500 font-semibold text-lg z-50">
      {/* Izquierda */}
      <div className="relative">
          <button
            onClick={() => setShowConfigMenu1(prev => !prev)}
            className="px-4 py-2 rounded-md hover:bg-[#E63946] hover:text-white transition-colors duration-200"
          >
            Documentos
          </button>

          <div className={`absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden transition-all duration-200 ease-out origin-top ${showConfigMenu1
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}>
              <button onClick={() => router.push('/acta')}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-500 transition-colors duration-200">
              Actas
            </button>
            <button onClick={() => router.push('/requisicion')}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-500 transition-colors duration-200">
              Requisicion
            </button>
            <button onClick={() => router.push('/venta')}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-500 transition-colors duration-200">
              Venta de Equipo
            </button>
          </div>
        </div>
        <button
            onClick={() => router.push('/home')}
            className="px-4 py-2 rounded-md hover:bg-[#E63946] hover:text-white transition-colors duration-200"
          >
            Inicio
          </button>
      {/* Centro */}
      <div>
        <button
          onClick={() => {
            if (isAuthenticated) {
              router.push('/historial');
            }
          }}
          className="px-4 py-2 rounded-md hover:bg-[#E63946] hover:text-white transition-colors duration-200"
        >
          {isAuthenticated ? "Historial" : "Menu"}
        </button>
      </div>

      {/* Derecha */}
      <div className="flex gap-4 relative items-center">
        <button
          className="px-4 py-2 rounded-md hover:bg-[#E63946] hover:text-white transition-colors duration-200"
        >
          En Proceso
        </button>

        {/* Configuración con submenú animado */}
        <div className="relative">
          <button
            onClick={() => setShowConfigMenu3(prev => !prev)}
            className="px-4 py-2 rounded-md hover:bg-[#E63946] hover:text-white transition-colors duration-200"
          >
            Configuración{session?.user?.name}
          </button>

          <div className={`absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden transition-all duration-200 ease-out origin-top ${showConfigMenu3
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}>
              <button onClick={() => router.push('/departamento')}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-500 transition-colors duration-200">
              Departamento
            </button>
            <button onClick={() => signOut({ callbackUrl: '/login' })}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-500 transition-colors duration-200">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}
