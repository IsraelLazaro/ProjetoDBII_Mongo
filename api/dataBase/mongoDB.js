const dotenv = require('dotenv');
const mongoose = require('mongoose');

main().catch(err => console.log(err));
/* CONECXÃO COM ATLAS */
// async function main() {
//     await mongoose.connect('mongodb+srv://israellazaro:PI3Ge4ixGhiZrKcR@cluster0.s9o1ymc.mongodb.net/?retryWrites=true&w=majority');
//     console.log("Conectado com sucesso!!");

// };
/* CONECXÃO COM DOCKER */
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/aula');
    console.log("Conectado com sucesso!!");
};

module.exports = mongoose;