import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
      <form onSubmit={handleSubmit} name={name} id="login-form">
        <div className='username-block'>
          <label htmlFor="username">Username</label>
          <input name="username" type="text" />
        </div>
        <div className='password-block'>
          <label htmlFor="password">Password</label>
          <input name="password" type="password" />
        </div>
        {name === "signup" ? (<div className='firstName-block'>
          <label htmlFor="firstName">First Name</label>
          <input name="firstName" type="text" />
        </div> ) : null}
        {name === "signup" ? (
          <div className='email-block'>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
        ) : null}
        { name === 'signup' ? <div className='role-block'>
          <select name="role">
            <option value={0}>-- Select a Role --</option>
            <option value={1}>Driver</option>
            {/* <option value={2}>Parent</option> */}
          </select>
        </div> : null}
        <div className='button-block'>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = (dispatch, {history}) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      const role = formName === "signup" ? evt.target.role.value : null;
      const firstName = formName === "signup" ? evt.target.firstName.value : null;
      const email = formName === "signup" ? evt.target.email.value : null;
      dispatch(authenticate(username, password, formName, role, firstName, email, history))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
