//import React from "react"
import {addMsg} from "../../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getIsAuth} from "../../../redux/authSelector";
import {getPageDialogs, getPageDialogsChats} from "../../../redux/dialogsSelector";


const mapStateToProps = (state) => {
    return {
        chatsData: getPageDialogsChats(state),
        messagesData: getPageDialogs(state),
        isAuth: getIsAuth(state)
    }
}


export default compose(
    connect(mapStateToProps, {addMsg}),
    withAuthRedirect,
)(Dialogs)

//Так,
//let HocAuthRedirect = withAuthRedirect(Dialogs)
//export default connect(mapStateToProps, mapDispatchToProps)(HocAuthRedirect)

//и так - одно и тоже :)
//export default withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(Dialogs))

//export default DialogsContainer