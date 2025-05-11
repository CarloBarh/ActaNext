import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { fecha, nombreEmpleado, nombreEmpresa, equipoRecibido } = body;

    if (!equipoRecibido || !Array.isArray(equipoRecibido) || equipoRecibido.length === 0) {
      return NextResponse.json({ error: 'Debe incluir al menos un equipo recibido' }, { status: 400 });
    }

    const nuevaActa = await prisma.acta.create({
      data: {
        fecha: new Date(fecha),
        nombreEmpleado,
        nombreEmpresa,
        dispositivos: {
          create: equipoRecibido.map((descripcion: string) => ({
            descripcion,
          })),
        },
      },
    });

    return NextResponse.json({ id: nuevaActa.id });
  } catch (error) {
    console.error('[ERROR AL GUARDAR ACTA]', error);
    return NextResponse.json({ error: 'Error al guardar acta' }, { status: 500 });
  }
}
