const {faker} = require("@faker-js/faker");

const makeProducts = () =>{
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric(),
        price: faker.commerce.price(),
        stock: parseInt(faker.string.numeric()),
        thumbnails: faker.image.avatar()
    }
}

module.exports = makeProducts;