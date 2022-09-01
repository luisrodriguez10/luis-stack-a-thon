import axios from 'axios'

const TOKEN = 'token'

const buses = (state = [], action) =>{
    if(action.type === 'SET_BUSES'){
        state = action.buses
    }
    return state;
}

export const fetchBuses = () =>{
    return async(dispatch) =>{
        const response = await axios.get('/api/buses');
        dispatch({type: 'SET_BUSES', buses: response.data});
    }
}

export default buses;