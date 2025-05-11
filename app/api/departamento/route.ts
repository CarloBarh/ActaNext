import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const data = await prisma.departamento.findMany();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre } = body;

    if (!nombre || typeof nombre !== 'string') {
      return NextResponse.json({ error: 'Nombre is required and must be a string' }, { status: 400 });
    }

    const nuevo = await prisma.departamento.create({
      data: { nombre },
    });

    return NextResponse.json(nuevo, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create department' }, { status: 500 });
  }
}