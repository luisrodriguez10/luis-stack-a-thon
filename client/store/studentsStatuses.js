import axios from 'axios'

const TOKEN = 'token'

const studentsStatuses = (state = [], action) =>{
    if(action.type === 'SET_STUDENTS_STATUSES'){
        state = action.studentsStatuses
    }
    if(action.type === 'CREATE_STUDENT_STATUS'){
        return [...state, action.studentStatus]
    }
    return state;
}

export const fetchStudentsStatuses = () =>{
    return async(dispatch) =>{
        const response = await axios.get('/api/studentsStatuses');
        dispatch({type: 'SET_STUDENTS_STATUSES', studentsStatuses: response.data});
    }
}

export const createStudentStatus = (studentStatus) =>{
    return async(dispatch) =>{
        const response = await axios.post('/api/studentsStatuses', studentStatus);
        dispatch({type: 'CREATE_STUDENT_STATUS', studentStatus: response.data});
    }
}

export default studentsStatuses;