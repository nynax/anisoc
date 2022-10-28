import produce from "immer"
import {setAuthData} from "./authReducer";
import {callPreloaderAC, CallPreloaderACType} from "./usersReducer";
import {Dispatch} from "redux";

const INITIALIZING = 'INITIALIZING'

type InitialStateType = {
    initialize: boolean
}

let initialState: InitialStateType = {
    initialize: false
}

export const appReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case INITIALIZING:

            return produce(state, draft => {
                draft.initialize = true
            })
        default:
            return state
    }
}

type InitializeType = {
    type: typeof INITIALIZING
}

type ActionsType = InitializeType | CallPreloaderACType

export const initializeAC = () : InitializeType => ({type: INITIALIZING})

export type InitializeAppType = () => (dispatch: Dispatch<ActionsType>) => any

export const initializeApp : InitializeAppType= () => (dispatch : Dispatch<ActionsType>) => {

    let auth = dispatch(setAuthData())
    dispatch(callPreloaderAC(true))
    Promise.all([auth]).then(() => {
        dispatch(initializeAC())
        dispatch(callPreloaderAC(false))
    })
}
