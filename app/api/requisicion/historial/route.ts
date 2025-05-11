// app/api/requisiciones/historial/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Ajusta si usas otro path

export async function GET() {
  try {
    const requisiciones = await prisma.requisicion.findMany({
      orderBy: { numero: 'desc' },
      include: {
        productos: true,
      },
    });

    return NextResponse.json(requisiciones);
  } catch (error) {
    console.error('Error al obtener historial:', error);
    return NextResponse.json({ error: 'Error al obtener el historial' }, { status: 500 });
  }
}
