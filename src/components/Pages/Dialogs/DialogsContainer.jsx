import React from "react"
import {addMsgAC, updateMsgTextareaAC} from "../../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
//import {useNavigate} from "react-router-dom";
//import {useEffect} from "react";
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


// let AuthRedirectComponent = (props) => {
//
//     let navigate = useNavigate();
//     useEffect(() => {
//         if (!props.isAuth) {
//             console.log('isAuth - false')
//             return navigate("/settings");
//         }
//     },[]);
//     return (
//         <Dialogs {...props}/>
//     )
// }

let HocAuthRedirect = withAuthRedirect(Dialogs)

//const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(HocAuthRedirect)

export default DialogsContainer