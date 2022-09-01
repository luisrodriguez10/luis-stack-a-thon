import axios from 'axios'

const TOKEN = 'token'

const status = (state = [], action) =>{
    if(action.type === 'SET_STATUS'){
        state = action.status
    }
    return state;
}

export const fetchStatus = () =>{
    return async(dispatch) =>{
        const response = await axios.get('/api/studentStatus');
        dispatch({type: 'SET_STATUS', status: response.data});
    }
}

export default status;