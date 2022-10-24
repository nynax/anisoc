import produce from "immer"
import {setAuthData} from "./authReducer";
import {callPreloader} from "./usersReducer";

const INITIALIZING = 'INITIALIZING'

type InitialStateType = {
    initialize: boolean
}

let initialState: InitialStateType = {
    initialize: false
}

export const appReducer = (state = initialState, action:any):InitialStateType => {

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

export const initializeAC = ():InitializeType => ({type: INITIALIZING})

export const initializeApp = () => (dispatch:any) => {

    let auth = dispatch(setAuthData())
    dispatch(callPreloader(true))
    Promise.all([auth]).then(() => {
        dispatch(initializeAC())
        dispatch(callPreloader(false))
    })
}
