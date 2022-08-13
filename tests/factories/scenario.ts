import prisma from "../../src/config/database.js";

export async function deleteAllTables(){
    await prisma.$transaction([
        prisma.$executeRaw`TRUNCATE TABLE "users" CASCADE;`,
        prisma.$executeRaw`TRUNCATE TABLE "sessions_users" CASCADE;`,
        prisma.$executeRaw`TRUNCATE TABLE "companies" CASCADE;`,
        prisma.$executeRaw`TRUNCATE TABLE "sessions_companies" CASCADE;`,
        prisma.$executeRaw`TRUNCATE TABLE "proposals" CASCADE;`
    ]);
}
