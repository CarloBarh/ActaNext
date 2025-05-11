import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const data = await prisma.inventarioEquipo.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      tipoEquipo: true,
      departamento: true,
      empleado: true,
    },
  });
  return NextResponse.json(data);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();

  const data = await prisma.inventarioEquipo.update({
    where: { id: parseInt(params.id) },
    data: {
      tipoEquipoId: body.tipoEquipoId,
      numeroSerie: body.numeroSerie,
      fechaCompra: new Date(body.fechaCompra),
      fechaAsignacion: new Date(body.fechaAsignacion),
      activo: body.activo,
      ubicacionFisica: body.ubicacionFisica,
      departamentoId: body.departamentoId,
      empleadoId: body.empleadoId,
    },
  });

  return NextResponse.json(data);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.inventarioEquipo.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json({ message: 'Inventario eliminado' });
}
