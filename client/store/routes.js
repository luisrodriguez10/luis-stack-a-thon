import axios from 'axios'

const TOKEN = 'token'

const routes = (state = [], action) =>{
    if(action.type === 'SET_ROUTES'){
        state = action.routes
    }
    return state;
}

export const fetchRoutes = () =>{
    return async(dispatch) =>{
        const response = await axios.get('/api/routes');
        dispatch({type: 'SET_ROUTES', routes: response.data});
    }
}

export default routes;