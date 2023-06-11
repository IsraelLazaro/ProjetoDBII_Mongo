let map;
let marker;
let infoWindows=[];
let markers =[];
let center = {lat:-6.892021526686363, lng:-38.55870364759306};
window.addMarker = addMarker;
window.setMarkes = setMarkes;
window.editMarker = editMarker;
async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("map"), {
        center: center,
        zoom: 14,
    }); 
};
initMap();
todosOsEventos();
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
            map.addListener("click", function() {
                infoWindow.close();
                }); 
            });
        markers[i].setAnimation(google.maps.Animation.BOUNCE);
        };
};
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
function editMarker(nome, descricao, lati, long){
    markers=[];
    infoWindows=[];
    marker = new google.maps.Marker({
        position: {
            lat: parseFloat(lati),
            lng: parseFloat(long)
            },
            map: map,
            title: `<h4 style="border-bottom-style:groove;">${nome}</h4><p>${descricao}</p>`,
        });
        markers.push(marker); 
        setMarkes();
        ativarMarcadores();       
};
async function todosOsEventos(){
    const conect = await fetch(urlApi);    
    const eventos = await conect.json();    
    mostrarEventos(eventos);
    setMarkes();
};
/* ---------------------------REDIS------------------------------------- */
async function listarEventosDoRedis(){ 
        const conect = await fetch(`${urlApi}/redis`);
        const eventos = await conect.json();
        limparMarcadores();
        
        mostrarEventos(eventos);
        setMarkes();    
};
/* ---------------------------REDIS------------------------------------- */
function limparMarcadores(){
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null); 
    }
    markers=[];
    infoWindows=[];
};
/* Essa função é utilizada para limpar os marcadores do mapa */
/* durante a pesquisa */
window.limparMarcadores=limparMarcadores;

function ativarMarcadores(){
    map.addListener("click", (event)=>{
        addMarker(event);              
    });    
    function addMarker(event){
        
        marker.setPosition(event.latLng);
        const imput = document.getElementById("eventCoordinates");
        imput.value = event.latLng;        
        marker.setDraggable(true);
    };    
};

