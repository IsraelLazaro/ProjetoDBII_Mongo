const {Evento} = require('../models/eventModel');
const client = require('../dataBase/redisDB');
/* Essa função lista todos os eventos do Banco */
const listarEventos= async(req,res)=>{
    /* Coloca-se a visibilidade do _id e o __V como falsa */
    Evento.find({}, {_id:true, __v:false}).then(result =>{
        res.status(200).send(result)
    }).catch(e=> res.status(400).send(e));
};

/* Essa função salva um novo evento no Banco */
const salvarEvento = async (req,res) =>{    
    /* Aqui é criado um novo objeto do tipo Evento */
    Evento.create(req.body).then(result => console.log(result));
    res.send("Evento Salvo com sucesso!");
};

/* Essa função possibilita editar e atualizar um evento cadastrado no Banco */
const editarEvento = async (req,res) =>{
    /* O evento é buscado pelo id */    
    Evento.findById(req.params.id).then(result =>{
        if(result){
            result.set(req.body);
            result.save();
            res.status(200).send('Evento atualizado com sucesso');
        }
    }).catch(e => res.status(404).send('Evento não encontrada'));    
};

/* Essa função deleta um evento cadastrado no Banco */
const deletarEvento = async (req,res)=>{   
    Evento.deleteOne({_id:req.params.id}).then(result => {
        if(result.deletedCount > 0) res.status(200).send('Removido com sucesso');
        else res.status(404).send('Evento não encontrada');
    }).catch(e => res.status(400).send(e));
};

/* Essa função faz buscas de texto nos eventos e traz aqueles que contém o texto */
const buscarEvento = async (req,res) =>{
    /* Recebe um texto e faz busca*/
    Evento.find({$text:{$search:req.params.texto}},{_id:true, __v:false}).then(result => {
        res.status(200).send(result);
    }).catch(e => res.status(400).send(e));
                
};
/* ---------------------------------------REDIS--------------------------------------------------- */
const listarEventosRedis= async(req,res)=>{
    const retorno = await client.get(req.params.chave);
    if(retorno){
        console.log('Evento encontrado!');
        res.send(JSON.parse(retorno));
    }else{
        console.log('Não está no redis');
    };
};
const salvarEventoRedis = async (req, res) => {
    const evento = req.body;
    console.log(evento.eventName);
    await client.set(`${evento.eventName}`, JSON.stringify(evento),{
        EX: 6000
    });
    
    res.status(200).send('Evento salvo com sucesso no Redis');
};
const deletarDoRedis = async (req, res)=>{
    try {
        const retorno = await client.del(req.params.chave);
        if (retorno) {
            console.log('Evento deletado do Redis!');
            res.status(200).send('Operação de exclusão concluída com sucesso.');
        } else {
            console.log('Chave não encontrada no Redis!');
        }        
    } catch (err) {
        console.error('Erro ao deletar do Redis:', err);
        res.status(500).send('Erro ao realizar a operação de exclusão.');
    };
};
/* ---------------------------------------REDIS--------------------------------------------------- */

module.exports = {listarEventos, salvarEvento, editarEvento, deletarEvento, buscarEvento, salvarEventoRedis, listarEventosRedis, deletarDoRedis};
