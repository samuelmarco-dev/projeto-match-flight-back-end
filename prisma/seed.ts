import prisma from "../src/config/database.js";
import populatingDataBase from "./populatingDataBase.js";

async function main(){
    await populatingDataBase.createImages();
    await populatingDataBase.createUsers();
}

main().catch(error => {
    console.log(error);
    process.exit(1);
}).finally(async() => {
    await prisma.$disconnect();
});
