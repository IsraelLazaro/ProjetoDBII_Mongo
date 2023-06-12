let map;
let marker;
let infoWindows=[];
let markers =[];
let center = {lat:-6.892021526686363, lng:-38.55870364759306};
window.addMarker = addMarker;
window.setMarkes = setMarkes;
window.editMarker = editMarker;
window.limparMarcadores=limparMarcadores;
window.centralizar = centralizar;
async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("map"), {
        center: center,
        zoom: 14,
    }); 
};
initMap();
todosOsEventos();
//Essa função recebe um arry de marcadores e seta eles no mapa 
async function setMarkes(){     
    for (let i = 0; i < markers.length; i++) {
        marker = markers[i];
        markers[i].setMap(map);    
        let infoWindow = new google.maps.InfoWindow({
            content: `<h4>${markers[i].title}</h4>`
            });
        infoWindows.push(infoWindow);
        markers[i].addListener('click', function(){
            infoWindows[i].open(map, markers[i]); 
            map.addListener('click', function() {
                infoWindow.close();
                }); 
            });
        markers[i].setAnimation(google.maps.Animation.BOUNCE);
        };        
};
//Essa função adiciona o marcador no mapa e adiciona no arry de marcadores
async function addMarker(nome, descricao, lati, long){
    marker = new google.maps.Marker({
        position: {
            lat: lati,
            lng: long
            },
            map: map,
            title: `<h4 style="border-bottom-style:groove;">${nome}</h4><p>${descricao}</p>`,
        });
        markers.push(marker);
};
// Essa função adiciona o marcador quando escolhido editar um evento
// o mapa é desbloqueado e o usuário pode mover o marcador e escolher
// um novo ponto no mapa
function editMarker(nome, descricao, lati, long){
    markers=[];
    infoWindows=[];
    let posicao = {
        lat: parseFloat(lati),
        lng: parseFloat(long)
    }
    marker = new google.maps.Marker({
        position:posicao,
            map: map,
            title: `<h4 style="border-bottom-style:groove;">${nome}</h4><p>${descricao}</p>`,
        });
        markers.push(marker); 
        map.setCenter(posicao);
        setMarkes();
        ativarMarcadores();       
};
function centralizar(lati, long, zoom){
    var posicao = new google.maps.LatLng(parseFloat(lati), parseFloat(long));
    map.setCenter(posicao);
    map.setZoom(zoom);
};

// Essa função mostra todos os eventos ao abrir a página 
async function todosOsEventos(){
    const conect = await fetch(urlApi);    
    const eventos = await conect.json();    
    mostrarEventos(eventos);
    setMarkes();
};
// Essa função é utilizada para limpar os marcadores do mapa 
// durante a pesquisa 
function limparMarcadores(){
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null); 
    }
    markers=[];
    infoWindows=[];
};
// Essa função ativa o marcador por click
function ativarMarcadores(){
    map.addListener('click', (event)=>{
        addMarker(event);              
    });    
    function addMarker(event){
        
        marker.setPosition(event.latLng);
        const imput = document.getElementById("eventCoordinates");
        imput.value = event.latLng;        
        marker.setDraggable(true);
    };    
};

