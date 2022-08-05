import prisma from "../config/database.js";

export async function createSessionUser(userId: number, token: string){
    await prisma.sessionUser.create({
        data: { userId, token }
    });
}

export async function createSessionCompany(companyId: number, token: string){
    await prisma.sessionCompany.create({
        data: { companyId, token }
    });
}
