'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import ActaPDF from '@/components/pdf/ActaPDF';

interface ActaData {
  fecha: string;
  nombreEmpleado: string;
  nombreEmpresa: string;
  observaciones: string;
  equipoRecibido: string[];
}

export default function ActaPreview() {
  const router = useRouter();
  const [data, setData] = useState<ActaData | null>(null);
  const [, setGuardado] = useState(false);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('actaData');
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      router.push('/acta'); // redirige si no hay datos
    }
  }, [router]);

  const handleEdit = () => {
    router.push('/acta');
  };

  const handleGuardar = async () => {
    if (!data) return;

    const response = await fetch('/api/acta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error('Error al guardar el acta');
      return;
    }

    setGuardado(true);
  };

  if (!data) return null;

  return (
    <div className="p-8">
      <div className="flex gap-6 justify-center mt-4 mb-6">
        <button
          onClick={handleEdit}
          className="w-36 py-2 px-4 text-base font-medium text-white bg-[#E63946] hover:bg-[#d62839] rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-[2px] transition-all duration-200"
        >
          ✏️ Editar
        </button>
  
        <button
          onClick={async () => {
            setCargando(true);
            await handleGuardar();
  
            const blob = await pdf(<ActaPDF data={data} />).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'acta_entrega.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
  
            sessionStorage.removeItem('actaData');
            router.push('/home');
          }}
          disabled={cargando}
          className={`w-36 py-2 px-4 text-base font-medium rounded-2xl transition-all duration-200 ${
            cargando
              ? 'bg-gray-300 text-gray-600 shadow-inner cursor-not-allowed'
              : 'bg-[#E63946] hover:bg-[#d62839] text-white shadow-md hover:shadow-lg hover:-translate-y-[2px]'
          }`}
        >
          {cargando ? 'Generando...' : '📄 Guardar'}
        </button>
      </div>
      <div className="w-[816px] h-[1056px] mx-auto mb-8 shadow-md border border-gray-300">
        <PDFViewer width="100%" height="100%">
          <ActaPDF data={data} />
        </PDFViewer>
      </div>
    </div>
  );
  
}
