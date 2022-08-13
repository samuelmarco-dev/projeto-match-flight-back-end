import { faker } from "@faker-js/faker";

function imageExistsInTestUnitary(){
    return {
        id: 1,
        url: faker.image.imageUrl()
    };
}

const imageFactory = {
    imageExistsInTestUnitary
}

export default imageFactory;
