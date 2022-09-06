import axios from 'axios'

const TOKEN = 'token'

const states = (state = [], action) =>{
    if(action.type === 'SET_STATES'){
        state = action.states
    }
    return state;
}

export const fetchStates = () =>{
    return async(dispatch) =>{
        const response = await axios.get('/api/states');
        dispatch({type: 'SET_STATES', states: response.data});
    }
}

export default states;