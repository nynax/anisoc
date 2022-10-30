import produce from "immer";
import {ChatsType, MsgType} from "../types/types";
import {Dispatch} from "redux";
const ADD_MSG = 'DIALOGS/ADD-MSG'

let initialState = {
    msg: [
        {id: 1, msg: "Helli", likes: 3, ts: '15:43'},
        {id: 2, msg: "I dd help", likes: 5, ts: '15:45'},
        {id: 3, msg: "I need help", likes: 7, ts: '15:49'},
        {id: 4, msg: "WTF?", likes: 12, ts: '15:51'},
        {id: 5, msg: "Iam die", likes: 1, ts: '15:55'},
        {id: 6, msg: ":)", likes: 4, ts: '16:01'}] as Array<MsgType>,
    chats: [
        {id: 1, name: "Victor", likes: 3},
        {id: 2, name: "Ivan", likes: 5},
        {id: 3, name: "Sveta", likes: 7},
        {id: 4, name: "Masha", likes: 12},
        {id: 5, name: "Vanya", likes: 1},
        {id: 6, name: "Dima", likes: 4}
    ] as Array<ChatsType>
}

type InitialStateType = typeof initialState

export const dialogsReducer = (state = initialState, action : ActionsType) : InitialStateType => {
    switch(action.type){
        case ADD_MSG:
            let newMsg = {
                id: 7,
                msg: action.dialogMsg,
                likes: 0,
                ts: '22:01'
            }
            return produce(state, draft => {
                draft.msg.push(newMsg)
            })
        default:
            return state
    }
}

type AddMsgACType = {
    type: typeof ADD_MSG
    dialogMsg: string
}

type ActionsType = AddMsgACType

const addMsgAC = (dialogMsg : string) : AddMsgACType => ({type: ADD_MSG, dialogMsg})

export type AddMsgType = (dialogMsg: string) => (dispatch: Dispatch<ActionsType>) => any

export const addMsg : AddMsgType = (dialogMsg) => (dispatch:Dispatch<ActionsType>) => {
    return dispatch(addMsgAC(dialogMsg))
}