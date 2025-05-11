'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import RequisicionPDF from '@/components/pdf/RequisicionPDF';

interface Producto {
  cantidad: string;
  descripcion: string;
  destino: string;
}

interface RequisicionData {
  fecha: string;
  empresa: string;
  de: string;
  tipo: string;
  productos: Producto[];
  observaciones: string;
}

export default function RequisicionPreview() {
  const router = useRouter();
  const [data, setData] = useState<RequisicionData | null>(null);
  const [numeroRequisicion, setNumeroRequisicion] = useState<string>('19011');
  const [, setGuardado] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);


  useEffect(() => {
    const stored = sessionStorage.getItem('requisicionData');
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      router.push('/requisicion');
    }

    const ultimoNumero = localStorage.getItem('ultimoNumeroRequisicion');
    if (ultimoNumero) {
      setNumeroRequisicion(parseInt(ultimoNumero).toString().padStart(5, '0'));
    }
  }, [router]);

  const handleEdit = () => {
    router.push('/requisicion');
  };

  const handleGuardar = async () => {
    if (!data) return null;
    setMensaje('');
    setCargando(true);

    try {
      const response = await fetch('/api/requisicion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error('Error al guardar requisición');
        setCargando(false);
        return null;
      }

      const result = await response.json();
      if (result.numero) {
        const formatted = result.numero.toString().padStart(5, '0');
        setNumeroRequisicion(formatted);
        setGuardado(true);
        localStorage.setItem('ultimoNumeroRequisicion', result.numero.toString());
        setMensaje('✅ Requisición guardada exitosamente');
        return formatted;
      }
    } catch (err) {
      console.error('Error al parsear la respuesta:', err);
    } finally {
      setCargando(false);
    }
  };

  if (!data || !numeroRequisicion) return null;

  return (
    <div className="p-8">
      {/* BOTONES */}
      <div className="flex gap-6 justify-center mt-4 mb-6">
  <button
    onClick={handleEdit}
    className="w-36 py-2 px-4 text-base font-medium text-white bg-[#E63946] hover:bg-[#d62839] rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-[2px] transition-all duration-200"
  >
    ✏️ Editar
  </button>

  <button
    onClick={async () => {
      setMensaje('');
      setCargando(true);
      const numero = await handleGuardar();
      if (!numero) return;

      const blob = await pdf(
        <RequisicionPDF data={data} numero={numero} />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'requisicion.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      sessionStorage.removeItem('requisicionData');
      setMensaje('📄 PDF generado correctamente');
      setTimeout(() => {
        router.push('/home');
      }, 1000);
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

  
      {/* MENSAJE */}
      {mensaje && (
        <p className="text-center text-green-600 font-medium mb-4">
          {mensaje}
        </p>
      )}
  
      {/* PDF */}
      <div className="w-[816px] h-[1056px] mx-auto mb-8 shadow-md border border-gray-300">
        <PDFViewer width="100%" height="100%">
          <RequisicionPDF data={data} numero={numeroRequisicion} />
        </PDFViewer>
      </div>
    </div>
  );
  
}
