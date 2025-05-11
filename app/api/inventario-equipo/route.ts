import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const data = await prisma.inventarioEquipo.findMany({
    include: {
      tipoEquipo: true,
      departamento: true,
      empleado: true,
    },
  });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const {
    tipoEquipoId,
    numeroSerie,
    fechaCompra,
    fechaAsignacion,
    activo,
    ubicacionFisica,
    departamentoId,
    empleadoId,
  } = body;

  const nuevo = await prisma.inventarioEquipo.create({
    data: {
      tipoEquipoId,
      numeroSerie,
      fechaCompra: new Date(fechaCompra),
      fechaAsignacion: new Date(fechaAsignacion),
      activo,
      ubicacionFisica,
      departamentoId,
      empleadoId,
    },
  });

  return NextResponse.json(nuevo);
}
