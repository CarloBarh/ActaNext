// app/page.tsx
'use client'; // Este es el indicador de que este componente es del lado del cliente

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirigir al login
    router.push('/login');
  }, [router]);

  return null; // No renderiza nada, solo realiza la redirección
};

export default Home;
