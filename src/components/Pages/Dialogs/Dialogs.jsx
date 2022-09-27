import React from "react"
import css from "./Dialogs.module.css"
import Messages from "./Chats/Messages/Messages"
import Chats from "./Chats/Chats"

const Dialogs = (props) => {

    let chatsData = props.chatsData
    let messagesData = props.messagesData

    let onAddMsg = () => {
        props.addMsg()
    }

    let onUpdateArea = (e) => {
        let value = e.target.value
        props.updateArea(value)
    }

    let allChats = chatsData.map ( chat => <Chats name={chat.name} key={chat.id}/>)
    let allMessages = messagesData.msg.map ( msg => <Messages msg={msg.msg} ts={msg.ts} key={msg.id}/>)

    return (
        <div className={css.dialogs}>
            <div className={css.chats}>
                { allChats }
            </div>
            <div className={css.chat}>
                { allMessages }
                <div className={css.sendform}>
                    <div><textarea cols='30' placeholder='Type any message here...' onChange={onUpdateArea} value={messagesData.msgTextarea}/></div>
                    <div>
                        <button onClick={onAddMsg}>Send</button>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default Dialogs