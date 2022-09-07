import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Driving from './components/Driving';
import Home from './components/Home';
import PastTrips from './components/PastTrips';
import Tracking from './components/Tracking';
import { me } from './store'
import Navbar from './components/Navbar';
import Account from './components/Account';
import EditUser from './components/EditUser';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    const url = window.location.origin.replace('http', 'ws');
    window.socket = new WebSocket(url);
    window.socket.addEventListener('message', (ev) =>{
      const action = JSON.parse(ev.data);
      this.props.dispatchAction(action);
    })
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        <Route component={Navbar}/>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path='/account' component={Account} />
            <Route path='/driving' component={Driving} />
            <Route path='/tracking' component={Tracking} />
            <Route path='/pastTrips' component={PastTrips} />
            <Route path='/editUser' component={EditUser} />
          </Switch>
        ) 
        : (
          <Switch>
            <Route path='/' exact component={ Home } />
            <Route path="/login" component={Login} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    dispatchAction: (action) => dispatch(action),
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
