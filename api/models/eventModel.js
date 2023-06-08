const mongoose = require('../dataBase/mongoDB');


const eventSchema = new mongoose.Schema({
    author: String,
    dataInicio:{type: Date, default: Date.now},
    dataTermino:{type: Date, default: Date.now},
    eventName: String,
    eventDescription: String,
    lat: Number,
    lng: Number,
}, {collection:'eventos'});
/* CRIANDO O INDEX */
eventSchema.index({eventName:'text', eventDescription:'text'},

{default_language:'pt', weights:{eventName:2, eventDescription:1}});

/* CRIANDO MODEL */
const Evento = mongoose.model('Evento', eventSchema);

module.exports = {Evento};