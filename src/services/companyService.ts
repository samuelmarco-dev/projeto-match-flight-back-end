import { compareEncryptedPassword, compareEqualPassword, encrytedPassword } from '../utils/encryptedPassUtils.js';
import { notFoundError, unauthorizedError } from '../utils/errorUtils.js';
import { generateJsonWebToken } from '../utils/tokenJwtUtils.js';
import { CompanyService, Login, TypeCompany } from '../interfaces/index.js';
import * as companyRepository from '../repositories/companyRepository.js';
import * as imageRepository from '../repositories/imageRepository.js';
import * as addressRepository from '../repositories/addressRepository.js';
import * as cnpjRepository from '../repositories/cnpjRepository.js';
import * as sessionRepository from '../repositories/sessionsRepository.js';

async function createCompany(body: CompanyService, type: TypeCompany){
    const { name, url, city, state, cnpj, email, password, confirmPassword } = body;
    compareEqualPassword(password, confirmPassword);

    const companyExists = await companyRepository.findCompanyByEmail(email);
    if(companyExists) throw unauthorizedError('Company already exists');

    const encryptedPassword = await encrytedPassword(password);
    const [imageId, addressId, cnpjId] = await Promise.all([
        imageExistsOrNot(url), addressExistsOrNot(city, state), cnpjExistsOrNot(cnpj)
    ]);

    await companyRepository.createCompany({
        name, imageId, addressId, cnpjId, email, type, password: encryptedPassword
    });
}

async function imageExistsOrNot(url: string){
    const imageFound = await imageRepository.findImageByUrl(url);
    if(imageFound) return imageFound.id;

    await imageRepository.createImage(url);
    const createImage = await imageRepository.findImageByUrl(url);
    if(!createImage) throw notFoundError('Image not found');

    return createImage.id;
}

async function addressExistsOrNot(city: string, state: string){
    const addressFound = await addressRepository.findAddressByData(city, state);
    if(addressFound) return addressFound.id;

    await addressRepository.createAddress(city, state);
    const createAddress = await addressRepository.findAddressByData(city, state);
    if(!createAddress) throw notFoundError('Address not found');

    return createAddress.id;
}

async function cnpjExistsOrNot(cnpj: string){
    const cnpjFound = await cnpjRepository.findRegistrationByCnpj(cnpj);
    if(cnpjFound) return cnpjFound.id;

    await cnpjRepository.createRegistrationCnpj(cnpj);
    const createCnpj = await cnpjRepository.findRegistrationByCnpj(cnpj);
    if(!createCnpj) throw notFoundError('Cnpj not found');

    return createCnpj.id;
}

async function loginCompany(login: Login){
    const { email, password } = login;

    const companyExists = await companyRepository.findCompanyByEmail(email);
    if (!companyExists) throw notFoundError('Company not found');

    const matchPassword = await compareEncryptedPassword(password, companyExists.password);
    if (!matchPassword) throw unauthorizedError('Password does not match');

    const token = await generateJsonWebToken(companyExists.id, 'companyId');
    await sessionRepository.createSessionCompany(companyExists.id, token);
    return { token };
}

const companyService = {
    createCompany,
    loginCompany
}

export default companyService;