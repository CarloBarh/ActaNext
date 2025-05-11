'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function RequisicionFormPage() {

    const { data: session, status } = useSession();
    const router = useRouter();
    const [formData, setFormData] = useState({
        empresa: '',
        fecha: '',
        de: '',
        tipo: '',
        observaciones: '',
        productos: [{ cantidad: '', descripcion: '', destino: '' }],
    });

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }

        const stored = sessionStorage.getItem('requisicionData');
        if (stored) {
            setFormData(JSON.parse(stored));
        }
    }, [status, router]);

    const handleProductoChange = (
        index: number,
        field: 'cantidad' | 'descripcion' | 'destino',
        value: string
    ) => {
        const nuevosProductos = [...formData.productos];
        nuevosProductos[index][field] = value;
        setFormData({ ...formData, productos: nuevosProductos });
    };

    const handleAddProducto = () => {
        setFormData(prev => ({
            ...prev,
            productos: [...prev.productos, { cantidad: '', descripcion: '', destino: '' }],
        }));
    };

    const handleRemoveProducto = (index: number) => {
        const nuevosProductos = formData.productos.filter((_, i) => i !== index);
        setFormData({ ...formData, productos: nuevosProductos });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sessionStorage.setItem('requisicionData', JSON.stringify(formData));
        router.push('/requisicion/reqpreview');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#F5F5F5] via-[#EDEDED] to-[#E0E0E0] p-8">
            <div className="max-w-4xl w-full mx-auto p-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-4xl font-extrabold text-[#4B677D] text-center mb-10">Formulario de Requisición{session?.user?.name}</h2>
                <form onSubmit={handleSubmit} className="space-y-6 text-gray-800 text-[17px]">
                    {/* Empresa */}
                    <div>
                        <label htmlFor="empresa" className="block mb-1 font-semibold">Compañía:</label>
                        <input
                            type="text"
                            name="empresa"
                            id="empresa"
                            placeholder="Nombre de la compañía"
                            value={formData.empresa}
                            onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                            className="w-full border rounded-md px-4 py-2 text-[17px]"
                            required
                        />
                    </div>

                    {/* Fecha */}
                    <div>
                        <label htmlFor="fecha" className="block mb-1 font-semibold">Fecha:</label>
                        <input
                            type="date"
                            name="fecha"
                            id="fecha"
                            value={formData.fecha}
                            onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                            className="w-full border rounded-md px-4 py-2 text-[17px]"
                            required
                        />
                    </div>

                    {/* De */}
                    <div>
                        <label htmlFor="de" className="block mb-1 font-semibold">De:</label>
                        <input
                            type="text"
                            name="de"
                            id="de"
                            placeholder="Nombre del solicitante"
                            value={formData.de}
                            onChange={(e) => setFormData({ ...formData, de: e.target.value })}
                            className="w-full border rounded-md px-4 py-2 text-[17px]"
                            required
                        />
                    </div>

                    {/* Tipo (Switches) */}
                    <div className="flex gap-8">
                        <div>
                            <span className="block mb-1 font-semibold">Tipo:</span>
                            {/* Switch Recibo */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={formData.tipo === 'Recibo'}
                                        onChange={() => setFormData({ ...formData, tipo: 'Recibo' })}
                                        className="sr-only"
                                    />
                                    <div className={`w-10 h-6 rounded-full transition-all duration-300 shadow-inner 
              ${formData.tipo === 'Recibo' ? 'bg-[#E63946]' : 'bg-gray-300'}`}></div>
                                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all duration-300 
              ${formData.tipo === 'Recibo' ? 'translate-x-4' : ''}`}></div>
                                </div>
                                <span className="text-[17px]">Recibo</span>
                            </label>
                        </div>

                        <div>
                            {/* Switch Entrega */}
                            <label className="flex items-center gap-2 cursor-pointer mt-6">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={formData.tipo === 'Entrega'}
                                        onChange={() => setFormData({ ...formData, tipo: 'Entrega' })}
                                        className="sr-only"
                                    />
                                    <div className={`w-10 h-6 rounded-full transition-all duration-300 shadow-inner 
              ${formData.tipo === 'Entrega' ? 'bg-[#E63946]' : 'bg-gray-300'}`}></div>
                                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all duration-300 
              ${formData.tipo === 'Entrega' ? 'translate-x-4' : ''}`}></div>
                                </div>
                                <span className="text-[17px]">Entrega</span>
                            </label>
                        </div>
                    </div>

                    {/* Tabla de Productos */}
                    {/* Tabla de Productos */}
                    <div className="space-y-4">
                        <span className="block font-semibold">Productos:</span>
                        <div className="max-h-64 overflow-y-auto pr-2 space-y-2">
                            {formData.productos.map((producto, index) => (
                                <div key={index} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                                    <input
                                        type="text"
                                        placeholder="Cantidad"
                                        value={producto.cantidad}
                                        onChange={(e) => handleProductoChange(index, 'cantidad', e.target.value)}
                                        className="flex-1 border rounded-md px-3 py-2 text-[17px]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Descripción"
                                        value={producto.descripcion}
                                        onChange={(e) => handleProductoChange(index, 'descripcion', e.target.value)}
                                        className="flex-1 border rounded-md px-3 py-2 text-[17px]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Destino"
                                        value={producto.destino}
                                        onChange={(e) => handleProductoChange(index, 'destino', e.target.value)}
                                        className="flex-1 border rounded-md px-3 py-2 text-[17px]"
                                        required
                                    />
                                    <div className="flex gap-2 mt-1">
                                        {formData.productos.length > 1 && (
                                            <button type="button" onClick={() => handleRemoveProducto(index)} className="text-red-500 text-2xl font-bold px-2">−</button>
                                        )}
                                        {index === formData.productos.length - 1 && (
                                            <button type="button" onClick={handleAddProducto} className="text-green-600 text-2xl font-bold px-2">＋</button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Observaciones */}
                    <div>
                        <label htmlFor="observaciones" className="block mb-1 font-semibold">Observaciones:</label>
                        <textarea
                            id="observaciones"
                            placeholder="Escriba aquí sus observaciones"
                            value={formData.observaciones}
                            onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                            className="w-full border rounded-md px-4 py-2 h-24 resize-none text-[17px]"
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex flex-col gap-4">
                        <button type="submit" className="w-full bg-[#E63946] hover:bg-[#d62839] text-white py-4 rounded-lg text-xl font-semibold transition-all">
                            Vista Previa
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                sessionStorage.removeItem('requisicionData');
                                router.push('/home');
                            }}
                            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-4 rounded-lg text-xl font-semibold transition-all"
                        >
                            Regresar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
