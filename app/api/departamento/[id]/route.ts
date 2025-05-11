import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const data = await prisma.departamento.findUnique({
      where: { id },
    });

    if (!data) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch department' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const body = await req.json();
    const { nombre } = body;

    if (!nombre || typeof nombre !== 'string') {
      return NextResponse.json({ error: 'Nombre is required and must be a string' }, { status: 400 });
    }

    const data = await prisma.departamento.update({
      where: { id },
      data: { nombre },
    });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to update department' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    await prisma.departamento.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Departamento eliminado' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete department' }, { status: 500 });
  }
}