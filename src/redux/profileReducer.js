import produce from "immer";
import {requestAPI} from "../api/api";

const ADD_POST = 'ADD-POST'
const UPDATE_POST_TEXTAREA = 'UPDATE-POST-TEXTAREA'
const SET_CURRENT_PROFILE = 'SET_CURRENT_PROFILE'

let initialState = {
    posts: [
        {id: 1, msg: "Hello", likes: 3},
        {id: 2, msg: "Fuck you", likes: 5},
        {id: 3, msg: "I need help", likes: 7},
        {id: 4, msg: "My name is Victor", likes: 12},
        {id: 5, msg: "Iam fine", likes: 1},
        {id: 6, msg: "Lets go", likes: 4},
    ],
    postTextarea: '',
    profile: null
}

export const profileReducer = (state = initialState, action) => {

    switch (action.type){
        case ADD_POST:
            let newPost = {
                id: 7,
                msg: state.postTextarea,
                likes: 0
            }
            return produce(state, draft => {
                draft.posts.push(newPost)
                draft.postTextarea = ''
            })
        case UPDATE_POST_TEXTAREA:
            return produce(state, draft => {
                draft.postTextarea = action.msg
            })
        case SET_CURRENT_PROFILE:
            return produce(state, draft => {
                draft.profile = action.currentProfile
            })
        default:
            //debugger
            return state
    }
}

export const addPost = () => ({type: ADD_POST})
export const updateArea = (msg) => ({type: UPDATE_POST_TEXTAREA, msg})
export const setCurrentProfile = (currentProfile) => ({type: SET_CURRENT_PROFILE, currentProfile})

export const setProfile = (userId) => {
    return (dispatch) => {
        if(userId === null){
            dispatch(setCurrentProfile(null))
        }else{
            console.log('requestAPI')
            requestAPI.getProfile(userId).then(response => {
                dispatch(setCurrentProfile(response.data))
            })
        }
    }
}
