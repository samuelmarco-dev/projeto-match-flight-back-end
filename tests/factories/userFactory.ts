import { faker } from '@faker-js/faker';
import prisma from '../../src/config/database.js';

import { UserData } from '../../src/interfaces/index.js';

function generateUser(): UserData {
    return {
        url: faker.image.imageUrl(),
        name: faker.name.findName(),
        email: faker.internet.email('user', 'test', 'gmail.com'),
        password: faker.internet.password(),
        confirmPassword: faker.internet.password()
    }
}

async function createImage(url: string){
    await prisma.image.upsert({
        create: { url },
        update: { url },
        where: { url }
    });

    return await prisma.image.findUnique({
        where: { url }
    });
}

async function generateUserForConflict(){
    const user = generateUser();
    const image = await createImage(user.url);

    await prisma.user.create({
        data: { ...user, imageId: image.id }
    });

    return user;
}

const userFactory = {
    generateUser,
    generateUserForConflict
};

export default userFactory;
