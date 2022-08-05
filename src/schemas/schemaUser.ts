import joi from 'joi';

import { UserData } from '../interfaces/index.js';
const regexName = /^[a-zA-ZáéíóúàâêôãõüçÁÉÍÓÚÀÂÊÔÃÕÜÇ ]+$/;

const schemaUser: joi.ObjectSchema<UserData> = joi.object({
    url: joi.string().uri().required().trim(),
    name: joi.string().pattern(regexName).required(),
    email: joi.string().email().required().trim(),
    password: joi.string().required().trim(),
    confirmPassword: joi.valid(joi.ref('password')).required()
});

export default schemaUser;
