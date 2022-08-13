import prisma from "../../src/config/database.js";

export async function deleteAllTables(){
    await prisma.$transaction([
        prisma.$executeRaw`TRUNCATE TABLE "images"`,
        prisma.$executeRaw`TRUNCATE TABLE "address"`,
        prisma.$executeRaw`TRUNCATE TABLE "cnpj"`,
        prisma.$executeRaw`TRUNCATE TABLE "airlines"`,
        prisma.$executeRaw`TRUNCATE TABLE "airport_boarding"`,
        prisma.$executeRaw`TRUNCATE TABLE "airport_landing"`,
        prisma.$executeRaw`TRUNCATE TABLE "date_start_end"`,
        prisma.$executeRaw`TRUNCATE TABLE "users" CASCADE`,
        prisma.$executeRaw`TRUNCATE TABLE "sessions_users" CASCADE`,
        prisma.$executeRaw`TRUNCATE TABLE "companies" CASCADE`,
        prisma.$executeRaw`TRUNCATE TABLE "sessions_companies" CASCADE`,
        prisma.$executeRaw`TRUNCATE TABLE "proposals" CASCADE`,
    ]);
}
