import bcrypt from 'bcrypt';

import { unauthorizedError } from "./errorUtils.js";

export function compareEqualPassword(password: string, confirmPassword: string){
    if(password !== confirmPassword) throw unauthorizedError('Password and confirm password are not equal');
}

export async function encrytedPassword(password: string){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export async function compareEncryptedPassword(password: string, passwordEncrypted: string){
    return await bcrypt.compare(password, passwordEncrypted);
}
