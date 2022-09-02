import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchBuses,
  fetchStatuses,
  fetchStudents,
  fetchUsers,
  fetchStudentsStatuses,
  fetchRoutes,
} from "../store";

class Tracking extends Component {
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
        <div id="home-parent">
          <main id="home-parent-main">
            <section className="route-school">
              <h3>School Route</h3>
              <div>
                {parentStudents.map((student) => {
                  //Similar to the driver, get the studentStatuses by date
                  const today = new Date();
                  const todaysDate = `${
                    today.getMonth() + 1
                  }/${today.getDate()}/${today.getFullYear()}`;
                  const studentStatus =
                    studentsStatuses.filter(
                      (stdStat) => {
                        const stdStatDate = new Date(stdStat.date);
                        const formatStdStatDate = `${
                            stdStatDate.getMonth() + 1
                        }/${stdStatDate.getDate()}/${stdStatDate.getFullYear()}`;
                          return stdStat.studentId === student.id && stdStat.routeId === 1 && todaysDate === formatStdStatDate
                        }
                    ) || [];
                  const bus =
                    buses.find((bus) => bus.id === student.busId) || {};
                  const driver =
                    users.find((user) => user.id === bus.userId) || {};

                  return studentStatus.length > 0 ? (
                    <table key={student.id}>
                      <tbody>
                        <tr>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Status</th>
                          <th>Bus #</th>
                          <th>Driver</th>
                        </tr>
                        {studentStatus.map((stdStat) => {
                          const stdStatDate = new Date(stdStat.date);
                          const status =
                            statuses.find(
                              (status) => status.id === stdStat.statusId
                            ) || {};
                          return (
                            <tr key={stdStat.id}>
                              <td>{`${
                                stdStatDate.getMonth() + 1
                              }/${stdStatDate.getDate()}/${stdStatDate.getFullYear()}`}</td>
                              <td>{stdStat.time}</td>
                              <td>{status.status}</td>
                              <td>{bus.number}</td>
                              <td>
                                {driver.firstName} {driver.lastName}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    "No Events"
                  );
                })}
              </div>
            </section>
            <section className="route-home">
                <h3>Home Route</h3>
                <div>
                {parentStudents.map((student) => {
                  //Similar to the driver, get the studentStatuses by date
                  const today = new Date();
                  const todaysDate = `${
                    today.getMonth() + 1
                  }/${today.getDate()}/${today.getFullYear()}`;
                  const studentStatus =
                    studentsStatuses.filter(
                      (stdStat) => {
                        const stdStatDate = new Date(stdStat.date);
                        const formatStdStatDate = `${
                            stdStatDate.getMonth() + 1
                        }/${stdStatDate.getDate()}/${stdStatDate.getFullYear()}`;
                         return stdStat.studentId === student.id && stdStat.routeId === 2 && todaysDate === formatStdStatDate
                        }
                    ) || [];
                  const bus =
                    buses.find((bus) => bus.id === student.busId) || {};
                  const driver =
                    users.find((user) => user.id === bus.userId) || {};

                  return studentStatus.length > 0 ? (
                    <table key={student.id}>
                      <tbody>
                        <tr>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Status</th>
                          <th>Bus #</th>
                          <th>Driver</th>
                        </tr>
                        {studentStatus.map((stdStat) => {
                          const stdStatDate = new Date(stdStat.date);
                          const status =
                            statuses.find(
                              (status) => status.id === stdStat.statusId
                            ) || {};
                          return (
                            <tr key={stdStat.id}>
                              <td>{`${
                                stdStatDate.getMonth() + 1
                              }/${stdStatDate.getDate()}/${stdStatDate.getFullYear()}`}</td>
                              <td>{stdStat.time}</td>
                              <td>{status.status}</td>
                              <td>{bus.number}</td>
                              <td>
                                {driver.firstName} {driver.lastName}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    "No Events"
                  );
                })}
              </div>
              </section>
          </main>
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
    fetchUsers: () => dispatch(fetchUsers()),
    fetchStudentsStatuses: () => dispatch(fetchStudentsStatuses()),
  };
};

export default connect(mapState, mapDispatchToProps)(Tracking);
