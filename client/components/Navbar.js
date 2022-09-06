import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, auth, history }) => {

  const pathName = history.location.pathname;

  return (
    <nav>
      <h1><Link to='/' className={pathName === "/" ? "selected" : ""}>PARENT ASSURANCE <img id="logo" src="../public/logo.png"></img></Link></h1>
      {isLoggedIn && auth.roleId === 1 ? (
        <div id="nav-driver">
          <Link to='/driving' className={pathName === "/driving" ? "selected" : ""}>DRIVING</Link>
          <Link to="/account" className={pathName === "/account" ? "selected" : ""}>ACCOUNT</Link>
          <Link to="/" onClick={handleClick}>
            LOGOUT
          </Link>
        </div>
      ) : isLoggedIn && auth.roleId === 2 ? (
        <div id="nav-parent">
          <Link to='/tracking' className={pathName === "/tracking" ? "selected" : ""}>TRACKING</Link>
          <Link to="/account" className={pathName === "/account" ? "selected" : ""}>ACCOUNT</Link>
          <Link to="/pastTrips" className={pathName === "/pastTrips" ? "selected" : ""}>PAST TRIPS</Link>
          <Link to="/" onClick={handleClick}>
            LOGOUT
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/login" className={pathName === "/login" ? "selected" : ""}>LOGIN</Link>
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
