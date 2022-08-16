import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import app from '../../src/app.js';

import prisma from '../../src/config/database.js';
import { UserData, Login } from '../../src/interfaces/index.js';
import { imageExistsOrNot } from '../../src/services/userService.js';
import { encrytedPassword } from '../../src/utils/encryptedPassUtils.js';

function generateUser(): UserData {
    const password = faker.internet.password();

    return {
        url: faker.image.imageUrl(),
        name: faker.name.lastName(),
        email: 'adminusertest@gmail.com',
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

async function userLoginFlow(){
    const email = faker.internet.email().toLowerCase();
    const user = generateUser();
    await createUserForConflict({ ...user, email, password: '123456789' });

    const response = await supertest(app).post('/user/sign-in').send({ email, password: '123456789' });
    expect(response.status).toBe(200);
    expect(response.body.token).not.toBeNull();

    return { response, email };
}

const userFactory = {
    generateUser,
    createUserForConflict,
    userLogin,
    userLoginFlow
};

export default userFactory;
