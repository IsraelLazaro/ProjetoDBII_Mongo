const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

main().catch(err => console.log(err));
/* CONECXÃO COM ATLAS */
// async function main() {
//     await mongoose.connect(process.env.DB_URL_ATLAS);
//     console.log("Conectado com sucesso!!");
// };
/* CONECXÃO COM DOCKER */
async function main() {
    await mongoose.connect(process.env.DB_URL);
    console.log("Conectado com sucesso!!");
};

module.exports = mongoose;