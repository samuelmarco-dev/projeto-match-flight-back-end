import { unauthorizedError } from "./errorUtils.js";

export default function compareEqualPassword(password: string, confirmPassword: string){
    if(password !== confirmPassword) throw unauthorizedError('Password and confirm password are not equal');
}
