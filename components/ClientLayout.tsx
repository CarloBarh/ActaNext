// components/ClientLayout.tsx
'use client';

import { SessionProvider } from "next-auth/react";
import FloatingNavbar from "./FloatingNavbar"; // asegúrate de que la ruta sea correcta

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <FloatingNavbar /> {/* Aquí insertas el menú */}
      {children}
    </SessionProvider>
  );
}
