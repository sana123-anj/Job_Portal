import {
    CREATE_JOB_TYPE_FAIL,
    CREATE_JOB_TYPE_REQUEST,
    CREATE_JOB_TYPE_RESET,
    CREATE_JOB_TYPE_SUCCESS,
    JOB_TYPE_LOAD_FAIL,
    JOB_TYPE_LOAD_REQUEST,
    JOB_TYPE_LOAD_RESET,
    JOB_TYPE_LOAD_SUCCESS}
    from "../constants/jobttypeconstant"

    
export const loadJobTypeReducer = (state = { jobTypes: [] }, action) => {
    switch (action.type) {
        case JOB_TYPE_LOAD_REQUEST:
            return { loading: true }
        case JOB_TYPE_LOAD_SUCCESS:
            return {
                loading: false,
                jobType: action.payload.jobt
            }
        case JOB_TYPE_LOAD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case JOB_TYPE_LOAD_RESET:
            return {}
        default:
            return state;
    }
}
// create job type reducer
export const createJobTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_JOB_TYPE_REQUEST:
            return { loading: true }
        case CREATE_JOB_TYPE_SUCCESS:
            return {
                loading: false,
                jobType: action.payload,
            }
        case CREATE_JOB_TYPE_FAIL:
            return { loading: false, error: action.payload }
        case CREATE_JOB_TYPE_RESET:
            return {}
        default:
            return state;
    }

}