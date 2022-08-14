import { compareEncryptedPassword, encrytedPassword, compareEqualPassword } from '../utils/encryptedPassUtils.js';
import { unauthorizedError, notFoundError, conflictError } from '../utils/errorUtils.js';
import { generateJsonWebToken } from '../utils/tokenJwtUtils.js';
import { Login, UserData } from '../interfaces/index.js';
import * as sessionRepository from '../repositories/sessionsRepository.js';
import * as imageRepository from '../repositories/imageRepository.js';
import * as userRepository from '../repositories/userRepository.js';

async function createUser(user: UserData) {
    const { name, url, email, password, confirmPassword } = user;
    compareEqualPassword(password, confirmPassword);

    const userExists = await userRepository.findUserByEmail(email);
    if (userExists) throw conflictError('User already exists');

    const passwordEncrypted = await encrytedPassword(password);
    const imageId = await imageExistsOrNot(url);
    await userRepository.createUser({ name, email, password: passwordEncrypted, imageId });
}

export async function imageExistsOrNot(url: string){
    const imageExists = await imageRepository.findImageByUrl(url);
    if(imageExists) return imageExists.id;

    await imageRepository.createImage(url);
    const createImage = await imageRepository.findImageByUrl(url);
    if(!createImage) throw notFoundError('Image not found');

    return createImage.id;
}

async function loginUser(login: Login){
    const { email, password } = login;

    const userExists = await userRepository.findUserByEmail(email);
    if (!userExists) throw notFoundError('User not found');

    const matchPassword = await compareEncryptedPassword(password, userExists.password);
    if (!matchPassword) throw unauthorizedError('Password does not match');

    const token = await generateJsonWebToken(userExists.id, 'userId');
    await sessionRepository.createSessionUser(userExists.id, token);
    return { token, user: userExists.id };
}

const userService = {
    createUser,
    loginUser
}

export default userService;
