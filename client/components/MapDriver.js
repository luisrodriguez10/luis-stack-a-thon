import React, { Component } from "react";
import { connect } from "react-redux";
import L from "leaflet";
import "leaflet-routing-machine";
import { createCoordinates, fetchCoordinates } from "../store";

class MapDriver extends Component {
  componentDidMount() {
    function containsCoord(arr, val) {
      return arr.some((element) => {
        if (element.lat === val) {
          return true;
        }
        return false;
      });
    }
    var map =
      this.props.routeId * 1 === 1
        ? L.map("map").setView([29.690821, -95.546921], 15)
        : L.map("map").setView([29.697121, -95.567328], 15);
    var startIcon;
    var endIcon;
    var marker;

    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: "OSM",
    }).addTo(map);

    if (this.props.routeId * 1 === 1) {
      startIcon = L.icon({
        iconUrl: "../public/bus.png",
        iconSize: [60, 60],
      });

      endIcon = L.icon({
        iconUrl: "../public/school.png",
        iconSize: [40, 40],
      });
    } else {
      startIcon = L.icon({
        iconUrl: "../public/bus.png",
        iconSize: [60, 60],
      });

      endIcon = L.icon({
        iconUrl: "../public/bus-stop.png",
        iconSize: [80, 80],
      });
    }

    if (this.props.routeId * 1 === 1) {
      marker = L.marker([29.690821, -95.546921], { icon: startIcon }).addTo(
        map
      );
    } else {
      marker = L.marker([29.697121, -95.567328], { icon: startIcon }).addTo(
        map
      );
    }

    map.on("click", (e) => {
      L.marker([e.latlng.lat, e.latlng.lng], {
        icon: endIcon,
      }).addTo(map);
      L.Routing.control({
        waypoints: [
          this.props.routeId * 1 === 1
            ? L.latLng(29.690821, -95.546921)
            : L.latLng(29.697121, -95.567328),
          L.latLng(e.latlng.lat, e.latlng.lng),
        ],
      })
        .on("routesfound", async (ev) => {
          await this.props.createCoordinates(
            ev.routes[0].coordinates[ev.routes[0].coordinates.length - 1]
          );
          await this.props.fetchCoordinates();
          let stopsCoords = [];
          let stopOne = ev.routes[0].coordinates[35];
          let stopTwo = ev.routes[0].coordinates[55];
          let stopThree = ev.routes[0].coordinates[85];
          marker.on("click", async () => {
            if (!containsCoord(stopsCoords, stopOne.lat)) {
              marker.setLatLng([stopOne.lat, stopOne.lng]);
              stopsCoords.push(stopOne);
              await this.props.createCoordinates(stopOne);
              await this.props.fetchCoordinates();
            } else if (!containsCoord(stopsCoords, stopTwo.lat)) {
              marker.setLatLng([stopTwo.lat, stopTwo.lng]);
              stopsCoords.push(stopTwo);
              await this.props.createCoordinates(stopTwo);
              await this.props.fetchCoordinates();
            } else if (!containsCoord(stopsCoords, stopThree.lat)) {
              marker.setLatLng([stopThree.lat, stopThree.lng]);
              stopsCoords.push(stopThree);
              await this.props.createCoordinates(stopThree);
              await this.props.fetchCoordinates();
            } else {
              marker.setLatLng([
                ev.routes[0].coordinates[ev.routes[0].coordinates.length - 1]
                  .lat,
                ev.routes[0].coordinates[ev.routes[0].coordinates.length - 1]
                  .lng,
              ]);
              await this.props.createCoordinates(
                ev.routes[0].coordinates[ev.routes[0].coordinates.length - 1]
              );
              await this.props.fetchCoordinates();
            }
          });
        })
        .addTo(map);
    });
  }

  render() {
    return <div id="map"></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    coordinates: state.coordinates,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCoordinates: (coordinates) => {
      dispatch(createCoordinates(coordinates));
    },
    fetchCoordinates: () => dispatch(fetchCoordinates()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapDriver);
