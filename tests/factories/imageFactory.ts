import { faker } from "@faker-js/faker";

function imageExistsInTestUnitary(){
    return {
        id: 1,
        url: faker.image.imageUrl(),
        createdAt: new Date()
    };
}

const imageFactory = {
    imageExistsInTestUnitary
}

export default imageFactory;
