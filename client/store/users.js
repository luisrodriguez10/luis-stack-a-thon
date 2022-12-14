import axios from 'axios'

const TOKEN = 'token'

const users = (state = [], action) =>{
    if(action.type === 'SET_USERS'){
        state = action.users
    }
    if(action.type === 'UPDATE_USER'){
        state = [...state, action.user]
    }
    return state;
}

export const fetchUsers = () =>{
    return async(dispatch) =>{
        const response = await axios.get('/api/users');
        dispatch({type: 'SET_USERS', users: response.data});
    }
}

export default users;