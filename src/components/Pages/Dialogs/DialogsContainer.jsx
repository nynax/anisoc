//import React from "react"
import {addMsgAC, updateMsgTextareaAC} from "../../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return {
        chatsData: state.pageDialogs.chats,
        messagesData: state.pageDialogs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMsg: () => {
            dispatch(addMsgAC())
        },
        updateArea: (text) => {
            dispatch(updateMsgTextareaAC(text))
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer