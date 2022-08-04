import * as imageRepository from '../repositories/imageRepository.js';
import * as userRepository from '../repositories/userRepository.js';
import compareEqualPassword from '../utils/errorPassword.js';
import { unauthorizedError } from '../utils/errorUtils.js';
import encrytedPassword from '../utils/encryptedPass.js';
import { UserData } from './../interfaces/index.js';

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

    if (!imageExists) await imageRepository.createImage(url);
    const createImage = await imageRepository.findImageByUrl(url);
    await userRepository.createUser({ name, email, password: passwordEncrypted, imageId: createImage.id });
    return;
}

const userService = {
    createUser
}

export default userService;
