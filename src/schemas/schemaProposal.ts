import joi from 'joi';

import { ProposalData } from '../interfaces/index.js';

const regexIATA = /^[a-zA-ZáéíóúàâêôãõüçÁÉÍÓÚÀÂÊÔÃÕÜÇ ]+\s-\s[A-Z]{2,3}$/;
const regexData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
const regexCity = /^[a-zA-ZáéíóúàâêôãõüçÁÉÍÓÚÀÂÊÔÃÕÜÇ ]+$/;

const schemaProposal: joi.ObjectSchema<ProposalData> = joi.object({
    companyId: joi.number().integer().required(),
    airline: joi.string().pattern(regexIATA).required(),
    boarding: joi.string().pattern(regexIATA).required(),
    landing: joi.string().pattern(regexIATA).required(),
    start: joi.string().pattern(regexData).required(),
    end: joi.string().pattern(regexData).required(),
    name: joi.string().required(),
    destiny: joi.string().pattern(regexCity).required(),
    type: joi.equal(
        'Travel', 'Exchange', 'Backpack', 'Voluntary'
    ).required(),
    year: joi.string().length(4).required().trim()
});

export default schemaProposal;
