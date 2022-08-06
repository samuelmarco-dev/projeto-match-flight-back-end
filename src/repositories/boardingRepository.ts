import prisma from "../config/database.js";

export async function findAirportBoarding(name: string, initials: string){
    return await prisma.airPortBoarding.findUnique({
        where: { name_initials: { name, initials } }
    });
}

export async function createAirportBoarding(name: string, initials: string){
    await prisma.airPortBoarding.create({
        data: { name, initials }
    });
}
