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
      <div id="home-page">
        <div id="welcome-message">
          <h2>
            Welcome, {auth.firstName} {auth.lastName}
          </h2>
          <h2>Role: {auth.roleId === 1 ? "Driver" : "Parent"}</h2>
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
                    //FIND LOGIC TO GET stdStatuses by date: add a && to the end of the condition that says stStatus.date === today's date
                    const stdStatuses =
                      studentsStatuses.length > 0
                        ? studentsStatuses.filter(
                            (stStatus) => stStatus.studentId === student.id
                          )
                        : null;
                    const studentCurrStatus =
                      stdStatuses.length > 1
                        ? stdStatuses.sort(function (x, y) {
                            return y.time - x.time;
                          })[
                            stdStatuses.sort(function (x, y) {
                              return y.time - x.time;
                            }).length - 1
                          ]
                        : stdStatuses[0];
                    const currStatus = studentCurrStatus
                      ? statuses.find(
                          (status) => status.id === studentCurrStatus.statusId
                        )
                      : {};
                    //create api route to get students status (by id?)
                    //create thunk and fetchstudentstatus from component did mount
                    //filter all records de students status table that belong to the student.
                    //if array is empty show select pointing to not picked up, otherwise
                    //show select pointing to the default value of the last records of the statusId
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
                              createStudentStatus(student, ev.target.value)
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
        ) : (
          <div id="home-parent">
            <main id="home-parent-main">
              <section className="route-school">
                <h3>Route To School</h3>
                <div>
                  {parentStudents.map((student) => {
                    //Similar to the driver, get the studentStatuses by date
                    const studentStatus =
                      studentsStatuses.filter(
                        (stdStat) => stdStat.studentId === student.id
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
              {/* <section>
                <h3>Route To Bus Stop</h3>
              </section> */}
            </main>
          </div>
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
