import axios from 'axios'

const TOKEN = 'token'

const statuses = (state = [], action) =>{
    if(action.type === 'SET_STATUSES'){
        state = action.statuses
    }
    return state;
}

export const fetchStatuses = () =>{
    return async(dispatch) =>{
        const response = await axios.get('/api/statuses');
        dispatch({type: 'SET_STATUSES', statuses: response.data});
    }
}

export default statuses;