'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'authenticated') {
      router.push('/home');
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      setError('Credenciales inválidas');
    } else {
      router.push('/home');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#F5F5F5] via-[#EDEDED] to-[#E0E0E0] flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-2xl rounded-2xl overflow-hidden border border-gray-200 min-h-[430px]">
        {/* Lado izquierdo con imagen */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
          <Image
            src="/ca-logo.jpg"
            alt="Imagen de fondo"
            fill
            objectFit="cover"
            className="brightness-75"
          />
        </div>

        {/* Lado derecho con formulario */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-8 sm:p-12">
          <h2 className="text-2xl font-semibold text-gray-500 mb-8 text-center">
            Inicia sesión en tu cuenta
          </h2>

          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#E63946]"
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#E63946]"
            />

            <button
              type="submit"
              className="w-full bg-[#E63946] hover:bg-[#d62839] text-white py-3 rounded-md text-lg"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
