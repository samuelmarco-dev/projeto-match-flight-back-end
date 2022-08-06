import joi from 'joi';

import { CompanyData } from '../interfaces/index.js';
const regexName = /^[a-zA-ZáéíóúàâêôãõüçÁÉÍÓÚÀÂÊÔÃÕÜÇ ]+$/;
const regexCNPJ = /^[0-9]{2}.[0-9]{3}.[0-9]{3}\/[0-9]{4}-[0-9]{2}$/;

const schemaCompany: joi.ObjectSchema<CompanyData> = joi.object({
    name: joi.string().pattern(regexName).required(),
    url: joi.string().uri().required().trim(),
    city: joi.string().pattern(regexName).required(),
    state: joi.string().pattern(regexName).required(),
    cnpj: joi.string().pattern(regexCNPJ).required().trim(),
    type: joi.equal(
        'TravelAgency', 'ExchangeAgency', 'TravelAndExchangeAgency'
    ).required(),
    email: joi.string().email().required().trim(),
    password: joi.string().required().trim(),
    confirmPassword: joi.valid(joi.ref('password')).required(),
});

export default schemaCompany;
