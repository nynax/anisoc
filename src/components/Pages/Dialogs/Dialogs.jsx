import React from "react"
import css from "./Dialogs.module.css"
import Messages from "./Chats/Messages/Messages"
import Chats from "./Chats/Chats"
import {useForm} from "react-hook-form";

const Dialogs = (props) => {

    let chatsData = props.chatsData
    let messagesData = props.messagesData

    let allChats = chatsData.map ( chat => <Chats name={chat.name} key={chat.id}/>)
    let allMessages = messagesData.msg.map ( msg => <Messages msg={msg.msg} ts={msg.ts} key={msg.id}/>)

    const { register, handleSubmit, formState: { errors } } = useForm()

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
                })}>
                    <textarea {...register("dialogMsg", {
                        required: "Cant be empty"})} cols='30' placeholder='Type any message here...' />
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