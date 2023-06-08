const {Evento} = require('../models/eventModel');


const listarEventos= async(req,res)=>{
    Evento.find({}, {_id:true, __v:false}).then(result =>{
        res.status(200).send(result)
    }).catch(e=> res.status(400).send(e));
}
const salvarEvento = async (req,res) =>{
    Evento.create(req.body).then(result => console.log(result));
    res.send("Evento Salvo com sucesso!");
};
const editarEvento = async (req,res) =>{
    Evento.findById(req.params.id).then(result =>{
        if(result){
            result.set(req.body);
            result.save();
            res.status(200).send('Atualizado com sucesso');
        }
    }).catch(e => res.status(404).send('Anotação não encontrada'));
    // await Evento.findOneAndUpdate(req.body._id, req.body).then(result => console.log(result));
    // res.status(200).send('Atualizado com sucesso').catch(e => res.status(404).send('Anotação não encontrada'));      
};
const deletarEvento = async (req,res)=>{
    Evento.deleteOne({_id:req.params.id}).then(result => {
        if(result.deletedCount > 0) res.status(200).send('Removido com sucesso');
        else res.status(404).send('Evento não encontrada');
    }).catch(e => res.status(400).send(e));
};
const buscarEvento = async (req,res) =>{
        Evento.find({$text:{$search:req.params.texto}},{_id:true, __v:false}).then(result => {
        res.status(200).send(result);
        }).catch(e => res.status(400).send(e));
                
};

module.exports = {listarEventos, salvarEvento, editarEvento, deletarEvento, buscarEvento}
