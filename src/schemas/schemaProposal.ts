import joi from 'joi';

import { ProposalData } from '../interfaces/index.js';

const schemaProposal: joi.ObjectSchema<ProposalData> = joi.object({
    companyId: joi.number().integer().required(),
    airline: joi.string().required(),
    boarding: joi.string().required(),
    landing: joi.string().required(),
    start: joi.string().required().trim(),
    end: joi.string().required().trim(),
    name: joi.string().required(),
    destiny: joi.string().required(),
    type: joi.equal(
        'Travel', 'Exchange', 'Backpack', 'Voluntary'
    ).required(),
    year: joi.string().length(4).required().trim()
});

export default schemaProposal;
