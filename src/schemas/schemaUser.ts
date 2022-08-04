import joi from 'joi';

import { UserData } from '../interfaces/index.js';

const schemaUser: joi.ObjectSchema<UserData> = joi.object({
    url: joi.string().uri().required(),
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.valid(joi.ref('password')).required(),
});

export default schemaUser;
