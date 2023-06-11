const seletedConveni1 = document.querySelector('#seletedConveni1');
const seletedConveni2 = document.querySelector('#seletedConveni2');
let isSeleted = false;

/* Set map */
function initMap() {
    // 충북대 36.6283933, 127.459223
    const base = new google.maps.LatLng(36.6275, 127.4573)
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: base,
        scrollwheel: true
    });
    const infowindow = new google.maps.InfoWindow();
    const icon = "../img/cu.png";
    
    /* Search Service */
    // search Request
    let request = { 
        query: 'cu',                                    //Search word
        location: base,
        fields: ['name', 'geometry', 'business_status', 'opening_hours'],                   //Return fields
    };

    // map Service
    const service = new google.maps.places.PlacesService(map);
    service.textSearch(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let j = 0; j < results.length; j++) {
            createMarker(results[j], map, infowindow, icon);
            createListItem(results[j].plus_code.global_code, results[j].name, results[j].formatted_address, results[j].business_status);
        }
        map.setCenter(results[0].geometry.location);    //Set center to the first result
        }
    });
}

function removeList(){
    const parent = document.getElementById('storelist-box');
    parent.innerHTML = '<table></table>';
}

function clickedStore(n) {
    // Empty the list
    removeList();
    // 충북대 36.6283933, 127.459223
    const base = new google.maps.LatLng(36.6275, 127.4573)
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: base,
        scrollwheel: true,
    });
    const infowindow = new google.maps.InfoWindow();
    const icons = ["../img/cu.png", "../img/gs25.png", "../img/seven.png"]
    
    /* Search Service */
    // search Request
    let requests = [{ 
        query: 'cu',                                    //Search word
        location: base,
        fields: ['name', 'geometry', 'business_status', 'opening_hours'],                   //Return fields
    },
    {
        query: 'gs25',                                    //Search word
        location: base,
        fields: ['name', 'geometry', 'business_status', 'opening_hours'],                   //Return fields
    },
    {
        query: 'seveneleven',                              //Search word
        location: base,
        fields: ['name', 'geometry', 'business_status', 'opening_hours'],                   //Return fields
    }];


    // map Service
    const service = new google.maps.places.PlacesService(map);
    service.textSearch(requests[n], function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let j = 0; j < results.length; j++) {
            createMarker(results[j], map, infowindow, icons[n]);
            createListItem(results[j].plus_code.global_code, results[j].name, results[j].formatted_address, results[j].business_status);
        }
        map.setCenter(results[0].geometry.location);    //Set center to the first result
        }
    });
}

/* Create markerCollection */
let i = 0;
function createMarker(place, map, infowindow, icon) {
    if(place.plus_code.global_code == "8Q89JFG3+X4" && place.name == "CU store") {
        return null;
    }
    let marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name,
        // icon: {
        //     url: icon,
        // },
    });
    // can find the marker in the markerCollection by ID
    let id = place.plus_code.global_code;
    markerCollection[id] = marker;
  
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

/* Effect the marker */
// function markerActivity(marker) {
//     let keys = Object.keys(markerCollection);
//     for(let i=0; i<keys.length; i++) {
//         markerCollection[keys[i]].setAnimation(null);
//     }
//     // Apply clicked marker effect
//     marker.setAnimation(google.maps.Animation.BOUNCE);
// }
function markerActivity(marker) {
    let keys = Object.keys(markerCollection);
    for(let i=0; i<keys.length; i++) {
        markerCollection[keys[i]].setVisible(false);
    }
    // Apply clicked marker effect
    marker.setVisible(true);
}

/* Create a list of marked marker */
function createListItem(id, name, address, isOpen){
    const table = document.querySelector('table');
    const tr = document.createElement('tr');
    const item = document.createElement('td');
    const p = [document.createElement('p'), document.createElement('p'), document.createElement('p'), document.createElement('p')];

    // Title
    p[0].textContent = name;
    p[0].className = 'store-title'
    item.append(p[0]);

    // Address
    p[1].textContent = address;
    item.append(p[1]);
    
    // Open or Close
    if(isOpen=="OPERATIONAL") {
        p[2].textContent = "영업 중";
        p[2].style.color = "green";
    } else {
        p[2].textContent = "영업 종료";
        p[2].style.color = "red";
    }
    item.append(p[2]);

    //
    p[3].textContent = id;
    p[3].style.display = "none";
    item.append(p[3]);

    // to Button
    item.className = 'btn text-left store-item';
    item.setAttribute('type', 'button');

    // Event
    item.addEventListener('click', function() {
        const marker = markerCollection[id];
        markerActivity(marker);
        seletedConveni1.innerHTML = name;
        seletedConveni2.innerHTML = name;
    });

    // Add to table
    tr.appendChild(item);
    table.appendChild(tr);
}

var markerCollection = {};
window.initMap = initMap;