import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, auth }) => {
  return (
    <nav>
      <h1>Seacoast High School</h1>
      {isLoggedIn && auth.roleId === 1 ? (
        <div id="nav-driver">
          <Link to="/home">Home</Link>
          <Link to="/account">Account</Link>
          <Link to="/#" onClick={handleClick}>
            Logout
          </Link>
        </div>
      ) : isLoggedIn && auth.roleId === 2 ? (
        <div id="nav-parent">
          <Link to="/home">Home</Link>
          <Link to="/account">Account</Link>
          <Link to="/pastTrips">Past Trips</Link>
          <Link to="/#" onClick={handleClick}>
            Logout
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          {/* <Link to="/signup">Sign Up</Link> */}
        </div>
      )}
    </nav>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
