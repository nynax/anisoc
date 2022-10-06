import produce from "immer";
import {requestAPI} from "../api/api";
import {callPreloader} from "./usersReducer";

const ADD_POST = 'ADD-POST'
const SET_CURRENT_PROFILE = 'SET_CURRENT_PROFILE'
const SET_STATUS = 'SET_STATUS'

let initialState = {
    posts: [
        {id: 1, msg: "Hello", likes: 3},
        {id: 2, msg: "Fuck you", likes: 5},
        {id: 3, msg: "I need help", likes: 7},
        {id: 4, msg: "My name is Victor", likes: 12},
        {id: 5, msg: "Iam fine", likes: 1},
        {id: 6, msg: "Lets go", likes: 4},
    ],
    profile: null,
    status: 'set status...'
}

export const profileReducer = (state = initialState, action) => {

    switch (action.type){
        case ADD_POST:
            let newPost = {
                id: 7,
                msg: action.postMsg,
                likes: 0
            }
            return produce(state, draft => {
                draft.posts.push(newPost)
            })
        case SET_CURRENT_PROFILE:
            return produce(state, draft => {
                draft.profile = action.currentProfile
            })
        case SET_STATUS:
            return produce(state, draft => {
                draft.status = action.status
            })
        default:
            //debugger
            return state
    }
}

export const addPost = (postMsg) => ({type: ADD_POST, postMsg})
export const setCurrentProfile = (currentProfile) => ({type: SET_CURRENT_PROFILE, currentProfile})
export const setProfileStatus = (status) => ({type: SET_STATUS, status})

export const setProfile = (userId) => {
    return (dispatch) => {
        if(userId === null){
            dispatch(setCurrentProfile(null))
        }else{
            dispatch(callPreloader(true))
            console.log('requestAPI')
            requestAPI.getProfile(userId).then(response => {
                dispatch(setCurrentProfile(response.data))
                dispatch(callPreloader(false))
            })
        }
    }
}

export const setStatus = (status) => {
    return (dispatch) => {
        console.log('requestAPI (setStatus)')
        requestAPI.updateStatus(status).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setProfileStatus(status))
            }
        })
    }
}

export const getStatus = (userId) => {
    return (dispatch) => {
        console.log('requestAPI (getStatus)')
        requestAPI.getStatus(userId).then(response => {
                dispatch(setProfileStatus(response.data))
        })
    }
}
