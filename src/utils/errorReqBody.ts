import { badRequestError, wrongSchemaError } from "./errorUtils.js";

export function verifyReqBody(obj: Object){
    for (let key in obj){
        if (!obj[key]) throw badRequestError(`${key} is required`);
    }
}

export function emailIncludesUpperCase(string: string){
    const compare = string.toLowerCase();
    if(compare !== string) throw wrongSchemaError(`Email must not contain uppercase letters`);
}
