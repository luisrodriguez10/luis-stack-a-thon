import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBuses, fetchStatuses, fetchStudents, updateStudent, fetchUsers } from "../store";

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
    this.props.fetchUsers()
  }

  render() {
    const { busId } = this.state;
    const { auth, buses, students, statuses, updateStudent, users } = this.props;

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

    if(auth.roleId === 2){
      parentStudents = students.filter(student => student.userId === auth.id);
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
                    const studentStatus = statuses.find(stat => stat.id === student.statusId);

                    return (
                      <tr key={student.id}>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.grade}</td>
                        <td>{studentStatus.status}</td>
                        <td>
                          <select defaultValue={student.statusId} onChange={ev => updateStudent(student, ev.target.value)}>
                            <option value=''>-- Select a status --</option>
                            {
                              statuses.map(stat => {
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
          <div id="home-parent">
            <main>
              <section>
                <h4>To School</h4>
                {
                  parentStudents.length > 0 ? (
                    <div>
                      {
                        parentStudents.map(student => {
                          const studentStatus = statuses.find(stat => stat.id === student.statusId) || {};
                          const bus = buses.find(bus => bus.id === student.busId) || {};
                          const driver = users.find(user => user.id === bus.userId) || {}

                          return (
                            student.studentBusStatusId !== 1 ?
                          (
                            <table key={student.id}>
                              <tbody>
                                <tr>
                                  <th>Date</th>
                                  <th>Time</th>
                                  <th>Status</th>
                                  <th>Bus #</th>
                                  <th>Driver</th>
                                </tr>
                                <tr>
                                  <td></td>
                                  <td></td>
                                  <td>{studentStatus.status}</td>
                                  <td>{bus.number}</td>
                                  <td>{driver.firstName} {driver.lastName}</td>
                                </tr>
                              </tbody>
                            </table>
                          ): 'No Data entered!!!'
                            
                          )
                        })
                      }
                    </div>
                  ) : null
                }
              </section>
              <section>
                <h4>To Home</h4>
              </section>
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
    users: state.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBuses: () => dispatch(fetchBuses()),
    fetchStudents: () => dispatch(fetchStudents()),
    fetchStatuses: () => dispatch(fetchStatuses()),
    updateStudent: (student, status) => {
      student = {...student, statusId: status * 1}
      dispatch(updateStudent(student))
    },
    fetchUsers: () =>  dispatch(fetchUsers())
  };
};

export default connect(mapState, mapDispatchToProps)(Home);
