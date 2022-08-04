import prisma from "../config/database.js";
import { UserBody } from "../interfaces/index.js";

export async function findUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: { email }
    });
}

export async function createUser(user: UserBody){
    await prisma.user.create({
        data: { ...user }
    });
}
