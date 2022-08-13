import { faker } from '@faker-js/faker';

import prisma from '../../src/config/database.js';
import { UserData, Login } from '../../src/interfaces/index.js';
import { imageExistsOrNot } from '../../src/services/userService.js';
import { encrytedPassword } from '../../src/utils/encryptedPassUtils.js';

function generateUser(): UserData {
    const password = faker.internet.password();

    return {
        url: faker.image.imageUrl(),
        name: faker.name.lastName(),
        email: 'admintest@gmail.com',
        password: password,
        confirmPassword: password
    }
}

async function createUserForConflict(user: UserData){
    const { url, name, email, password } = user;
    const imageId = await imageExistsOrNot(url);

    await prisma.user.create({
        data: {
            imageId,
            name,
            email,
            password: await encrytedPassword(password)
        }
    });
}

function userLogin(): Login {
    return {
        email: faker.internet.email(),
        password: faker.internet.password()
    }
}

const userFactory = {
    generateUser,
    createUserForConflict,
    userLogin
};

export default userFactory;
