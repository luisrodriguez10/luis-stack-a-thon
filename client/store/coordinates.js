import axios from 'axios'

const TOKEN = 'token'

const coordinates = (state = [], action) =>{
    if(action.type === 'SET_COORDINATE'){
        return state
    }
    if(action.type === 'CREATE_COORDINATE'){
        return [...state, action.coordinate]
    }
    return state;
}

export const fetchCoordinates = () =>{
    return async(dispatch) =>{
        const action_back = {type: 'SET_COORDINATE'}
        window.socket.send(JSON.stringify(action_back));
        dispatch(action_back)
    }
}

export const createCoordinates = (coordinates) =>{
    const coordinate = {lat: coordinates.lat, lng: coordinates.lng}
    return async(dispatch) =>{
        const action = {type: 'CREATE_COORDINATE', coordinate: coordinate};
        window.socket.send(JSON.stringify(action));
        dispatch(action);
        
    }
}

export default coordinates;