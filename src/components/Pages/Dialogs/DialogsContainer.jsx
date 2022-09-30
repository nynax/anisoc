import React from "react"
import {addMsgAC, updateMsgTextareaAC} from "../../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";


const mapStateToProps = (state) => {
    return {
        chatsData: state.pageDialogs.chats,
        messagesData: state.pageDialogs,
        isAuth: state.auth.isAuth
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



//Так,
//let HocAuthRedirect = withAuthRedirect(Dialogs)
//const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(HocAuthRedirect)

//и так - одно и тоже :)
export default withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(Dialogs))

//export default DialogsContainer