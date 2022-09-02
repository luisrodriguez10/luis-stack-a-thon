import React, { Component } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Routing } from "leaflet";

var busIcon = L.icon({
  iconUrl: "../public/bus.png",
  iconSize: [60, 60],
});

var schoolIcon = L.icon({
  iconUrl: "../public/school.png",
  iconSize: [80, 80],
});

class Map extends Component {
  componentDidMount() {
    var map = L.map("map").setView([29.680999, -95.555945], 15);
    var tileLayer = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: "OSM",
    }).addTo(map);
    // marker icon
    var busIcon = L.icon({
      iconUrl: "../public/bus.png",
      iconSize: [60, 60],
    });
    var schoolIcon = L.icon({
      iconUrl: "../public/school.png",
      iconSize: [80, 80],
    });

    // MARKER
    var marker = L.marker([29.680999, -95.555945], { icon: busIcon }).addTo(
      map
    );
    // map click event
    map.on("click", function (e) {
      var secondMarker = L.marker([e.latlng.lat, e.latlng.lng], {
        icon: schoolIcon,
      }).addTo(map);
      L.Routing.control({
        waypoints: [
          L.latLng(29.680999, -95.555945),
          L.latLng(e.latlng.lat, e.latlng.lng),
        ],
      })
        .on("routesfound", function (ev) {
          marker.once("click", function (e) {
            ev.routes[0].coordinates.forEach(function (coord, index) {
              setTimeout(() => {
                marker.on("click", function (et) {
                  marker.setLatLng([coord.lat, coord.lng]);
                });
              }, 100 * index);
            });
          });
        })
        .addTo(map);
    });
  }

  render() {
    return (
      <div id="map"></div>
    );
  }
}

export default Map;
