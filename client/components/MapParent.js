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
      var map = L.map("map").setView([29.69063, -95.55993], 15);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution: "OSM",
      }).addTo(map);

      var busIcon = L.icon({
        iconUrl: "../public/bus.png",
        iconSize: [60, 60],
      });
      var schoolIcon = L.icon({
        iconUrl: "../public/school.png",
        iconSize: [40, 40],
      });

      var marker = L.marker([29.69063, -95.55993], { icon: busIcon }).addTo(
        map
      );

      L.marker(
        [this.props.coordinates[0].lat * 1, this.props.coordinates[0].lng * 1],
        {
          icon: schoolIcon,
        }
      ).addTo(map);

      L.Routing.control({
        waypoints: [
          L.latLng(29.69063, -95.55993),
          L.latLng(
            this.props.coordinates[this.props.coordinates.length - 1].lat * 1,
            this.props.coordinates[this.props.coordinates.length - 1].lng * 1
          ),
        ],
      }).addTo(map);

      if (this.props.coordinates.length > 1) {
        marker.setLatLng([
          this.props.coordinates[this.props.coordinates.length - 1].lat * 1,
          this.props.coordinates[this.props.coordinates.length - 1].lng * 1,
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
