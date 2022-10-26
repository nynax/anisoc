import {createSelector} from "reselect";
import {AppStateType} from "./reduxStore";

const getPageDialogsSelector = (state : AppStateType) => {
    return state.pageDialogs
}

export const getPageDialogs = createSelector(getPageDialogsSelector, (pageDialogs) => {
    return pageDialogs
})

const getPageDialogsMsgSelector = (state : AppStateType) => {
    return state.pageDialogs.msg
}

export const getPageDialogsMsg = createSelector(getPageDialogsMsgSelector, (pageDialogsMsg) => {
    return pageDialogsMsg
})

const getPageDialogsChatsSelector = (state : AppStateType) => {
    return state.pageDialogs.chats
}

export const getPageDialogsChats = createSelector(getPageDialogsChatsSelector, (pageDialogsChats) => {
    return pageDialogsChats
})