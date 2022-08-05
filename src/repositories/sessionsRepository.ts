import prisma from "../config/database.js";

export async function createSessionUser(userId: number, token: string){
    await prisma.sessionUser.create({
        data: { userId, token }
    });
}
