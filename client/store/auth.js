import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }
}

export const editUser = (user, history) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/users/${user.id}`, user, {
      headers: {
        authorization: window.localStorage.getItem("token"),
      },
    });
    dispatch({ type: "SET_AUTH", auth: response.data });
    history.push("/account");
  };
};

export const authenticate = (username, password, method, roleId, firstName, email, history) => async dispatch => {
  try {
    const res = method === 'login' ? await axios.post(`/auth/${method}`, {username, password}) : await axios.post(`/auth/${method}`, {id: Math.floor(Math.random() * (10000000 - 50) + 50), username, password, roleId, firstName, email})
    
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
    history.push('/')
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
}
