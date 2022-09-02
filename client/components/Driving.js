import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchBuses,
  fetchStatuses,
  fetchStudents,
  createStudentStatus,
  fetchUsers,
  fetchStudentsStatuses,
  fetchRoutes,
} from "../store";

class Driving extends Component {
  constructor() {
    super();
    this.state = {
      busId: 0,
      routeId: 0,
    };
  }

  componentDidMount() {
    this.props.fetchBuses();
    this.props.fetchRoutes();
    this.props.fetchStudents();
    this.props.fetchStatuses();
    this.props.fetchUsers();
    this.props.fetchStudentsStatuses();
  }

  render() {
    const { busId, routeId } = this.state;
    const {
      auth,
      buses,
      students,
      statuses,
      createStudentStatus,
      users,
      studentsStatuses,
      routes,
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
      <div id="home-page">
        <div id="welcome-message">
          <h2>
            Welcome, {auth.firstName} {auth.lastName}
          </h2>
          <h2>Role: {auth.roleId === 1 ? "Driver" : "Parent"}</h2>
        </div>
        <div id="home-driver">
          <select
            name="routeId"
            value={routeId}
            onChange={(ev) =>
              this.setState({ routeId: ev.target.value, busId: "" })
            }
          >
            <option value="">Select Route</option>
            {routes.map((route) => {
              return (
                <option key={route.id} value={route.id}>
                  {route.name}
                </option>
              );
            })}
          </select>
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
                  //FIND LOGIC TO GET stdStatuses by date: add a && to the end of the condition that says stStatus.date === today's date
                  const today = new Date();
                  const todaysDate = `${
                    today.getMonth() + 1
                  }/${today.getDate()}/${today.getFullYear()}`;
                  const stdStatuses =
                    studentsStatuses.length > 0
                      ? studentsStatuses.filter((stStatus) => {
                          const stdStatDate = new Date(stStatus.date);
                          const formatStdStatDate = `${
                            stdStatDate.getMonth() + 1
                          }/${stdStatDate.getDate()}/${stdStatDate.getFullYear()}`;
                          return (
                            stStatus.studentId === student.id &&
                            stStatus.routeId === routeId * 1 &&
                            todaysDate === formatStdStatDate
                          );
                        })
                      : null;
                        console.log(stdStatuses)
                  const studentCurrStatus =
                    stdStatuses.length > 1
                      ? stdStatuses.sort(function (x, y) {
                          return x.time.slice(0, 2) - y.time.slice(0, 2);
                        })[
                          stdStatuses.sort(function (x, y) {
                            return x.time.slice(0, 2) - y.time.slice(0, 2);
                          }).length - 1
                        ]
                      : stdStatuses[0];
                  const currStatus = studentCurrStatus
                    ? statuses.find(
                        (status) => status.id === studentCurrStatus.statusId
                      )
                    : {};
                  return (
                    <tr key={student.id}>
                      <td>{student.firstName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.grade}</td>
                      <td>
                        {!Object.keys(currStatus).length
                          ? "No Status"
                          : currStatus.status}
                      </td>
                      <td>
                        <select
                          defaultValue={currStatus.id}
                          onChange={(ev) =>
                            createStudentStatus(
                              student,
                              ev.target.value,
                              routeId
                            )
                          }
                        >
                          <option value="">-- Select a status --</option>
                          {statuses.map((stat) => {
                            return (
                              <option key={stat.id} value={stat.id}>
                                {stat.status}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : null}
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
    routes: state.routes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBuses: () => dispatch(fetchBuses()),
    fetchRoutes: () => dispatch(fetchRoutes()),
    fetchStudents: () => dispatch(fetchStudents()),
    fetchStatuses: () => dispatch(fetchStatuses()),
    createStudentStatus: (student, status, routeId) => {
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
        routeId: routeId * 1,
      };
      dispatch(createStudentStatus(studentStatus));
    },
    fetchUsers: () => dispatch(fetchUsers()),
    fetchStudentsStatuses: () => dispatch(fetchStudentsStatuses()),
  };
};

export default connect(mapState, mapDispatchToProps)(Driving);
