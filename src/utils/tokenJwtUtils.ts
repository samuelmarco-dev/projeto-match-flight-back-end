import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;

export async function generateJsonWebToken(id: number){
    const validity = { expiresIn: 21600 }; 
    const token = jwt.sign(
        { id }, secret, validity
    );

    return token;
}
