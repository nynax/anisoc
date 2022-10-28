import {addMsg, AddMsgType} from "../../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {getIsAuth} from "../../../redux/authSelector";
import {getPageDialogsChats, getPageDialogsMsg} from "../../../redux/dialogsSelector";
import {AppStateType} from "../../../redux/reduxStore";
import {ChatsType, MsgType} from "../../../types/types";

type StateToPropsType = {
    chatsData: Array<ChatsType>
    messagesData: Array<MsgType>
    isAuth: boolean
}

type DispatchToPropsType = {
    addMsg: AddMsgType
}

const mapStateToProps = (state : AppStateType) : StateToPropsType  => {
    return {
        chatsData: getPageDialogsChats(state),
        messagesData: getPageDialogsMsg(state),
        isAuth: getIsAuth(state)
    }
}

/*export default compose(
    connect<StateToPropsType, DispatchToPropsType, {}, AppStateType>(mapStateToProps, {addMsg}),
    withAuthRedirect,
)(Dialogs)*/

/*export default compose(connect<StateToPropsType, DispatchToPropsType, {}, AppStateType>(mapStateToProps, {addMsg}),
    withAuthRedirect)(Dialogs)*/
export default withAuthRedirect(connect<StateToPropsType, DispatchToPropsType, {}, AppStateType>(mapStateToProps,{addMsg})(Dialogs))
//Так,
//let HocAuthRedirect = withAuthRedirect(Dialogs)
//export default connect(mapStateToProps, mapDispatchToProps)(HocAuthRedirect)

//и так - одно и тоже :)
//export default withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(Dialogs))

//export default DialogsContainer