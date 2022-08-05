import prisma from "../config/database.js";

export async function findAddressByData(city: string, state: string){
    return await prisma.address.findUnique({
        where: { city_state: { city, state } }
    });
}

export async function createAddress(city: string, state: string){
    await prisma.address.create({
        data: { city, state }
    });
}
