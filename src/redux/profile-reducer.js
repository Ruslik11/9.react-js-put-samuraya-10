import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';
const SET_PHOTO_SUCCESS = 'SET-PHOTO-SUCCESS';

let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 0},
        {id: 2, message: "It's my first post", likesCount: 23}
    ],
    newPostText: 'it-kamasutra.com',
    profile: null
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                newPostText: '',
                posts: [
                    ...state.posts,
                    {
                        id: state.posts.length + 1,
                        message: action.newPostText,
                        likesCount: 0
                    }]
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case DELETE_POST:
            return {
                ...state, posts: state.posts.filter(p => p.id !== action)
            };
        case SET_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                }
            };
        default:
            return state;
    }
};

export const addPostAC = (newPostText) => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const setPhotoSuccess = (photos) => ({type: SET_PHOTO_SUCCESS, photos});

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data))
};

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data))
};

export const updateStatus = (status) => async (dispatch) => {
    try {
        let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        } else {
            console.log(response?.data?.messages[0])
        }
    } catch (e) {
        console.log(e?.response?.status)
    }
};

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(setPhotoSuccess(response.data.data.photos))
    } else {
        console.log(response?.data?.messages[0])
    }
};

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
};

export default profileReducer;