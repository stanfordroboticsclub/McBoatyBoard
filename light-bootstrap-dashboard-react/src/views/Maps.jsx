/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {Component} from "react";

import $ from 'jquery';
import L from 'leaflet';
import boat from "assets/img/boat.png";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

var boatIcon = L.icon({
    iconUrl: boat,
    // shadowUrl: "assets/img/boat.png",
    iconSize:     [128, 128], // size of the icon
    // shadowSize:   [48, 48], // size of the shadow
    iconAnchor:   [64, 64], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 5],  // the same for the shadow
    popupAnchor:  [-3, -5] // point from which the popup should open relative to the iconAnchor
});
const provider = new OpenStreetMapProvider();
const searchControl = new GeoSearchControl({
    provider: provider, // required
    showMarker: true, // optional: true|false  - default true
    showPopup: false, // optional: true|false  - default false
    marker: {
        // optional: L.Marker    - default L.Icon.Default
        icon: new L.Icon.Default(),
        draggable: false,
    },
    popupFormat: ({ query, result }) => result.label, // optional: function    - default returns result label
    maxMarkers: 1, // optional: number      - default 1
    retainZoomLevel: false, // optional: true|false  - default false
    animateZoom: true, // optional: true|false  - default true
    autoClose: false, // optional: true|false  - default false
    searchLabel: 'Enter address', // optional: string      - default 'Enter address'
    keepResult: false, // optional: true|false  - default false
    updateMap: true, // optional: true|false  - default true
});
var boat2;
var polylinee = null;
var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    osm = L.tileLayer(osmUrl, {
        maxZoom: 18,
        attribution: osmAttrib
    });
class Maps extends Component {
    is_mounted = false;
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            tileLayer: null,
            geojsonLayer: null,
            geojson: null,
            databaseRecent: props.databaseRecent,
            boatPath: [[0,0]]
        };
        this.onMapClick = this.onMapClick.bind(this);
    }

    componentDidMount()
    {
        this.is_mounted = true;
        if (!this.state.map) this.init();
        setInterval(this.loopAndSave, 2000);
    }
    componentWillUnmount() {
        this.is_mounted = false;
    }
    loopAndSave = () => {
        if (this.is_mounted) {
            let currentThis = this;
                currentThis.setState((prevState, props) => {
                    var i = 0;
                    prevState.boatPath = [];

                    var prev = [7.4602630849104,134.615571016213];
                    if (props.databaseRecent.length !== 88) {
                        var length = props.databaseRecent.length - 1;
                        for (i = 0; i < props.databaseRecent.length - 1; i++) {
                            let ar = [props.databaseRecent[i]['px'], props.databaseRecent[i]['py']];
                            prevState.boatPath.push(ar);
                            console.log("ARR", ar);
                                polylinee = L.polyline([prev, ar], {color: 'red'}).addTo(prevState.map);
                            prev = ar;
                        }
                        var latlng = L.latLng(props.databaseRecent[length]['px'], props.databaseRecent[length]['py']);
                        boat2.setLatLng(latlng);
                    }
                    if (polylinee != null) {
                        prevState.map.removeLayer(polylinee);
                        // polyline.removeFrom(prevState.map);
                    }

                    return {
                        boatPath: prevState.boatPath,
                        map: prevState.map
                    }

                });
        }
    };
// Script for adding marker on map click
    onMapClick(e) {
        if(this.is_mounted) {
            console.log("Map clicked: ",e.latlng.lat, e.latlng.lng);
            var geojsonFeature = {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Point",
                    "coordinates": [e.latlng.lat, e.latlng.lng]
                }
            };

            var marker;
            let currentThis = this;

            L.geoJson(geojsonFeature, {

                pointToLayer: function (feature, latlng) {

                    marker = L.marker(e.latlng, {
                        // icon: boatIcon,
                        title: "Location: " + e.latlng.toString(),
                        alt: "Resource Location",
                        riseOnHover: true,
                        draggable: true,

                    }).bindPopup("<input type='button' value='Delete this marker' class='marker-delete-button'/>");
                    marker.on("popupopen", () => {
                        // var tempMarker = this;

                        // var tempMarkerGeoJSON = this.toGeoJSON();

                        // var lID = tempMarker._leaflet_id; // Getting Leaflet ID of this marker

                        // To remove marker on click of delete
                        $(".marker-delete-button:visible").click(function () {
                            currentThis.setState((prevState, props) => {
                                prevState.map.removeLayer(marker);
                                return {
                                    map: prevState.map
                                }
                            });
                        });
                    });//.on('mouseover', onMarkerMouseOver).on('mouseout', onMarkerMouseOut);

                    return marker;
                }
            }).addTo(this.state.map);
        }
    }

    // onMarkerMouseOver(e) {
    //     var tempMarker = this;
    //     tempMarker.bindPopup("Location: " + e.latlng.toString()).openPopup();
    // }
    //
    // onMarkerMouseOut() {
    //     var tempMarker = this;
    //     tempMarker.closePopup();
    // }

// Function to handle delete as well as other events on marker popup open


// getting all the markers at once
    getAllMarkers() {

        var allMarkersObjArray = [];//new Array();
        var allMarkersGeoJsonArray = [];//new Array();

        $.each(this.state.map._layers, function (ml) {
            //console.log(map._layers)
            if (this.state.map._layers[ml].feature) {

                allMarkersObjArray.push(this);
                // allMarkersGeoJsonArray.push(JSON.stringify(this.toGeoJSON())) I commented this out
            }
        });

        console.log(allMarkersObjArray);
        alert("total Markers : " + allMarkersGeoJsonArray.length + "\n\n" + allMarkersGeoJsonArray + "\n\n Also see your console for object view of this array" );
    }





    init() {
        if (this.state.map) return;
        // this function creates the Leaflet map object and is called after the Map component mounts
        let map = L.map("mapid",{ drawControl: true }).setView([7.5150, 134.5825], 13);
        L.control.zoom({ position: "bottomleft"}).addTo(map);
        L.control.scale({ position: "bottomleft"}).addTo(map);

        // a TileLayer is used as the "basemap"
        // const tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);
        const tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        boat2 = L.marker([7.462490667478755, 134.633492079957], {icon: boatIcon}).addTo(map);
        // set our state to include the tile layer
        this.setState({ map, tileLayer },() => {
            this.state.map.on('click', this.onMapClick);
            this.state.map.addControl(searchControl);
        });

        console.log("MAP WAS INITTED");
        // attaching function on map click
        $(".get-markers").on("click", this.getAllMarkers);
    }
    render() {
        return (<div id="mapid"/>
        );
    }

}


{/* <CSVDownload data={csvData} target="_blank" />; */}
export default Maps;

