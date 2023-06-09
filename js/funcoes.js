const divEventos = document.querySelector('#listaEv');
const secEvnt = document.querySelector('#telaEventos');
const secEdit = document.querySelector('#telaCadastro');
const btnB = document.querySelector('.search-button');
const textoBusca = document.querySelector('#busca');
const urlApi = 'http://localhost:3000/eventos';
window.urlApi =urlApi;




/*BLOCO DE FUNÇÕES  */
// Essa função Salva o Evento no Banco de Dados MongoDB
window.salvarEvento = async function salvarEvento(obj){
    const aux = document.querySelector('#eventCoordinates').value;
    if(obj.eventName==="" || obj.eventDescription==="" || obj.dataInicio==="" || aux===""){
        alert('Preencha os campos obrigatórios!!');
    }else{
        try {
            const response = await fetch(urlApi, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });      
            if (response.ok) {  
                const divConfirmacao = document.querySelector('#confirmacao');                
                    alert('Evento salvo com sucesso!');
                    limparCampos();
                    const confirmacao = `<h3>O Evento ${obj.eventName} foi salvo com sucesso!!</h3>`;
                    console.log(confirmacao);
                    divConfirmacao.innerHTML = confirmacao;                                 
                    divConfirmacao.style.display = 'block';
                    setTimeout(() => {
                        divConfirmacao.style.display = "none";
                    }, 5000);
            } else {
                alert('Ocorreu um erro ao salvar o evento.');
                }
        } catch (error) {
            console.error('Erro ao conectar com a API:', error);
            }
    }
};
/* Essa função recebe os eventos do banco, monto o objeto e escreve no DOM
da página, alé de seta os marcadores no mapa */
async function mostrarEventos(eventos){
    eventos.forEach(evento => {        
        console.log(evento);
        const id = evento._id;
        const autor = evento.author;
        const nome = evento.eventName;
        const descricao = evento.eventDescription;
        const dataInicio = formatarData(evento.dataInicio);
        const dataTermino = formatarData(evento.dataTermino);
        const latiMostra = evento.lat;
        const longMostra = evento.lng;
        addMarker(nome, descricao,latiMostra, longMostra);
        const novoEvento =         
        `<div class="containerEvento">
        <div class="evt"><h4 class="panel-title" style="padding: 2%;">${nome}</h4></div>
        <div class="descr"><p>${descricao}</p></div>
        <div class="dat"><b><p>Início: ${dataInicio}</p><p>Término: ${dataTermino}</p></div>
        <div><a href="#" onclick = "editar('${id}','${autor}','${nome}',' ${descricao}',' ${dataInicio}',' ${dataTermino}',' ${latiMostra}',' ${longMostra}')" class="cad">EDITAR</a></div>
        </div>`;  
        divEventos.innerHTML = divEventos.innerHTML + novoEvento; 
    });
};
window.mostrarEventos =mostrarEventos;
/* Essa função vai receber os valores das propriedades dos objetos recuperados do banco
em seguida, vai inserir nos campos da tela de cadastro para o usuário editar */
window.editar = function(id, autor, nome, descricao, dataIn, dataTer, latiED, longED){
    let dataInicio = new Date(stringParaData(dataIn));
    let dataTermino = new Date(stringParaData(dataTer));    
    const validarAutor = prompt('Ensira o nome do autor do cadastro');
    if(validarAutor===autor){
        limparMarcadores();
        editMarker(nome, descricao, latiED, longED);
        trocarDivis(secEdit, secEvnt, 400);
        document.querySelector('#eventName').value=nome;
        document.querySelector('#dataInicio').valueAsDate=dataInicio;
        document.querySelector('#dataTermino').valueAsDate=dataTermino;
        document.querySelector('#eventDescription').value=descricao;
        const btnAtualizar = document.querySelector('#btnAtualizar');        
        btnAtualizar.addEventListener('click', ()=>{
/* Como não consegui recuperar as coordenadas do marcados do outro arquivo .js
recuperei as coordenadas do DOM como texto e transformei em números para atualizar no Banco */
            const coordenadasString = document.querySelector('#eventCoordinates').value;            
            let latitude;
            let longitude;
            if(coordenadasString===""){
                latitude = latiED;
                longitude = longED;
            }else{
                var coordenadasLatLng = transfCoodenadasEmNumeros(coordenadasString);
                latitude = coordenadasLatLng[0];
                longitude = coordenadasLatLng[1];
            };
// Criei um novo obj com os dados atualizados na tela
                const eventoAtualizado={
                    author:autor,
                    eventName: document.querySelector('#eventName').value,
                    eventDescription: document.querySelector('#eventDescription').value,
                    dataInicio: document.querySelector('#dataInicio').value,
                    dataTermino: document.querySelector('#dataTermino').value,
                    lat: latitude,
                    lng: longitude
                };
            atualizarInfoEvento(eventoAtualizado, id);
            
        });
    };
};
/* Essa função conecta com a API e faz um PUT do obj recebido  
atualizando o evento no Banco de Dados pelo id recebido */
async function atualizarInfoEvento(obj, id){
    if (obj.eventName === "" || obj.eventDescription === "" || obj.dataInicio === "") {
        alert('Preencha os campos obrigatórios!!');
    } else {
        try {
            const response = await fetch(`${urlApi}/${id}`, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(obj)
            });
            console.log(response);
            if (response.ok) {
                alert('Evento atualizado com sucesso!!');
                trocarDivis(secEvnt, secEdit, 400);
                limparMarcadores();
                location.reload();
            }else{
                alert('Erro ao atualizar evento!!');
            }
        } catch (error) {
            console.log(error);
            alert('Ocorreu um erro ao atualizar o evento.');            
        }
    }
};
window.atualizarInfoEvento=atualizarInfoEvento;
// Esse grupo de funções fazem a busca por texto nos eventos da API
textoBusca.addEventListener('input', (event)=>{
    const textoDigitado = event.target.value;
    buscar(textoDigitado);
});
function buscar(texto){
    divEventos.innerHTML="";
    buscarEvento(texto)
};
async function buscarEvento(texto){
    try {
        const response = await fetch(`${urlApi}/${texto}`);
        if (response.ok) {
            const eventos = await response.json();
            limparMarcadores();
            mostrarEventos(eventos);
            setMarkes();            
        } else {
            console.log('Erro ao buscar eventos:', response.status);
        }
    } catch (error) {
        console.log('Ocorreu um erro na busca:', error);
    }
};
// Essa função realiza a troca das divs na apresentação da página
function trocarDivis(div1, div2, duracao){
    let opacidadeDiv1 = 0;
    let opacidadeDiv2 = 1;
    const intervalo = 10; 
    const targetOpacidade = 1;
    const increment = (targetOpacidade / duracao) * intervalo;
/* Inicia um intervalo para aumentar a opacidade da div a ser mostrada */
    const fadeIntervalo = setInterval(() => {
        opacidadeDiv1 += increment;
        div1.style.opacity = opacidadeDiv1;
        if (opacidadeDiv1 >= targetOpacidade) {
        clearInterval(fadeIntervalo); 
        div1.style.opacity = targetOpacidade; 
        div1.style.display = 'block'; 
        div2.style.display = 'none'; 
        }
    }, intervalo);
/* Inicia um intervalo para diminuir gradualmente a opacidade da div a ser ocultada */
    const fadeOutIntervalo = setInterval(() => {
        opacidadeDiv2 -= increment;
        div2.style.opacity = opacidadeDiv2;
        if (opacidadeDiv2 <= 0) {
        clearInterval(fadeOutIntervalo); 
        div2.style.opacity = 0;
        }
    }, intervalo);
};
window.trocarDivis=trocarDivis;
// Essa Função limpas todos os campos do cadastro do HTML
window.limparCampos = function limparCampos(){
    document.querySelector('#author').value="";
    document.querySelector('#eventName').value="";
    document.querySelector('#dataInicio').value="";
    document.querySelector('#dataTermino').value="";
    document.querySelector('#eventDescription').value="";
    document.querySelector("#eventCoordinates").value="";
};
// Essa função transforma a data do padrão do EUA para o nosso
function formatarData(dataAntiga) {
    const data = new Date(dataAntiga);
    const dia = data.getUTCDate();
    const mes = data.getUTCMonth() + 1;
    const ano = data.getUTCFullYear();
    const dataFormatada = `${dia.toString().padStart(2, '0')}-${mes.toString().padStart(2, '0')}-${ano}`;
    return dataFormatada;
}; 
// Essa função transforma a data de string no formato local 
// para a data no formato date EUA
function stringParaData(data){
    const [day, month, year] = data.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date
};
// Essa função converte o valor de string retirada da tela de cadastro separando e convertendo 
// em números 
function transfCoodenadasEmNumeros(coordenadas) {
    coordenadas = coordenadas.slice(1, -1);
    var numeros = coordenadas.split(','); 
    var latCod = parseFloat(numeros[0].trim());
    var lngCod = parseFloat(numeros[1].trim());
    return [latCod, lngCod]; 
};






