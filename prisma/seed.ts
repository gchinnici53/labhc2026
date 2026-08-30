import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const PASSWORD_ADMIN_SEED = "LabhcAdmin2026!";

async function seedUsuarioAdmin() {
  const passwordHash = await bcrypt.hash(PASSWORD_ADMIN_SEED, 10);

  await prisma.usuario.upsert({
    where: { email: "admin@labhc2026.ar" },
    update: {},
    create: {
      email: "admin@labhc2026.ar",
      nombre: "Admin LABHC",
      passwordHash,
      rol: "ADMIN",
    },
  });
}

async function seedSponsors() {
  const sponsors = [
    { nombre: "IFAA", logoUrl: "/logos/ifaa.png", nivel: "PRINCIPAL" as const, orden: 1 },
    { nombre: "TAFISA", logoUrl: "/logos/tafisa.png", nivel: "PARTNER" as const, orden: 2 },
    { nombre: "Zona Vital", logoUrl: "/logos/zonavital.png", nivel: "APOYO" as const, orden: 3 },
  ];

  for (const sponsor of sponsors) {
    const existe = await prisma.sponsor.findFirst({ where: { nombre: sponsor.nombre } });
    if (!existe) {
      await prisma.sponsor.create({ data: sponsor });
    }
  }
}

async function seedAlojamientos() {
  const alojamientos = [
    {
      nombre: "Alojamiento de ejemplo 1",
      descripcionEs: "Descripción de ejemplo (a completar con datos reales).",
      descripcionEn: "Sample description (to be completed with real data).",
      imagenUrl: "",
      orden: 1,
    },
    {
      nombre: "Alojamiento de ejemplo 2",
      descripcionEs: "Descripción de ejemplo (a completar con datos reales).",
      descripcionEn: "Sample description (to be completed with real data).",
      imagenUrl: "",
      orden: 2,
    },
  ];

  for (const alojamiento of alojamientos) {
    const existe = await prisma.alojamiento.findFirst({ where: { nombre: alojamiento.nombre } });
    if (!existe) {
      await prisma.alojamiento.create({ data: alojamiento });
    }
  }
}

async function seedConfiguracion() {
  const config = [
    { clave: "inscripcion_abierta", valor: "true" },
    { clave: "precio_inscripcion", valor: "150" },
    { clave: "precio_banquete", valor: "40" },
    { clave: "email_contacto", valor: "" },
    // Correlativo del numero de registro (LABHC-2026-NNNN). Se incrementa
    // atomicamente en app/[locale]/(public)/inscripcion/acciones.ts.
    { clave: "ultimo_numero_registro", valor: "0" },
  ];

  for (const item of config) {
    await prisma.configuracion.upsert({
      where: { clave: item.clave },
      update: {},
      create: item,
    });
  }
}

// Arqueros de prueba para poder ver el listado, el orden y el dashboard
// financiero funcionando. Datos ficticios, no son inscriptos reales.
async function seedArquerosDePrueba() {
  const arqueros = [
    {
      numeroRegistro: "LABHC-2026-0001",
      nombre: "Juan",
      apellido: "Alvarez",
      genero: "MASCULINO" as const,
      fechaNacimiento: new Date("1990-05-12"),
      pais: "AR",
      federacion: "Liga 3D Metropolitana",
      division: "ADULT" as const,
      estilo: "BH_R" as const,
      email: "juan.alvarez@example.com",
      pagado: true,
      banquete: true,
      banquetePagado: true,
    },
    {
      numeroRegistro: "LABHC-2026-0002",
      nombre: "Maria",
      apellido: "Benitez",
      genero: "FEMENINO" as const,
      fechaNacimiento: new Date("1985-11-03"),
      pais: "AR",
      federacion: "Club Flechar",
      division: "ADULT" as const,
      estilo: "FS_R" as const,
      email: "maria.benitez@example.com",
      pagado: true,
      banquete: true,
      banquetePagado: false,
    },
    {
      numeroRegistro: "LABHC-2026-0003",
      nombre: "Carlos",
      apellido: "Zabala",
      genero: "MASCULINO" as const,
      fechaNacimiento: new Date("2001-02-20"),
      pais: "UY",
      federacion: "Federación Uruguaya de Arco",
      division: "ADULT" as const,
      estilo: "LB" as const,
      email: "carlos.zabala@example.com",
      pagado: false,
      banquete: false,
      banquetePagado: false,
    },
    {
      numeroRegistro: null,
      nombre: "Ana",
      apellido: "Nuñez",
      genero: "FEMENINO" as const,
      fechaNacimiento: new Date("1968-07-30"),
      pais: "BR",
      federacion: "CBTA",
      division: "VETERAN" as const,
      estilo: "BB_C" as const,
      email: "ana.nunez@example.com",
      pagado: false,
      banquete: true,
      banquetePagado: false,
    },
  ];

  for (const arquero of arqueros) {
    const existe = await prisma.arquero.findFirst({ where: { email: arquero.email } });
    if (!existe) {
      await prisma.arquero.create({ data: arquero });
    }
  }
}

async function main() {
  await seedUsuarioAdmin();
  await seedSponsors();
  await seedAlojamientos();
  await seedConfiguracion();

  // Los arqueros de prueba son datos ficticios para probar el listado
  // localmente: nunca deben cargarse en produccion.
  if (process.env.NODE_ENV !== "production") {
    await seedArquerosDePrueba();
  }

  console.log("Seed listo.");
  console.log(`Usuario admin: admin@labhc2026.ar / ${PASSWORD_ADMIN_SEED}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
