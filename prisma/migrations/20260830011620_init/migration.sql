-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'CARGA', 'INVITADO');

-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('MASCULINO', 'FEMENINO');

-- CreateEnum
CREATE TYPE "Division" AS ENUM ('CUB', 'JUNIOR', 'YOUNG_ADULT', 'ADULT', 'VETERAN', 'SENIOR');

-- CreateEnum
CREATE TYPE "Estilo" AS ENUM ('BB_R', 'BB_C', 'FS_R', 'FS_C', 'FU', 'BH_R', 'BH_C', 'BL', 'BU', 'LB', 'HB', 'TR');

-- CreateEnum
CREATE TYPE "Ronda" AS ENUM ('ANIMAL', 'STANDARD', 'HUNTING');

-- CreateEnum
CREATE TYPE "NivelSponsor" AS ENUM ('PRINCIPAL', 'PARTNER', 'APOYO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'INVITADO',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Arquero" (
    "id" TEXT NOT NULL,
    "numeroRegistro" TEXT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "genero" "Genero" NOT NULL,
    "fechaNacimiento" DATE NOT NULL,
    "pais" TEXT NOT NULL,
    "federacion" TEXT NOT NULL,
    "division" "Division" NOT NULL,
    "estilo" "Estilo" NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT,
    "banquete" BOOLEAN NOT NULL DEFAULT false,
    "banquetePagado" BOOLEAN NOT NULL DEFAULT false,
    "pagado" BOOLEAN NOT NULL DEFAULT false,
    "comprobanteUrl" TEXT,
    "notas" TEXT,
    "publicado" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Arquero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grupo" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "ronda" "Ronda" NOT NULL,
    "blancoInicial" INTEGER,

    CONSTRAINT "Grupo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArqueroGrupo" (
    "arqueroId" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,

    CONSTRAINT "ArqueroGrupo_pkey" PRIMARY KEY ("arqueroId","grupoId")
);

-- CreateTable
CREATE TABLE "Resultado" (
    "id" TEXT NOT NULL,
    "arqueroId" TEXT NOT NULL,
    "ronda" "Ronda" NOT NULL,
    "puntaje" INTEGER NOT NULL,
    "dieces" INTEGER,
    "cargadoPor" TEXT,

    CONSTRAINT "Resultado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sponsor" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "sitioWeb" TEXT,
    "nivel" "NivelSponsor" NOT NULL DEFAULT 'PARTNER',
    "orden" INTEGER NOT NULL DEFAULT 0,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alojamiento" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcionEs" TEXT NOT NULL,
    "descripcionEn" TEXT NOT NULL,
    "imagenUrl" TEXT NOT NULL,
    "precioSugerido" DECIMAL(10,2),
    "moneda" TEXT NOT NULL DEFAULT 'USD',
    "distanciaKm" DECIMAL(5,1),
    "tieneTransfer" BOOLEAN NOT NULL DEFAULT false,
    "sitioWeb" TEXT,
    "telefono" TEXT,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Alojamiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Configuracion" (
    "clave" TEXT NOT NULL,
    "valor" TEXT NOT NULL,

    CONSTRAINT "Configuracion_pkey" PRIMARY KEY ("clave")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Arquero_numeroRegistro_key" ON "Arquero"("numeroRegistro");

-- CreateIndex
CREATE UNIQUE INDEX "Grupo_nombre_ronda_key" ON "Grupo"("nombre", "ronda");

-- CreateIndex
CREATE UNIQUE INDEX "Resultado_arqueroId_ronda_key" ON "Resultado"("arqueroId", "ronda");

-- AddForeignKey
ALTER TABLE "ArqueroGrupo" ADD CONSTRAINT "ArqueroGrupo_arqueroId_fkey" FOREIGN KEY ("arqueroId") REFERENCES "Arquero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArqueroGrupo" ADD CONSTRAINT "ArqueroGrupo_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resultado" ADD CONSTRAINT "Resultado_arqueroId_fkey" FOREIGN KEY ("arqueroId") REFERENCES "Arquero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
