import React, { Component } from "react";
import { connect } from "react-redux";
import L from "leaflet";
import "leaflet-routing-machine";
import { createCoordinates, fetchCoordinates } from "../store";

class MapParent extends Component {
  async componentDidUpdate(prevProps) {
    if (prevProps.coordinates.length !== this.props.coordinates.length) {
      var container = L.DomUtil.get("map");

      if (container != null) {
        container._leaflet_id = null;
      }

      var map =
        this.props.coordinates.length < 6
          ? L.map("map").setView([29.690821, -95.546921], 15)
          : L.map("map").setView([29.697121, -95.567328], 15);
      var startIcon;
      var endIcon;
      var marker;

      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution: "OSM",
      }).addTo(map);

      if (this.props.coordinates.length < 6) {
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

      if (this.props.coordinates.length < 6) {
        marker = L.marker([29.690821, -95.546921], { icon: startIcon }).addTo(
          map
        );
      } else {
        marker = L.marker(
          [
            this.props.coordinates[this.props.coordinates.length - 1].lat * 1,
            this.props.coordinates[this.props.coordinates.length - 1].lng * 1,
          ],
          { icon: startIcon }
        ).addTo(map);
      }

      if (this.props.coordinates.length < 6) {
        L.marker(
          [
            this.props.coordinates[0].lat * 1,
            this.props.coordinates[0].lng * 1,
          ],
          {
            icon: endIcon,
          }
        ).addTo(map);
      } else {
        L.marker(
          [
            this.props.coordinates[5].lat * 1,
            this.props.coordinates[5].lng * 1,
          ],
          {
            icon: endIcon,
          }
        ).addTo(map);
      }

      L.Routing.control({
        waypoints: [
          this.props.coordinates.length < 6
            ? L.latLng(29.690821, -95.546921)
            : L.latLng(29.697121, -95.567328),
          L.latLng(
            this.props.coordinates[this.props.coordinates.length - 1].lat * 1,
            this.props.coordinates[this.props.coordinates.length - 1].lng * 1
          ),
        ],
      }).addTo(map);

      if (
        this.props.coordinates.length > 1 &&
        this.props.coordinates.length < 6
      ) {
        marker.setLatLng([
          this.props.coordinates[this.props.coordinates.length - 1].lat * 1,
          this.props.coordinates[this.props.coordinates.length - 1].lng * 1,
        ]);
      } else if (this.props.coordinates.length > 5) {
        marker.setLatLng([
          this.props.coordinates.length === 6
            ? 29.697121
            : this.props.coordinates[this.props.coordinates.length - 1].lat * 1,
          this.props.coordinates.length === 6
            ? -95.567328
            : this.props.coordinates[this.props.coordinates.length - 1].lng * 1,
        ]);
      }
    }
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
    createCoordinates: (coordinates) =>
      dispatch(createCoordinates(coordinates)),
    fetchCoordinates: () => dispatch(fetchCoordinates()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapParent);
