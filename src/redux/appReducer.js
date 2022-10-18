import produce from "immer"
import {setAuthData} from "./authReducer";
import {callPreloader} from "./usersReducer";

const INITIALIZING = 'INITIALIZING'

let initialState = {
    initialize: false
}

export const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case INITIALIZING:

            return produce(state, draft => {
                draft.initialize = true
            })
        default:
            return state
    }
}

export const initializeAC = () => ({type: INITIALIZING})

export const initializeApp = () => (dispatch) => {

    let auth = dispatch(setAuthData())
    dispatch(callPreloader(true))
    Promise.all([auth]).then(() => {
        dispatch(initializeAC())
        dispatch(callPreloader(false))
    })
}
