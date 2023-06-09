let map;
let marker;
window.marker=marker;
let infoWindows=[];
window.infoWindows=infoWindows;
let center = {lat:-6.892021526686363, lng:-38.55870364759306};

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("map"), {
        center: center,
        zoom: 14,
    }); 
};
initMap(); 
todosOsEventos();

async function todosOsEventos(){
    const conect = await fetch(urlApi);    
    const eventos = await conect.json();    
    mostrarEventos(eventos);
    setMarkes();
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
async function editMarker(nome, descricao){
    markers=[];
    infoWindows=[];
    marker = new google.maps.Marker({
        position: {
            lat: marker.getPosition().lat(),
            lng: marker.getPosition().lng()
            },
            map: map,
            title: `<h4 style="border-bottom-style:groove;">${nome}</h4><p>${descricao}</p>`,
        });
        markers.push(marker);
        setMarkes();
}
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
window.addMarker = addMarker;
window.editMarker = editMarker;




