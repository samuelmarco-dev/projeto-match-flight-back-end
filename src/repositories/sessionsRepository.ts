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

export async function invalidateSessionUser(token: string){
    await prisma.sessionUser.update({
        where: { token },
        data: { isActive: false, updatedAt: new Date() }
    });
}

export async function invalidateSessionCompany(token: string){
    await prisma.sessionCompany.update({
        where: { token },
        data: { isActive: false, updatedAt: new Date() }
    });
}

const sessionRepository = {
    createSessionUser,
    createSessionCompany,
    findSessionUser,
    findSessionCompany,
    invalidateSessionUser,
    invalidateSessionCompany
}

export default sessionRepository;
