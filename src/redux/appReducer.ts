import produce from "immer"
import {setAuthData} from "./authReducer";
import {callPreloaderAC} from "./usersReducer";
import {Dispatch} from "redux";
import {InferActionsTypes} from "./reduxStore";

const INITIALIZING = 'APP/INITIALIZING'

let initialState = {
    initialize: false
}

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

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

const actions = {
    initializeAC: () => ({type: INITIALIZING} as const),
    callPreloaderAC
}

type InitializeAppType = () => (dispatch: Dispatch<ActionsType>) => any
export const initializeApp : InitializeAppType = () => (dispatch) => {

    let auth = dispatch(setAuthData())
    dispatch(callPreloaderAC(true))
    Promise.all([auth]).then(() => {
        dispatch(actions.initializeAC())
        dispatch(callPreloaderAC(false))
    })
}
