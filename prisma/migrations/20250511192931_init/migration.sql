-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'usuario',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requisicion" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "empresa" TEXT NOT NULL,
    "de" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "observaciones" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Requisicion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductoRequisicion" (
    "id" SERIAL NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "requisicionId" INTEGER NOT NULL,

    CONSTRAINT "ProductoRequisicion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VentaEquipo" (
    "id" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "numeroSerie" TEXT NOT NULL,
    "nombreEquipo" TEXT NOT NULL,
    "fechaEntrega" TIMESTAMP(3) NOT NULL,
    "motivoEntrega" TEXT NOT NULL,
    "estadoGeneral" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VentaEquipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Acta" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "nombreEmpleado" TEXT NOT NULL,
    "nombreEmpresa" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Acta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dispositivo" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "actaId" INTEGER NOT NULL,

    CONSTRAINT "Dispositivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departamento" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Departamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoEquipo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "TipoEquipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empleado" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "identificacion" TEXT NOT NULL,
    "codigoEmpleado" TEXT NOT NULL,

    CONSTRAINT "Empleado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventarioEquipo" (
    "id" SERIAL NOT NULL,
    "tipoEquipoId" INTEGER NOT NULL,
    "numeroSerie" TEXT NOT NULL,
    "fechaCompra" TIMESTAMP(3) NOT NULL,
    "fechaAsignacion" TIMESTAMP(3) NOT NULL,
    "activo" BOOLEAN NOT NULL,
    "ubicacionFisica" TEXT NOT NULL,
    "departamentoId" INTEGER NOT NULL,
    "empleadoId" INTEGER NOT NULL,

    CONSTRAINT "InventarioEquipo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Requisicion_numero_key" ON "Requisicion"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Empleado_codigoEmpleado_key" ON "Empleado"("codigoEmpleado");

-- CreateIndex
CREATE UNIQUE INDEX "InventarioEquipo_numeroSerie_key" ON "InventarioEquipo"("numeroSerie");

-- AddForeignKey
ALTER TABLE "ProductoRequisicion" ADD CONSTRAINT "ProductoRequisicion_requisicionId_fkey" FOREIGN KEY ("requisicionId") REFERENCES "Requisicion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispositivo" ADD CONSTRAINT "Dispositivo_actaId_fkey" FOREIGN KEY ("actaId") REFERENCES "Acta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventarioEquipo" ADD CONSTRAINT "InventarioEquipo_tipoEquipoId_fkey" FOREIGN KEY ("tipoEquipoId") REFERENCES "TipoEquipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventarioEquipo" ADD CONSTRAINT "InventarioEquipo_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventarioEquipo" ADD CONSTRAINT "InventarioEquipo_empleadoId_fkey" FOREIGN KEY ("empleadoId") REFERENCES "Empleado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
