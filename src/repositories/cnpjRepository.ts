import prisma from "../config/database.js";

export async function findRegistrationByCnpj(cnpj: string){
    return await prisma.cnpj.findUnique({
        where: { cnpj }
    });
}

export async function createRegistrationCnpj(cnpj: string){
    await prisma.cnpj.create({
        data: { cnpj }
    });
}
