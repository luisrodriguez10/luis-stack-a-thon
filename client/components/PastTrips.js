import React, { Component } from "react";
import { connect } from "react-redux";
import { TbFilesOff } from "react-icons/tb";
import {
  fetchBuses,
  fetchStatuses,
  fetchStudents,
  fetchUsers,
  fetchStudentsStatuses,
  fetchRoutes,
} from "../store";

class PastTrips extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
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
    const { auth, buses, students, statuses, users, studentsStatuses, routes } =
      this.props;
    const { date } = this.state;
    let parentStudents;
    let selectedDateFormat;

    if (auth.roleId === 2) {
      parentStudents = students.filter((student) => student.userId === auth.id);
    }

    if (date) {
      const dateChanged =
        date.slice(5, 7) + "/" + date.slice(8, 10) + "/" + date.slice(0, 4);
      const selectedDate = new Date(dateChanged);

      selectedDateFormat = `${
        selectedDate.getMonth() + 1
      }/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;
    } else {
      const today = new Date();
      const todaysDate = `${
        today.getMonth() + 1
      }/${today.getDate()}/${today.getFullYear()}`;
      selectedDateFormat = todaysDate;
    }

    return (
      <div id="past-trips-page">
        <div id="welcome-message">
          <h2>
            Welcome, {auth.firstName} {auth.lastName}
          </h2>
          <h2>Role: {auth.roleId === 1 ? "Driver" : "Parent"}</h2>
        </div>
        <div id="past-trips-parent">
          <main id="past-trips-parent-main">
            <section className="date-section">
              <form className="date-selected">
                <label
                  htmlFor="date"
                  style={{ fontWeight: "bold", fontSize: "17px" }}
                >
                  Choose a Date
                </label>
                <input
                  type="date"
                  value={date}
                  name="date"
                  onChange={(ev) => this.setState({ date: ev.target.value })}
                />
              </form>
            </section>
            <section className="past-trips-school">
              <h3 style={{ fontSize: "25px" }}>School Route</h3>
              <div>
                {parentStudents.map((student) => {
                  const studentStatus =
                    studentsStatuses.filter((stdStat) => {
                      const stdStatDate = new Date(stdStat.date);
                      const formatStdStatDate = `${
                        stdStatDate.getMonth() + 1
                      }/${stdStatDate.getDate()}/${stdStatDate.getFullYear()}`;
                      return (
                        stdStat.studentId === student.id &&
                        stdStat.routeId === 1 &&
                        selectedDateFormat === formatStdStatDate
                      );
                    }) || [];
                  const bus =
                    buses.find((bus) => bus.id === student.busId) || {};
                  const driver = users.find((user) => user.id === bus.id) || {};
                  const studentStatusSortedSchoolRoute = studentStatus.sort(function(x,y) {
                    return x.time.slice(0,2) - y.time.slice(0,2)
                  })
                  return studentStatusSortedSchoolRoute.length > 0 ? (
                    <table key={student.id}>
                      <tbody>
                        <tr>
                          <th style={{ padding: "1rem" }}>Date</th>
                          <th style={{ padding: "1rem" }}>Time</th>
                          <th style={{ padding: "1rem" }}>Status</th>
                          <th style={{ padding: "1rem" }}>Bus #</th>
                          <th style={{ padding: "1rem" }}>Driver</th>
                        </tr>
                        {studentStatusSortedSchoolRoute.map((stdStat) => {
                          const stdStatDate = new Date(stdStat.date);
                          const status =
                            statuses.find(
                              (status) => status.id === stdStat.statusId
                            ) || {};
                          return (
                            <tr key={stdStat.id}>
                              <td style={{ padding: "1rem" }}>{`${
                                stdStatDate.getMonth() + 1
                              }/${stdStatDate.getDate()}/${stdStatDate.getFullYear()}`}</td>
                              <td style={{ padding: "1rem" }}>
                                {stdStat.time}
                              </td>
                              <td style={{ padding: "1rem" }}>
                                {status.status}
                              </td>
                              <td style={{ padding: "1rem" }}>{bus.number}</td>
                              <td style={{ padding: "1rem" }}>
                                {driver.firstName} {driver.lastName}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <TbFilesOff size={90} />
                      <h3>No Status</h3>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="past-trips-home">
              <h3 style={{ fontSize: "25px" }}>Home Route</h3>
              <div>
                {parentStudents.map((student) => {
                  const studentStatus =
                    studentsStatuses.filter((stdStat) => {
                      const stdStatDate = new Date(stdStat.date);
                      const formatStdStatDate = `${
                        stdStatDate.getMonth() + 1
                      }/${stdStatDate.getDate()}/${stdStatDate.getFullYear()}`;
                      return (
                        stdStat.studentId === student.id &&
                        stdStat.routeId === 2 &&
                        selectedDateFormat === formatStdStatDate
                      );
                    }) || [];
                  const bus =
                    buses.find((bus) => bus.id === student.busId) || {};
                  const driver = users.find((user) => user.id === bus.id) || {};
                  const studentStatusSortedSchoolRoute = studentStatus.sort(function(x,y) {
                    return x.time.slice(0,2) - y.time.slice(0,2)
                  })
                  return studentStatusSortedSchoolRoute.length > 0 ? (
                    <table key={student.id}>
                      <tbody>
                        <tr>
                          <th style={{ padding: "1rem" }}>Date</th>
                          <th style={{ padding: "1rem" }}>Time</th>
                          <th style={{ padding: "1rem" }}>Status</th>
                          <th style={{ padding: "1rem" }}>Bus #</th>
                          <th style={{ padding: "1rem" }}>Driver</th>
                        </tr>
                        {studentStatusSortedSchoolRoute.map((stdStat) => {
                          const stdStatDate = new Date(stdStat.date);
                          const status =
                            statuses.find(
                              (status) => status.id === stdStat.statusId
                            ) || {};
                          return (
                            <tr key={stdStat.id}>
                              <td style={{ padding: "1rem" }}>{`${
                                stdStatDate.getMonth() + 1
                              }/${stdStatDate.getDate()}/${stdStatDate.getFullYear()}`}</td>
                              <td style={{ padding: "1rem" }}>
                                {stdStat.time}
                              </td>
                              <td style={{ padding: "1rem" }}>
                                {status.status}
                              </td>
                              <td style={{ padding: "1rem" }}>{bus.number}</td>
                              <td style={{ padding: "1rem" }}>
                                {driver.firstName} {driver.lastName}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <TbFilesOff size={90} />
                      <h3>No Status</h3>
                    </div>
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

const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(PastTrips);
