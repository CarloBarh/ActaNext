import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const data = await prisma.empleado.findMany();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { nombre, identificacion, codigoEmpleado } = body;

  const nuevo = await prisma.empleado.create({
    data: {
      nombre,
      identificacion,
      codigoEmpleado,
    },
  });

  return NextResponse.json(nuevo);
}
