import { badRequestError } from "./errorUtils.js";

export default function verifyReqBody(obj: Object){
    for (let keys in obj){
        if (!obj[keys]) throw badRequestError(`${keys} is required`);
    }
}
