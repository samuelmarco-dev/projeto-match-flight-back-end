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

function userExistsInTestUnitary(){
    return {
        id: 1,
        imageId: 1,
        name: 'name',
        email: 'email',
        password: 'password'
    };
}

const userFactory = {
    generateUser,
    userExistsInTestUnitary
};

export default userFactory;
