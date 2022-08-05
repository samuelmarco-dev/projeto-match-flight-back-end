import bcrypt from 'bcrypt';

export async function encrytedPassword(password: string){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export async function compareEncryptedPassword(password: string, passwordEncrypted: string){
    return await bcrypt.compare(password, passwordEncrypted);
}
