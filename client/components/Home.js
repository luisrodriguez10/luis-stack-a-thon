import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBuses, fetchStatus, fetchStudents, updateStudent } from "../store";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      busId: 0,
    };
  }

  componentDidMount() {
    this.props.fetchBuses();
    this.props.fetchStudents();
    this.props.fetchStatus();
  }

  render() {
    const { busId } = this.state;
    const { auth, buses, students, status, updateStudent } = this.props;
    let driverBuses;
    let studentsBus;
    if (auth.roleId === 1) {
      driverBuses = buses.filter((bus) => bus.userId === auth.id);
    }

    if (busId > 0) {
      studentsBus =
        students.filter((student) => student.busId === busId * 1) || [];
    }

    return (
      <div id="home-page">
        <div id="welcome-message">
          <h2>
            Welcome, {auth.firstName} {auth.lastName}
          </h2>
          <h2>
            Role: {auth.roleId === 1 ? 'Driver' : 'Parent'}
          </h2>
        </div>
        
        
        {auth.roleId === 1 ? (
          <div id="home-driver">
            <select
              name="busId"
              value={busId}
              onChange={(ev) => this.setState({ busId: ev.target.value })}
            >
              <option value="">Select Bus</option>
              {driverBuses.map((bus) => {
                return (
                  <option key={bus.id} value={bus.id}>
                    {bus.number}
                  </option>
                );
              })}
            </select>
            {studentsBus ? (
              <table>
                <tbody>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Grade</th>
                    <th>Status</th>
                    <th>Change Status</th>
                  </tr>
                  {studentsBus.map((student) => {
                    const studentStatus = status.find(stat => stat.id === student.studentBusStatusId);
                    return (
                      <tr key={student.id}>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.grade}</td>
                        <td>{studentStatus.status}</td>
                        <td>
                          <select defaultValue={student.studentBusStatusId} onChange={ev => updateStudent(student, ev.target.value)}>
                            <option value=''>-- Select a status --</option>
                            {
                              status.map(stat => {
                                return (
                                  <option key={stat.id} value={stat.id}>{stat.status}</option>
                                )
                              })
                            }
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : null}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
    buses: state.buses,
    students: state.students,
    status: state.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBuses: () => dispatch(fetchBuses()),
    fetchStudents: () => dispatch(fetchStudents()),
    fetchStatus: () => dispatch(fetchStatus()),
    updateStudent: (student, status) => {
      student = {...student, studentBusStatusId: status * 1}
      dispatch(updateStudent(student))
    }
  };
};

export default connect(mapState, mapDispatchToProps)(Home);
