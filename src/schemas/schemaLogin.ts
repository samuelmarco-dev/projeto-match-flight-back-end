import joi from 'joi';

import { Login } from '../interfaces/index.js';

const schemaLogin: joi.ObjectSchema<Login> = joi.object({
    email: joi.string().email().required().trim(),
    password: joi.string().required().trim()
});

export default schemaLogin;
