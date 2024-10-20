import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // This import should be correct
import { composeWithDevTools } from '@redux-devtools/extension';
import {
    deleteJobReducer,
    loadJobReducer,
    loadJobSingleReducer,
    registerAjobReducer,
    updateJobReducer
} from './reducer/jobreducer';

import {
    createJobTypeReducer,
    loadJobTypeReducer,
    jobTypeReducer
} from './reducer/jobtypereducer';

import {
    allUserReducer,
    userApplyJobReducer,
    userReducerLogout,
    userReducerSignIn,
    userReducerSignUp,
    userProfileReducer 
} from './reducer/userReducer';

import adminStatsReducer from './reducer/adminreducer';

// Combine reducers
const reducer = combineReducers({   
    loadJobs: loadJobReducer,
    jobTypeAll: loadJobTypeReducer,
    signIn: userReducerSignIn,
    logOut: userReducerLogout,
    userProfile: userProfileReducer,
    singleJob: loadJobSingleReducer,
    userJobApplication: userApplyJobReducer,
    allUsers: allUserReducer,
    signUp: userReducerSignUp,
    registerJob: registerAjobReducer,
    deleteJob: deleteJobReducer,
    createJobType: createJobTypeReducer,
    updateJob: updateJobReducer,
    adminStats: adminStatsReducer
});

// Initial state
let initialState = {
    signIn: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    }
};

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
