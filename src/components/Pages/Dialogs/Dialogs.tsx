import React, {FC} from "react"
import css from "./Dialogs.module.css"
import Messages from "./Chats/Messages"
import Chats from "./Chats/Chats"
import {useForm} from "react-hook-form";
import {ChatsType, MsgType} from "../../../types/types";
import {AddMsgType} from "../../../redux/dialogsReducer";

type DialogsType = {
    chatsData: Array<ChatsType>
    messagesData: Array<MsgType>
    addMsg: AddMsgType
}

type FormValuesType = {
    dialogMsg: string
}

const Dialogs: FC<DialogsType> = (props) => {

    let chatsData = props.chatsData
    let messagesData = props.messagesData

    let allChats = chatsData.map ( chat => <Chats name={chat.name} key={chat.id} chatId={chat.id} />)
    let allMessages = messagesData.map ( msg => <Messages msg={msg.msg} ts={msg.ts} key={msg.id}/>)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValuesType>()

    return (
        <div className={css.dialogs}>
            <div className={css.chats}>
                { allChats }
            </div>
            <div className={css.chat}>
                { allMessages }
                <form className={css.formInline} onSubmit={handleSubmit ((data) => {
                    console.log(data)
                    props.addMsg(data.dialogMsg)
                    reset()
                })}>
                    <textarea {...register("dialogMsg", {
                        required: "Cant be empty"})} cols={30} placeholder='Type any message here...' />
                    <button>Send</button>

                </form>
                <div className={css.errors}>
                    {errors.dialogMsg !== undefined && <div>{errors.dialogMsg.message}</div>}
                </div>
            </div>

        </div>
    )
}


export default Dialogs