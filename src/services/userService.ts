import { compareEncryptedPassword, encrytedPassword, compareEqualPassword } from '../utils/encryptedPassUtils.js';
import { unauthorizedError, notFoundError } from '../utils/errorUtils.js';
import * as sessionRepository from '../repositories/sessionsRepository.js';
import * as imageRepository from '../repositories/imageRepository.js';
import * as userRepository from '../repositories/userRepository.js';
import { generateJsonWebToken } from '../utils/tokenJwtUtils.js';
import { Login, UserData } from '../interfaces/index.js';

async function createUser(user: UserData) {
    const { url, email, password, confirmPassword } = user;
    compareEqualPassword(password, confirmPassword);

    const userExists = await userRepository.findUserByEmail(email);
    if (userExists) throw unauthorizedError('User already exists');

    await existsImageOrNot(url, user);
}

async function existsImageOrNot(url: string, obj: UserData){
    const { name, email, password } = obj;
    const passwordEncrypted = await encrytedPassword(password);

    const imageExists = await imageRepository.findImageByUrl(url);
    if(imageExists){
        await userRepository.createUser({ name, email, password: passwordEncrypted, imageId: imageExists.id });
        return;
    }
    await imageRepository.createImage(url);

    const createImage = await imageRepository.findImageByUrl(url);
    if(!createImage) throw notFoundError('Image not found');

    await userRepository.createUser({ name, email, password: passwordEncrypted, imageId: createImage.id });
    return;
}

async function loginUser(login: Login){
    const { email, password } = login;

    const userExists = await userRepository.findUserByEmail(email);
    if (!userExists) throw unauthorizedError('User not found');

    const matchPassword = await compareEncryptedPassword(password, userExists.password);
    if (!matchPassword) throw unauthorizedError('Password does not match');

    const token = await generateJsonWebToken(userExists.id);
    await sessionRepository.createSessionUser(userExists.id, token);
    return { token };
}

const userService = {
    createUser,
    loginUser
}

export default userService;
