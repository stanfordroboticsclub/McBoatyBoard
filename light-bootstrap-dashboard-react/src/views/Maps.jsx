// /*!
//
// =========================================================
// * Light Bootstrap Dashboard React - v1.3.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// */
// import React from "react";
// import $ from 'jquery';
// import L from 'leaflet';
// import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
//
// const provider = new OpenStreetMapProvider();
// const searchControl = new GeoSearchControl({
//     provider: provider, // required
//     showMarker: true, // optional: true|false  - default true
//     showPopup: false, // optional: true|false  - default false
//     marker: {
//         // optional: L.Marker    - default L.Icon.Default
//         icon: new L.Icon.Default(),
//         draggable: false,
//     },
//     popupFormat: ({ query, result }) => result.label, // optional: function    - default returns result label
//     maxMarkers: 1, // optional: number      - default 1
//     retainZoomLevel: false, // optional: true|false  - default false
//     animateZoom: true, // optional: true|false  - default true
//     autoClose: false, // optional: true|false  - default false
//     searchLabel: 'Enter address', // optional: string      - default 'Enter address'
//     keepResult: false, // optional: true|false  - default false
//     updateMap: true, // optional: true|false  - default true
// });
// var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
//     osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     osm = L.tileLayer(osmUrl, {
//         maxZoom: 18,
//         attribution: osmAttrib
//     });
//
//
// // initialize the map on the "map" div with a given center and zoom
// // var map = L.map('map').setView([25.92, 79.84], 5).addLayer(osm);
//
// var mymap = L.map('mapid', { drawControl: true }).setView([7.5150, 134.5825], 13);
//
// // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
// //   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributor',
// //   //other attributes.
// // }).addTo(mymap);
//
//
//
// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(mymap);
//
//
// // attaching function on map click
// mymap.on('click', onMapClick);
//
//
// // Script for adding marker on map click
// function onMapClick(e) {
//
//     var geojsonFeature = {
//         "type": "Feature",
//         "properties": {},
//         "geometry": {
//             "type": "Point",
//             "coordinates": [e.latlng.lat, e.latlng.lng]
//         }
//     }
//
//     var marker;
//
//     L.geoJson(geojsonFeature, {
//
//         pointToLayer: function(feature, latlng){
//
//             marker = L.marker(e.latlng, {
//
//                 title: "Location: " + e.latlng.toString(),
//                 alt: "Resource Location",
//                 riseOnHover: true,
//                 draggable: true,
//
//             }).bindPopup("<input type='button' value='Delete this marker' class='marker-delete-button'/>");
//
//             marker.on("popupopen", onPopupOpen);//.on('mouseover', onMarkerMouseOver).on('mouseout', onMarkerMouseOut);
//
//             return marker;
//         }
//     }).addTo(mymap);
// }
//
// // function onMarkerMouseOver(e) {
// //   var tempMarker = this;
// //   tempMarker.bindPopup("Location: " + e.latlng.toString()).openPopup();
// // }
//
// // function onMarkerMouseOut() {
// //   var tempMarker = this;
// //   tempMarker.closePopup();
// // }
//
// // Function to handle delete as well as other events on marker popup open
// function onPopupOpen() {
//
//     var tempMarker = this;
//
//     //var tempMarkerGeoJSON = this.toGeoJSON();
//
//     //var lID = tempMarker._leaflet_id; // Getting Leaflet ID of this marker
//
//     // To remove marker on click of delete
//     $(".marker-delete-button:visible").click(function () {
//         mymap.removeLayer(tempMarker);
//     });
// }
//
// // getting all the markers at once
// function getAllMarkers() {
//
//     var allMarkersObjArray = [];//new Array();
//     var allMarkersGeoJsonArray = [];//new Array();
//
//     $.each(mymap._layers, function (ml) {
//         //console.log(map._layers)
//         if (mymap._layers[ml].feature) {
//
//             allMarkersObjArray.push(this)
//             allMarkersGeoJsonArray.push(JSON.stringify(this.toGeoJSON()))
//         }
//     })
//
//     console.log(allMarkersObjArray);
//     alert("total Markers : " + allMarkersGeoJsonArray.length + "\n\n" + allMarkersGeoJsonArray + "\n\n Also see your console for object view of this array" );
// }
//
// mymap.addControl(searchControl);
//
// $(".get-markers").on("click", getAllMarkers);
//
//
//
//
//
// // import { CSVLink } from "react-csv";
//
// // const headers = [
// //   { label: "", key: "firstName" },
// //   { label: "Latitude", key: "lastName" },
// //   { label: "Longitude", key: "email" }
// // ];
//
// // const data = [
// //   { firstName: "Warren", lastName: "Morrow", email: "sokyt@mailinator.com", age: "36" },
// //   { firstName: "Gwendolyn", lastName: "Galloway", email: "weciz@mailinator.com", age: "76" },
// //   { firstName: "Astra", lastName: "Wyatt", email: "quvyn@mailinator.com", age: "57" },
// //   { firstName: "Jasmine", lastName: "Wong", email: "toxazoc@mailinator.com", age: "42" },
// //   { firstName: "Brooke", lastName: "Mcconnell", email: "vyry@mailinator.com", age: "56" },
// //   { firstName: "Christen", lastName: "Haney", email: "pagevolal@mailinator.com", age: "23" },
// //   { firstName: "Tate", lastName: "Vega", email: "dycubo@mailinator.com", age: "87" },
// //   { firstName: "Amber", lastName: "Brady", email: "vyconixy@mailinator.com", age: "78" },
// //   { firstName: "Philip", lastName: "Whitfield", email: "velyfi@mailinator.com", age: "22" },
// //   { firstName: "Kitra", lastName: "Hammond", email: "fiwiloqu@mailinator.com", age: "35" },
// //   { firstName: "Charity", lastName: "Mathews", email: "fubigonero@mailinator.com", age: "63" }
// // ];
//
// // const csvReport = {
// //   data: data,
// //   headers: headers,
// //   filename: 'Markers.csv'
// // };
//
// // function App() {
// //     return (
// //       <div classname="App">
// //         <CSVLink {...csvreport}="">Export to CSV</CSVLink>
// //       </div>
// //     );
// //   }
//
//
// const csvData = [
//     ["firstname", "lastname", "email"],
//     ["Ahmed", "Tomi", "ah@smthing.co.com"],
//     ["Raed", "Labes", "rl@smthing.co.com"],
//     ["Yezzi", "Min l3b", "ymin@cocococo.com"]
// ];
//
//
// {/* <CSVDownload data={csvData} target="_blank" />; */}
//
