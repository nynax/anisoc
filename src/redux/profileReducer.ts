import produce from "immer";
import {requestAPI} from "../api/api";
import {callPreloaderAC, CallPreloaderACType} from "./usersReducer";
import {PhotoType, PostsType, ProfileType} from "../types/types";
import {Dispatch} from "redux";

const ADD_POST = 'PROFILE/ADD-POST'
const SET_CURRENT_PROFILE = 'PROFILE/SET_CURRENT_PROFILE'
const SET_STATUS = 'PROFILE/SET_STATUS'
const SET_PHOTOS = 'PROFILE/SET_PHOTOS'
const SET_PROFILE_ERROR = 'PROFILE/SET_PROFILE_ERROR'

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

export type ProfileInitialStateType = typeof initialState

export const profileReducer = (state = initialState, action : ActionType) : ProfileInitialStateType => {

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

type AddPostACType = {
    type: typeof ADD_POST
    postMsg: string
}
type SetCurrentProfileACType = {
    type: typeof SET_CURRENT_PROFILE
    currentProfile: ProfileType | null
}
type SetProfileStatusACType = {
    type: typeof SET_STATUS
    status: string | null
}
type StProfilePhotoACType = {
    type: typeof SET_PHOTOS
    photos: PhotoType
}
type SetProfileErrorACType = {
    type: typeof SET_PROFILE_ERROR
    errorMsg: string | null
}

type ActionType = AddPostACType | SetCurrentProfileACType | SetProfileStatusACType | StProfilePhotoACType | SetProfileErrorACType | CallPreloaderACType

export const addPostAC = (postMsg : string):AddPostACType => ({type: ADD_POST, postMsg})
export const setCurrentProfileAC = (currentProfile : ProfileType | null) : SetCurrentProfileACType => ({type: SET_CURRENT_PROFILE, currentProfile})
export const setProfileStatusAC = (status : string | null) : SetProfileStatusACType => ({type: SET_STATUS, status})
export const setProfilePhotoAC = (photos : PhotoType) : StProfilePhotoACType => ({type: SET_PHOTOS, photos})
export const setProfileErrorAC = (errorMsg : string | null) : SetProfileErrorACType => ({type: SET_PROFILE_ERROR, errorMsg})


export type AddPostType = (postMsg : string) =>  any
export const addPost : AddPostType = (postMsg : string) => (dispatch : any) => {
    return dispatch(addPostAC(postMsg))
}

export type SetProfileType = (userId : number | null) =>  any
export const setProfile : SetProfileType = (userId : number | null) => {
    return (dispatch : Dispatch<ActionType>) => {
        if(userId === null){
            dispatch(setCurrentProfileAC(null))
        }else{
            dispatch(callPreloaderAC(true))
            console.log('requestAPI')
            requestAPI.getProfile(userId).then(response => {
                dispatch(getStatus(userId))
                dispatch(setCurrentProfileAC(response.data))
            }).catch(err => alert(err))
        }
    }
}

export type SetProfileErrorType = (errorMsg : string | null) =>  any
export const setProfileError : SetProfileErrorType = (errorMsg : string | null) => (dispatch : any) => {
    return dispatch(setProfileErrorAC(errorMsg))
}

export type UpdateProfileType = (value : string | null, inputName : string) =>  any
export const updateProfile : UpdateProfileType = (value : string | null, inputName : string) => {

    return (dispatch : Dispatch<ActionType>, getState : any) => {
        let profile = {...getState().pageProfile.profile}

        switch (inputName) {
            case "status":
                console.log('requestAPI (setStatus)')
                return requestAPI.setStatus(value).then(response => {
                    if (response.data.resultCode !== 0) {
                        dispatch(setProfileErrorAC(response.data.messages[0]))
                    }else{
                        dispatch(setProfile(profile.userId))
                    }
                })
            case "lookingForAJobDescription":
            case "fullName":
            case "aboutMe":
            case "contacts":


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
                        dispatch(setProfileErrorAC(response.data.messages[0]))
                    }else{
                        dispatch(setProfile(profile.userId))
                    }
                })

            default:
                //debugger
                return
        }
    }
}

export type GetStatusType = (userId : number) =>  any
export const getStatus : GetStatusType = (userId : number) => {
    return (dispatch : Dispatch<ActionType>) => {
        console.log('requestAPI (getStatus)')
        requestAPI.getStatus(userId).then(response => {
            console.log(response.data)
            dispatch(setProfileStatusAC(response.data))
            dispatch(callPreloaderAC(false))
        })
    }
}

export type UpdatePhotoType = (photo : PhotoType) =>  any
export const updatePhoto : UpdatePhotoType = (photo : PhotoType) => {
    return (dispatch : Dispatch<ActionType>) => {
        console.log('requestAPI (setPhoto)')
        requestAPI.setPhoto(photo).then(response => {
            console.log(response.data)
            dispatch(setProfilePhotoAC(response.data.data.photos))
        })
    }
}
