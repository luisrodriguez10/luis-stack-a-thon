import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStates, editUser } from "../store";

class EditUser extends Component {
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
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount(){
    this.props.fetchStates();
    this.setState({
        firstName: this.props.auth.firstName,
        lastName: this.props.auth.lastName,
        email: this.props.auth.email,
        address: this.props.auth.address,
        city: this.props.auth.city,
        state: this.props.auth.state,
        zipCode: this.props.auth.zipCode,
      });
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  async save(ev) {
    ev.preventDefault();
    const user = {
      id: this.props.auth.id,
      firstName: this.state.firstName.trim(),
      lastName: this.state.lastName.trim(),
      email: this.state.email,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode,
    };

    try {
      if (
        !/^[a-zA-Z ]*$/g.test(user.firstName) ||
        !/^[a-zA-Z ]*$/g.test(user.lastName)
      ) {
        throw 'First Name and Last Name must be alphabet characters';
      } else {
        await this.props.editUser(user);
      }
    } catch (error) {
      if (typeof error === 'string') {
        this.setState({ error: error });
      } else {
        this.setState({ error: error.response.data.err.errors[0].message });
      }
    }
  }

  render() {
      const { states, history } = this.props;
      const { firstName, lastName, email, address, error, zipCode, state, city } =
      this.state;
      const { onChange, save } = this;
      console.log(states);
    return (
        <main id="" className="container mt-4" style={{ minHeight: '75vh' }}>
        <div id="">
          <div id="" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2 style={{padding: '2rem', margin: "2rem", textAlign: 'center'}}>Edit Information</h2>

            <form className="row g-3 w-50 mt-4" onSubmit={save} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

              <div className="" style={{}}>
                <label
                  style={{}}
                  htmlFor="firstName"
                  className="form-label small"
                >
                  First Name
                </label>
                <input
                  placeholder="First Name"
                  value={firstName}
                  name="firstName"
                  onChange={onChange}
                  className="form-control"
                  style={{}}
                ></input>
              </div>
              <div>
                <label
                  style={{}}
                  htmlFor="lastName"
                  className="form-label small"
                >
                  Last Name
                </label>
                <input
                  placeholder="Last Name"
                  value={lastName}
                  name="lastName"
                  onChange={onChange}
                  className="form-control"
                  style={{}}
                ></input>
              </div>
              <div className="" style={{}}>
                <label style={{}} htmlFor="email" className="form-label small">
                  Email
                </label>
                <input
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={onChange}
                  className="form-control"
                ></input>
              </div>
              <div className="" style={{}}>
                <label
                  style={{}}
                  htmlFor="address"
                  className="form-label small"
                >
                  Address
                </label>
                <input
                  placeholder="Address"
                  value={address}
                  name="address"
                  onChange={onChange}
                  className="form-control"
                ></input>
              </div>
              <div className="d-flex">
                <div className="" style={{}}>
                  <label style={{}} htmlFor="city" className="form-label small">
                    City
                  </label>
                  <input
                    placeholder="City"
                    value={city}
                    name="city"
                    onChange={onChange}
                    className="form-control"
                  ></input>
                </div>
                <div className="mx-4" style={{}}>
                  <label
                    style={{}}
                    htmlFor="state"
                    className="form-label small"
                  >
                    State
                  </label>
                  <select
                    name="state"
                    value={state}
                    onChange={onChange}
                    className="form-select"
                  >
                    <option value="">-- Select a State --</option>
                    {states.map((state) => {
                      return (
                        <option key={state.id} value={state.name}>
                          {state.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="" style={{}}>
                  <label
                    style={{}}
                    htmlFor="zipCode"
                    className="form-label small"
                  >
                    Zip Code
                  </label>
                  <input
                    placeholder="Zip Code"
                    value={zipCode}
                    name="zipCode"
                    onChange={onChange}
                    className="form-control"
                  ></input>
                </div>
              </div>
              <div style={{}}>
                <button
                  disabled={!firstName || !lastName || !email || !address}
                  className="btn btn-dark mb-4"
                >
                  SAVE CHANGES
                </button>
                <br />
                <button
                  onClick={() => history.push('/account')}
                  className="btn btn-light border-dark"
                >
                  CANCEL
                </button>
              </div>

              <pre>{error ? JSON.stringify(error) : null}</pre>
            </form>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) =>{
    return {
        auth: state.auth,
        states: state.states
    }
}

const mapDispatchToProps = (dispatch, { history }) =>{
    return {
        fetchStates: () =>  dispatch(fetchStates()),
        editUser: (user) => {
            dispatch(editUser(user, history))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
