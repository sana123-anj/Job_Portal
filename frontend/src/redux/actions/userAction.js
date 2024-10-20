import axios from 'axios';
import { toast } from "react-toastify";
import {
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LOAD_REQUEST,
    USER_LOAD_SUCCESS,
    USER_LOAD_FAIL,
    USER_APPLY_JOB_REQUEST,
    USER_APPLY_JOB_SUCCESS,
    USER_APPLY_JOB_FAIL,
    ALL_USER_LOAD_REQUEST,
    ALL_USER_LOAD_SUCCESS,
    ALL_USER_LOAD_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
} from '../constants/userConstant';

// Action for fetching admin stats
export const fetchAdminStats = () => async (dispatch) => {
    dispatch({ type: 'ADMIN_STATS_REQUEST' });

    try {
        const config = {
            headers: {
                'Cache-Control': 'no-cache',
            },
        };

        const { data } = await axios.get("/api/admin/stats", config); // Change the endpoint as needed
        dispatch({
            type: 'ADMIN_STATS_SUCCESS',
            payload: data
        });
    } catch (error) {
        dispatch({
            type: 'ADMIN_STATS_FAIL',
            payload: error.response?.data?.message || error.message,
        });
    }
};


// User Sign In Action


export const userSignInAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        // Fix the URL typo here
        const { data } = await axios.post("/api/Singin", user,config);

        // Store user data in localStorage
        localStorage.setItem('userInfo', JSON.stringify(data));

        // Dispatch success action
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });

        // Show success toast
        toast.success("Login Successfully!");
    } catch (error) {
        // Handle error properly
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message,
        });

        // Show error toast
        toast.error(
            error.response && error.response.data.error
                ? error.response.data.error
                : error.message
        );
    }
};
// User Sign Up Action
export const userSignUpAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST });

    try {
        const { data } = await axios.post("/api/Singup", user); // Ensure this endpoint is correct

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success("Register Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response?.data?.error || "An error occurred"
        });
        toast.error(error.response?.data?.error || "An error occurred");
    }
};

// User Logout Action
export const userLogoutAction = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });

    try {
        const { data } = await axios.get("/api/Logout"); // Ensure this endpoint is correct
        localStorage.removeItem('userInfo');

        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Log out successfully!");
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response?.data?.error || "An error occurred"
        });
        toast.error(error.response?.data?.error || "An error occurred");
    }
};

// Load User Profile Action
export const userProfileAction = () => async (dispatch) => {
    dispatch({ type: USER_LOAD_REQUEST });

    try {
        const { data } = await axios.get("/api/me", {
            headers: { 'Cache-Control': 'no-cache' },
        });

        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response?.data?.error || "An error occurred"
        });
    }
};

// Action to load all users
export const allUserAction = () => async (dispatch) => {
    dispatch({ type: ALL_USER_LOAD_REQUEST });

    try {
        const { data } = await axios.get('/api/alluser', {
            headers: { 'Cache-Control': 'no-cache' },
        });

        dispatch({
            type: ALL_USER_LOAD_SUCCESS,
            payload: data // Assuming 'data' is the array of users
        });
    } catch (error) {
        dispatch({
            type: ALL_USER_LOAD_FAIL,
            payload: error.response?.data?.error || "An error occurred"
        });
    }
};

// User Job Apply Action
export const userApplyJobAction = (job) => async (dispatch) => {
    dispatch({ type: USER_APPLY_JOB_REQUEST });

    try {
        const { data } = await axios.post("/api/user/jobhistory", job);

        dispatch({
            type: USER_APPLY_JOB_SUCCESS,
            payload: data
        });
        toast.success("Apply Successfully for this Job!");
    } catch (error) {
        dispatch({
            type: USER_APPLY_JOB_FAIL,
            payload: error.response?.data?.error || "An error occurred"
        });
        toast.error(error.response?.data?.error || "An error occurred");
    }
};

// Delete User Action
export const deleteUserAction = (id) => async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });

    try {
        await axios.delete(`/api/user/delete/${id}`);
        dispatch({ type: DELETE_USER_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_USER_FAIL, payload: error.message });
    }
};

// Fetch User Details by ID
export const getUserDetails = (id) => async (dispatch) => {
    dispatch({ type: USER_DETAILS_REQUEST });

    try {
        const token = localStorage.getItem('token'); // Ensure you're storing the token correctly
        const { data } = await axios.get(`/api/User/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response?.data?.message || error.message });
    }
};

// Update User Action
export const updateUserAction = (userData) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/User/edit/${userData._id}`, userData, config);

        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
