let faker = require("faker")

// let randomName = faker.name.findName() //Rowan Nikolaus
// let randomEmail = faker.internet.email() //Kassandra.Hale@erich.biz
// let randomCard = faker.helpers.createCard() //random contact card containing many properties


// console.log('random name = ', randomName)
// console.log('random Email = ', randomEmail)
// console.log('random card = ', randomCard)
// console.log(faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"));

for(let i=0; i<10; i++){
    productName = faker.commerce.productName()
    price = faker.commerce.price()
    console.log(productName, '- $', price)
}


