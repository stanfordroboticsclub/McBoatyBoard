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
import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Polyline, DrawingManager, Marker } from '@react-google-maps/api';
const mapContainerStyle = {
    height: "400px",
    width: "800px"
};

const center = {
    lat: 0,
    lng: -180
};

const onLoad = polyline => {
    console.log('polyline: ', polyline)
};

const path = [
    {lat: 37.772, lng: -122.214},
    {lat: 21.291, lng: -157.821},
    {lat: -18.142, lng: 178.431},
    {lat: -27.467, lng: 153.027}
];

const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: [
        {lat: 37.772, lng: -122.214},
        {lat: 21.291, lng: -157.821},
        {lat: -18.142, lng: 178.431},
        {lat: -27.467, lng: 153.027}
    ],
    zIndex: 1
};
var markerList = [];
const onMarkerComplete = marker => {
    markerList.push(marker);
    console.log("Marker Lat: ", markerList);
};

const onLoadDraw = drawingManager => {
    console.log(drawingManager)
};
const onPolygonComplete = polygon => {
    console.log("Polygon: " , polygon)
};
class MapsExperimental extends Component {
    render() {
        return (
            <LoadScript
                googleMapsApiKey="AIzaSyBJrdhB6RhfeY6V7rOVpc-Nk5dU9olBc-0&libraries=drawing"
            >
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={2}
                >
                    <Polyline
                        onLoad={onLoad}
                        path={path}
                        options={options}
                    />
                    <DrawingManager
                        onLoad={onLoadDraw}
                        onPolygonComplete={onPolygonComplete}
                        onMarkerComplete={onMarkerComplete}
                    />
                    { /* Child components, such as markers, info windows, etc. */ }
                    <></>
                </GoogleMap>
            </LoadScript>
        )
    }
}
export default MapsExperimental;
