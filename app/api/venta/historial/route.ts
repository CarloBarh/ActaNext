import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const actas = await prisma.ventaEquipo.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(actas);
  } catch (error) {
    console.error('Error al obtener actas:', error);
    return NextResponse.json({ error: 'Error al obtener actas' }, { status: 500 });
  }
}