import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchBuses,
  fetchStatuses,
  fetchStudents,
  createStudentStatus,
  fetchUsers,
  fetchStudentsStatuses,
} from "../store";

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
    this.props.fetchStatuses();
    this.props.fetchUsers();
    this.props.fetchStudentsStatuses();
  }

  render() {
    const { busId } = this.state;
    const {
      auth,
      buses,
      students,
      statuses,
      createStudentStatus,
      users,
      studentsStatuses,
    } = this.props;

    let driverBuses;
    let studentsBus;
    let parentStudents;
    if (auth.roleId === 1) {
      driverBuses = buses.filter((bus) => bus.userId === auth.id);
    }

    if (busId > 0) {
      studentsBus =
        students.filter((student) => student.busId === busId * 1) || [];
    }

    if (auth.roleId === 2) {
      parentStudents = students.filter((student) => student.userId === auth.id);
    }

    return (
      <div id="home-entire-page">
        <div>
          <div id="home-message">
            <h1 style={{ fontFamily: "system-ui" }}>PARENT ASSURANCE</h1>
            <img id="home-logo" src="../public/home-logo.png"></img>
          </div>
          <div id="parent-message" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <p style={{
              listStyle: 'none',
              outline: 'none',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              fontSize: '25px',
              fontFamily: 'system-ui'
            }}>
              Parent Assurance is an application developed to allow parents to
              monitor and track their child since the moment they get on the
              buss until they arrive at school and the same on their way back home.
              <br />
              <br />
              The parent will be able to:
            </p>
            <ul style={{
              outline: 'none',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: '25px',
              fontFamily: 'system-ui'
            }}>
              <li>
                Know the time their child get on or off the bus, what bus and
                the bus driver.
              </li>
              <li>Track the bus while it is on route.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
    buses: state.buses,
    students: state.students,
    statuses: state.statuses,
    users: state.users,
    studentsStatuses: state.studentsStatuses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBuses: () => dispatch(fetchBuses()),
    fetchStudents: () => dispatch(fetchStudents()),
    fetchStatuses: () => dispatch(fetchStatuses()),
    createStudentStatus: (student, status) => {
      const today = new Date();
      const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      const date = `${
        today.getMonth() + 1
      }/${today.getDate()}/${today.getFullYear()}`;
      const studentStatus = {
        date: date,
        time: time,
        studentId: student.id,
        statusId: status * 1,
      };
      dispatch(createStudentStatus(studentStatus));
    },
    fetchUsers: () => dispatch(fetchUsers()),
    fetchStudentsStatuses: () => dispatch(fetchStudentsStatuses()),
  };
};

export default connect(mapState, mapDispatchToProps)(Home);
