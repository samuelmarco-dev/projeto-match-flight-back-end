import { Login } from './../../src/interfaces/index';
import { faker } from '@faker-js/faker';
import prisma from '../../src/config/database.js';

import { UserData } from '../../src/interfaces/index.js';

function generateUser(): UserData {
    const password = faker.internet.password()

    return {
        url: faker.image.imageUrl(),
        name: faker.name.findName(),
        email: faker.internet.email('user', 'test', 'gmail.com'),
        password: password,
        confirmPassword: password
    }
}

function userExistsInTestUnitary(){
    return {
        id: 1,
        imageId: 1,
        name: 'name',
        email: 'email',
        password: 'password'
    };
}

function userLogin(): Login {
    return {
        email: faker.internet.email('user', 'test', 'gmail.com'),
        password: faker.internet.password()
    }
}

const userFactory = {
    generateUser,
    userExistsInTestUnitary,
    userLogin
};

export default userFactory;
