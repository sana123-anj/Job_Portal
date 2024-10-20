import axios from 'axios';
import { toast } from 'react-toastify';
import {
    CREATE_JOB_TYPE_FAIL,
    CREATE_JOB_TYPE_REQUEST,
    CREATE_JOB_TYPE_SUCCESS,
    JOB_TYPE_LOAD_FAIL,
    JOB_TYPE_LOAD_REQUEST,
    JOB_TYPE_LOAD_SUCCESS,
    JOB_TYPE_delete_REQUEST,
    JOB_TYPE_delete_SUCCESS,
    JOB_TYPE_delete_FAIL
} from '../constants/jobttypeconstant';



export const deletejobtypeaction=()=>async (dispatch)=>{
    dispatch({type:JOB_TYPE_delete_REQUEST});
    try {
        const { data} = await axios.delete(`/api/type/delete/${delete_id}`);
        dispatch({
            type:JOB_TYPE_delete_SUCCESS,
            payload:data
        });
    } catch (error) {
        dispatch({
            type:JOB_TYPE_delete_FAIL,
            payload: error.response.data.error
        })
        
    }
};
export const jobTypeLoadAction = () => async (dispatch) => {
    dispatch({ type: JOB_TYPE_LOAD_REQUEST });
    try {
        const { data } = await axios.get('/api/type/jobs');
        console.log("API Response: ", data); // Log the response data
        dispatch({
            type: JOB_TYPE_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        console.error("Error loading job types: ", error); // Log the error
        dispatch({
            type: JOB_TYPE_LOAD_FAIL,
            payload: error.response ? error.response.data.error : error.message
        });
    }
};

// create jobs category
export const createJobTypeAction = (jobTypeData) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:3000/api/type/create', jobTypeData);
        dispatch({ type: 'CREATE_JOB_TYPE_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'CREATE_JOB_TYPE_FAIL', payload: error.response.data });
        console.error("Error creating job type:", error.response.data); // Log any errors
    }
};