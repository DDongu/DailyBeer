const key = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDaRhR01rw3B2WxASU6zdOQ8wg-9Kpo024&libraries=places&callback=initMap";
// const body = document.querySelector('body');     //common.js에서 body가 이미 선언됨
const script = document.createElement('script');

script.setAttribute('async', '');
script.setAttribute('src', key) ;
body.appendChild(script);