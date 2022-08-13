import prisma from "../config/database.js";

export async function findImageByUrl(url: string) {
    return await prisma.image.findUnique({
        where: { url }
    });
}

export async function createImage(url: string){
    await prisma.image.create({
        data: { url }
    });
}

const imageRepository = {
    findImageByUrl,
    createImage
}

export default imageRepository;
