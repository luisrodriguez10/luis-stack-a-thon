import React, { Component } from "react";
import { connect } from "react-redux";
import L from "leaflet";
import "leaflet-routing-machine";
import { createCoordinates, fetchCoordinates } from '../store';


class Map extends Component {
  constructor(){
    super();
  }
  componentDidMount() {
    
    this.props.fetchCoordinates();
    var map = L.map("map").setView([29.690630, -95.559930], 15);
    
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

    // MARKER
    var marker = L.marker([29.690630, -95.559930], { icon: busIcon }).addTo(
      map
    );
    // map click event
    map.on("click",  (e) => {
      L.marker([e.latlng.lat, e.latlng.lng], {
        icon: schoolIcon,
      }).addTo(map);
      L.Routing.control({
        waypoints: [
          L.latLng(29.690630, -95.559930),
          L.latLng(e.latlng.lat, e.latlng.lng),
        ],
      })
        .on("routesfound", (ev) => {
          marker.once("click",  () => {
            ev.routes[0].coordinates.forEach(async (coord, index)  => {
              await this.props.createCoordinates(coord);
              await this.props.fetchCoordinates();
              
              setTimeout(() => {
                if(this.props.coordinates.length > 0){
                  marker.on('click', () => {
                    this.props.coordinates.map(crd => {
                      marker.setLatLng([crd.lat, crd.lng])
                    })
                  })
                }else{
                  marker.on("click", function () {
                    marker.setLatLng([coord.lat, coord.lng]);
                  });
                }
                
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

const mapStateToProps = (state) =>{
  return {
    auth: state.auth,
    coordinates: state.coordinates
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    createCoordinates: (coordinates) => dispatch(createCoordinates(coordinates)),
    fetchCoordinates: () => dispatch(fetchCoordinates())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
