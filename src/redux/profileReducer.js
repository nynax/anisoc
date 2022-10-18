import produce from "immer";
import {requestAPI} from "../api/api";
import {callPreloader} from "./usersReducer";
//import {setAuthData} from "./authReducer";
//import {initializeAC} from "./appReducer";

const ADD_POST = 'ADD-POST'
const SET_CURRENT_PROFILE = 'SET_CURRENT_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SET_PHOTOS = 'SET_PHOTOS'

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
    status: null
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
        case SET_PHOTOS:
            return produce(state, draft => {
                draft.profile.photos = action.photos
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
export const setProfilePhoto = (photos) => ({type: SET_PHOTOS, photos})

export const setProfile = (userId) => {
    return (dispatch) => {
        if(userId === null){
            dispatch(setCurrentProfile(null))
        }else{
            dispatch(callPreloader(true))
            console.log('requestAPI')
            requestAPI.getProfile(userId).then(response => {
                dispatch(getStatus(userId))
                dispatch(setCurrentProfile(response.data))
            }).catch(err => alert(err))
        }
    }
}

export const setStatus = (value, inputName) => {

    return (dispatch, getState) => {

        switch (inputName) {

            case "status":
                console.log('requestAPI (setStatus)')
                return requestAPI.setStatus(value)
            case "lookingForAJobDescription":
            case "fullName":
            case "aboutMe":
                let profile = {...getState().pageProfile.profile}

                //method API required aboutMe forever!
                if (inputName === "aboutMe" && value === ""){
                        value = "Tell me about you, baby ;)"
                }
                profile[inputName] = value

                if (!profile.aboutMe){
                    profile.aboutMe = "Tell me about you, baby ;)"
                }

                return requestAPI.setProfile(profile)

            default:
                //debugger
                return
        }
    }
}

export const getStatus = (userId) => {
    return (dispatch) => {
        console.log('requestAPI (getStatus)')
        requestAPI.getStatus(userId).then(response => {
            console.log(response.data)
            dispatch(setProfileStatus(response.data))
            dispatch(callPreloader(false))
        })
    }
}

export const updatePhoto = (photo) => {
    return (dispatch) => {
        console.log('requestAPI (setPhoto)')
        requestAPI.setPhoto(photo).then(response => {
            console.log(response.data)
            dispatch(setProfilePhoto(response.data.data.photos))
        })
    }
}
