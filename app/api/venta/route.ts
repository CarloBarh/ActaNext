import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      descripcion,
      marca,
      modelo,
      numeroSerie,
      nombreEquipo,
      fechaEntrega,
      motivoEntrega,
      estadoGeneral
    } = body;

    if (
      !descripcion ||
      !marca ||
      !modelo ||
      !numeroSerie ||
      !nombreEquipo ||
      !fechaEntrega ||
      !motivoEntrega ||
      !estadoGeneral
    ) {
      return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 });
    }

    const nuevaVenta = await prisma.ventaEquipo.create({
      data: {
        descripcion,
        marca,
        modelo,
        numeroSerie,
        nombreEquipo,
        fechaEntrega: new Date(fechaEntrega),
        motivoEntrega,
        estadoGeneral
      }
    });

    return NextResponse.json({ id: nuevaVenta.id }, { status: 201 });
  } catch (error) {
    console.error('[ERROR AL GUARDAR VENTA EQUIPO]', error);
    return NextResponse.json({ error: 'Error al guardar venta de equipo' }, { status: 500 });
  }
}
