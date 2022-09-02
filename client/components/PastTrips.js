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

    if (auth.roleId === 2) {
      parentStudents = students.filter((student) => student.userId === auth.id);
    }

    const dateChanged =
                    date.slice(5, 7) +
                    "/" +
                    date.slice(8, 10) +
                    "/" +
                    date.slice(0, 4);
                  const selectedDate = new Date(dateChanged);

                  const selectedDateFormat = `${
                    selectedDate.getMonth() + 1
                  }/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;

    return (
      <div>
        <div id="welcome-message">
          <h2>
            Welcome, {auth.firstName} {auth.lastName}
          </h2>
          <h2>Role: {auth.roleId === 1 ? "Driver" : "Parent"}</h2>
        </div>
        <div>
          <main>
            <section>
              <form>
                <label htmlFor="date">Select a Date</label>
                <input
                  type="date"
                  value={date}
                  name="date"
                  onChange={(ev) => this.setState({ date: ev.target.value })}
                />
              </form>
            </section>
            <section>
              <h3>School Route</h3>
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
                  return (
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
                  );
                })}
              </div>
            </section>

            <section>
              <h3>Home Route</h3>
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
                  return (
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
