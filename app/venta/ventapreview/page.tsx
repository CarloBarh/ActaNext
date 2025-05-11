'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import VentaPDF from '@/components/pdf/VentaPDF';

interface VentaData {
  descripcion: string;
  marca: string;
  modelo: string;
  numeroSerie: string;
  nombreEquipo: string;
  fechaEntrega: string;
  motivoEntrega: string;
  estadoGeneral: string;
}

export default function VentaPreview() {
  const router = useRouter();
  const [data, setData] = useState<VentaData | null>(null);
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('ventaData');
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      router.push('/venta'); // Ruta del formulario
    }
  }, [router]);

  const handleEdit = () => {
    router.push('/venta');
  };

  const handleGuardar = async () => {
    if (!data) return;

    console.log('[VENTA ENVIADA AL BACKEND]', JSON.stringify(data, null, 2));

    const response = await fetch('/api/venta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setGuardado(true);
    } else {
      console.error('Error al guardar venta');
    }
  };

  if (!data) return null;

  return (
    <div className="p-8">
      <div className="w-[816px] h-[1056px] mx-auto mb-8 shadow-md border border-gray-300">
        <PDFViewer width="100%" height="100%">
          <VentaPDF data={data} />
        </PDFViewer>
      </div>

      <div className="flex gap-4 justify-center mt-4">
        <button
          onClick={handleEdit}
          className="w-40 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl text-lg font-semibold transition-all"
        >
          Editar
        </button>

        {!guardado ? (
          <button
            onClick={handleGuardar}
            className="w-40 bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl text-lg font-semibold transition-all"
          >
            Guardar y Generar PDF
          </button>
        ) : (
          <button
            onClick={async () => {
              const blob = await pdf(<VentaPDF data={data} />).toBlob();
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'venta.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
              sessionStorage.removeItem('ventaData');
              router.push('/home');
            }}
            className="w-40 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-lg font-semibold transition-all"
          >
            Descargar PDF
          </button>
        )}
      </div>
    </div>
  );
}
