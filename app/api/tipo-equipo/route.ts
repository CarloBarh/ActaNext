import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const data = await prisma.tipoEquipo.findMany();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { nombre } = body;

  const nuevo = await prisma.tipoEquipo.create({
    data: { nombre },
  });

  return NextResponse.json(nuevo);
}
