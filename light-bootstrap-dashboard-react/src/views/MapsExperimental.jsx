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
import { GoogleMap, LoadScript} from '@react-google-maps/api';
import { Polyline, DrawingManager} from '@react-google-maps/api';
class MapsExperimental extends Component {

    constructor(props) {
        super(props);
        this.state = {
          messages: props.messages,
            client: props.client
        };
        this.map = React.createRef();
        this.mapContainerStyle = {
            height: "400px",
            width: "800px"
        };

        this.center = {
            lat: 0,
            lng: -180
        };

        this.onLoad = polyline => {
            console.log('polyline: ', polyline)
        };

        this.path = [
            {lat: 37.772, lng: -122.214},
            {lat: 21.291, lng: -157.821},
            {lat: -18.142, lng: 178.431},
            {lat: -27.467, lng: 153.027}
        ];

        this.options = {
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
        this.markerList = [];

        this.onMarkerComplete = marker => {
            console.log("MESSS:LDJKF:LSDJFK:LKDJSF:LDJFK" + this.state.messages);
            var infowindow = new window.google.maps.InfoWindow({
                content: "Location:" + "<br>" + marker.getPosition().toUrlValue(6)
        });
            window.google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
                return function(evt) {
                    infowindow.open(this.map, marker);
                }
        })(marker));
            window.google.maps.event.addListener(marker, 'mouseout', (function(marker) {
                return function(evt) {
                    infowindow.close();
                }
            })(marker));
            this.markerList.push(marker);
            console.log("Marker Lat: ", this.markerList);
        };


        this.onLoadDraw = drawingManager => {
            console.log(drawingManager)
        };
        this.onPolygonComplete = polygon => {
            console.log("Polygon: " , polygon)
        };
        this.state.client.onmessage = (message) => {
            console.log("UPDATED THING");
            console.log(message.data);
        };
    }
    render() {
        return (
            <LoadScript
                googleMapsApiKey="AIzaSyBJrdhB6RhfeY6V7rOVpc-Nk5dU9olBc-0&libraries=drawing"
            >
                <GoogleMap
                    mapContainerStyle={this.mapContainerStyle}
                    center={this.center}
                    zoom={2}
                    ref = {this.map}
                >
                    <Polyline
                        onLoad={this.onLoad}
                        path={this.path}
                        options={this.options}
                    />
                    <DrawingManager
                        onLoad={this.onLoadDraw}
                        onPolygonComplete={this.onPolygonComplete}
                        onMarkerComplete={this.onMarkerComplete}
                    />
                    { /* Child components, such as markers, info windows, etc. */ }
                    <></>
                </GoogleMap>

            </LoadScript>
        )
    }
}
export default MapsExperimental;
