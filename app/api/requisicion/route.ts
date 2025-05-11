import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface ProductoInput {
  cantidad: string;
  descripcion: string;
  destino: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.productos || !Array.isArray(body.productos) || body.productos.length === 0) {
      return NextResponse.json({ error: 'Debe incluir al menos un producto' }, { status: 400 });
    }

    const ultima = await prisma.requisicion.findFirst({
      orderBy: { numero: 'desc' },
    });

    const nuevoNumero = (ultima?.numero ?? 19011) + 1;

    const nueva = await prisma.requisicion.create({
      data: {
        numero: nuevoNumero,
        fecha: new Date(body.fecha),
        empresa: body.empresa,
        de: body.de,
        tipo: body.tipo,
        observaciones: body.observaciones,
        productos: {
          create: (body.productos as ProductoInput[]).map((p) => ({
            cantidad: parseInt(p.cantidad),
            descripcion: p.descripcion,
            destino: p.destino,
          })),
        },
      },
    });

    return NextResponse.json({ numero: nueva.numero });
  } catch (error) {
    console.error('[ERROR AL GUARDAR]', error);
    return NextResponse.json({ error: 'Error al guardar requisición' }, { status: 500 });
  }
}
