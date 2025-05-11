'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#F5F5F5] via-[#EDEDED] to-[#E0E0E0] p-4">
      
      <div className="flex flex-col md:flex-row w-full max-w-5xl md:min-h-[430px] mt-24 shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
        {/* Lado izquierdo con imagen */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
          <Image
            src="/ca-logo.jpg"
            alt="Imagen"
            fill
            objectFit="cover"
            className="brightness-75"
          />
        </div>

        {/* Lado derecho con botones */}
        <div className="w-full md:w-1/2 bg-white p-8 sm:p-12 flex flex-col justify-center items-center gap-6">
          <h2 className="text-2xl font-semibold text-gray-500 text-center">
            Bienvenido {session?.user?.name}
          </h2>

          <button
            onClick={() => router.push('/acta')}
            className="w-full bg-[#6B7280] hover:bg-[#5a616d] text-white py-3 rounded-md text-lg font-semibold transition-all"
          >
            Acta
          </button>

          <button
            onClick={() => router.push('/requisicion')}
            className="w-full bg-[#E63946] hover:bg-[#d62839] text-white py-3 rounded-md text-lg font-semibold transition-all"
          >
            Requisición
          </button>

          <button
            onClick={() => router.push('/venta')}
            className="w-full bg-[#6B7280] hover:bg-[#5a616d] text-white py-3 rounded-md text-lg font-semibold transition-all"
          >
            Venta de Equipo
          </button>
        </div>
      </div>
    </div>
  );
}
