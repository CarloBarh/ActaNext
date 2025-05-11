import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const data = await prisma.empleado.findUnique({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json(data);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const data = await prisma.empleado.update({
    where: { id: parseInt(params.id) },
    data: {
      nombre: body.nombre,
      identificacion: body.identificacion,
      codigoEmpleado: body.codigoEmpleado,
    },
  });
  return NextResponse.json(data);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.empleado.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json({ message: 'Empleado eliminado' });
}
