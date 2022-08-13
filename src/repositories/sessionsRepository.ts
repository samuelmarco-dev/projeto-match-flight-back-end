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

export async function findSessionUser(token: string){
    return await prisma.sessionUser.findUnique({
        where: { token }
    });
}

export async function findSessionCompany(token: string){
    return await prisma.sessionCompany.findUnique({
        where: { token }
    });
}

const sessionRepository = {
    createSessionUser,
    createSessionCompany,
    findSessionUser,
    findSessionCompany
}

export default sessionRepository;
