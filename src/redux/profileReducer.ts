import produce from "immer";
import {requestAPI} from "../api/api";
import {callPreloader} from "./usersReducer";
import {PhotoType, PostsType, ProfileType} from "../types/types";

const ADD_POST = 'ADD-POST'
const SET_CURRENT_PROFILE = 'SET_CURRENT_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SET_PHOTOS = 'SET_PHOTOS'
const SET_PROFILE_ERROR = 'SET_PROFILE_ERROR'

let initialState = {
    posts: [
        {id: 1, msg: "Hello", likes: 3},
        {id: 2, msg: "Fuck you", likes: 5},
        {id: 3, msg: "I need help", likes: 7},
        {id: 4, msg: "My name is Victor", likes: 12},
        {id: 5, msg: "Iam fine", likes: 1},
        {id: 6, msg: "Lets go", likes: 4},
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: null as string | null,
    profileError: null as string | null,
}

type InitialStateType = typeof initialState

export const profileReducer = (state = initialState, action : any) : InitialStateType => {

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
                if (draft.profile !== null){
                    draft.profile.photos = action.photos
                }
            })
        case SET_STATUS:
            return produce(state, draft => {
                draft.status = action.status
            })
        case SET_PROFILE_ERROR:
            return produce(state, draft => {
                draft.profileError = action.errorMsg
            })
        default:
            //debugger
            return state
    }
}

type AddPostType = {
    type: typeof ADD_POST
    postMsg: string
}
type SetCurrentProfileType = {
    type: typeof SET_CURRENT_PROFILE
    currentProfile: ProfileType | null
}
type SetProfileStatusType = {
    type: typeof SET_STATUS
    status: string | null
}
type StProfilePhotoType = {
    type: typeof SET_PHOTOS
    photos: PhotoType
}
type SetProfileErrorType = {
    type: typeof SET_PROFILE_ERROR
    errorMsg: string | null
}


export const addPost = (postMsg : string):AddPostType => ({type: ADD_POST, postMsg})
export const setCurrentProfile = (currentProfile : ProfileType | null) : SetCurrentProfileType => ({type: SET_CURRENT_PROFILE, currentProfile})
export const setProfileStatus = (status : string | null) : SetProfileStatusType => ({type: SET_STATUS, status})
export const setProfilePhoto = (photos : PhotoType) : StProfilePhotoType => ({type: SET_PHOTOS, photos})
export const setProfileErrorAC = (errorMsg : string | null) : SetProfileErrorType => ({type: SET_PROFILE_ERROR, errorMsg})

export const setProfile = (userId : number) => {
    return (dispatch : any) => {
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

export const setProfileError = (errorMsg : string) => (dispatch : any) => {
    return dispatch(setProfileErrorAC(errorMsg))
}

export const updateProfile = (value : string, inputName : string) => {

    return (dispatch : any, getState : any) => {

        switch (inputName) {
            case "status":
                console.log('requestAPI (setStatus)')
                return requestAPI.setStatus(value)
            case "lookingForAJobDescription":
            case "fullName":
            case "aboutMe":
            case "contacts":
                let profile = {...getState().pageProfile.profile}

                //method API required aboutMe forever!
                if (inputName === "aboutMe" && value === ""){
                        value = "Tell me about you, baby ;)"
                }
                profile[inputName] = value

                if (!profile.aboutMe){
                    profile.aboutMe = "Tell me about you, baby ;)"
                }

                return requestAPI.setProfile(profile).then(response => {
                    if (response.data.resultCode !== 0) {
                        dispatch(setProfileError(response.data.messages[0]))
                    }
                })

            default:
                //debugger
                return
        }
    }
}

export const getStatus = (userId : number) => {
    return (dispatch : any) => {
        console.log('requestAPI (getStatus)')
        requestAPI.getStatus(userId).then(response => {
            console.log(response.data)
            dispatch(setProfileStatus(response.data))
            dispatch(callPreloader(false))
        })
    }
}

export const updatePhoto = (photo : PhotoType) => {
    return (dispatch : any) => {
        console.log('requestAPI (setPhoto)')
        requestAPI.setPhoto(photo).then(response => {
            console.log(response.data)
            dispatch(setProfilePhoto(response.data.data.photos))
        })
    }
}
