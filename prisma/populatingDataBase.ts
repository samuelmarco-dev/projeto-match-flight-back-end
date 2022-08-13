import prisma from "../src/config/database.js";
import { encrytedPassword } from "../src/utils/encryptedPassUtils.js";

async function createImages(){
    await prisma.image.createMany({
        data: [
            { url: 'https://images.unsplash.com/photo-1660239182405-77b04854c237?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' },
            { url: 'https://images.unsplash.com/photo-1660208024980-1893964f52b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80' }
        ],
        skipDuplicates: true
    });
}

async function createUsers(){
    await prisma.user.createMany({
        data: [
            { name: 'User One', email: 'usuárioone@gmail.com', password: await encrytedPassword('senha'), imageId: 1 },
            { name: 'User Two', email: 'usuáriotwo@gmail.com', password: await encrytedPassword('senha'), imageId: 2 },
        ],
        skipDuplicates: true
    });
}

const populatingDataBase = {
    createImages,
    createUsers
}

export default populatingDataBase;
