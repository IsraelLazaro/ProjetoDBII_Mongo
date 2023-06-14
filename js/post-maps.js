let map;
let marker;
let center = {lat:-6.892021526686363, lng:-38.55870364759306};
const btnCad = document.querySelector('#btnSalvar');
const chamarCad = document.querySelector('#chamarTelaCad');
const btnVoltar = document.querySelector('#back');
const sectionApresenta = document.querySelector('#telaApresentacao');
const sectionCadastro = document.querySelector('#telaCadastro');

/* INSTANCIANADO O MAPA NA PÁGINA */
async function initMap() {
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("map"), {
        center: center,
        zoom: 15,    
    });
/* BLOCO - ADICIONANDO BOTÃO DE MUDAR O TIPO DE MAPA  */
    // Criando o contêiner para os botões    
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");
    // Criando o botão para o modo Satélite
    const btnSatelite = document.createElement("button");
    btnSatelite.textContent = "Satélite";
    btnSatelite.classList.add("btnMapModo");
    // Criando o botão para o modo Padrão
    const btnPadrao = document.createElement("button");
    btnPadrao.textContent = "Padrão";
    btnPadrao.classList.add("btnMapModo");
    // Adicionando os botões ao contêiner
    btnContainer.appendChild(btnSatelite);
    btnContainer.appendChild(btnPadrao);
    // Posicionando o contêiner com os botões no canto superior esquerdo do mapa
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(btnContainer);
    // Adicionando um evento de clique ao botão de Satélite
    btnSatelite.addEventListener("click", function () {
        map.setMapTypeId(google.maps.MapTypeId.HYBRID);
    });
    // Adicionando um evento de clique ao botão de Padrão
    btnPadrao.addEventListener("click", function () {
        map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    });
/* FIM DO BLOCO - ADICIONANDO BOTÃO DE MUDAR O TIPO DE MAPA  */
    marker = new google.maps.Marker({
        map: map,
        position: center,
        draggable: true,
        title: "Cajazeiras",
        animation: google.maps.Animation.BOUNCE
    });    
    map.addListener("click", (event)=>{
        addMarker(event);
    });
    function addMarker(event){
        marker.setPosition(event.latLng);
        const imput = document.getElementById("eventCoordinates");
        imput.value = event.latLng;     
    };
};
initMap();
/* Adicona um evento click ao botão salvar para chamar afunção salvarEvento */
btnCad.addEventListener('click', ()=>{    
    let latitude = marker.getPosition().lat();
    let longitude = marker.getPosition().lng();
    const evento ={
        author:document.querySelector('#author').value,
        eventName: document.querySelector('#eventName').value,
        eventDescription: document.querySelector('#eventDescription').value,
        dataInicio: document.querySelector('#dataInicio').value,
        dataTermino: document.querySelector('#dataTermino').value,
        lat:latitude,
        lng: longitude
    };
    salvarEvento(evento);
    marker.setPosition(center);
    trocarDivis(sectionApresenta, sectionCadastro, 500); 
    map.setCenter(center);   
});
/* Adicona um evento click ao botão Cadastrar Evento para mudar a div para cadastro */
chamarCad.addEventListener('click', ()=>{
    trocarDivis(sectionCadastro, sectionApresenta, 300);
});
/* Adicona um evento click ao botão voltar para a div inicial */
btnVoltar.addEventListener('click', ()=>{
    setTimeout(() => {
        marker.setPosition(center);
        trocarDivis(sectionApresenta, sectionCadastro, 300);
    }, 500);
    

});


