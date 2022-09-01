import axios from 'axios'

const TOKEN = 'token'

const students = (state = [], action) =>{
    if(action.type === 'SET_STUDENTS'){
        state = action.students
    }
    if(action.type === 'UPDATE_STUDENT'){
        state = state.map(student => student.id !== action.student.id ? student : action.student)
    }
    return state;
}

export const fetchStudents = () =>{
    return async(dispatch) =>{
        const response = await axios.get('/api/students');
        dispatch({type: 'SET_STUDENTS', students: response.data});
    }
}

export const updateStudent = (student) =>{
    return async(dispatch) =>{
        const response = await axios.put(`/api/students/${student.id}`, student);
        dispatch({type: 'UPDATE_STUDENT', student: response.data});
    }
}

export default students;