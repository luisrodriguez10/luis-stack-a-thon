import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Account extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      error: "",
    };
  }

  render() {
    const { auth } = this.props;
    return (
      <main
        id="user-info-page"
        style={{
          padding: "2rem",
          margin: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: 'solid 1px black',
          borderRadius: '20px'
        }}
      >
        <h2> PERSONAL INFORMATION</h2>
        <div
          style={{
            padding: "1rem",
            margin: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h4>Name</h4>
          <p style={{fontSize: '18px'}}>
            {auth.firstName} {auth.lastName}
          </p>
          <br />
          <h4>Email</h4>
          <p style={{fontSize: '18px'}}>{auth.email}</p>
          <br />
          <h4>Address</h4>
          <p style={{fontSize: '18px'}}>
            {auth.address} {auth.city} {auth.state} {auth.zipCode}
          </p>
          <br />
        </div><button className="btn btn-dark mb-4"><Link to='/editUser'>EDIT INFORMATION</Link></button>
        
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Account);
