import React, {ChangeEvent, FC, useEffect, useState} from "react";

type ChatContainerType = {}

let socket = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");

type MessageType = {
    userId: number
    userName: string
    message: string
    photo: string
}
type SendMessageType = (msg:string) => void

const ChatContainer : FC<ChatContainerType> = React.memo(() => {

    let [messages, setMessages] = useState([])

    const sendMessage = (msg:string) => {
        socket.send(msg)
    }

    useEffect(() => {
        socket.onmessage = function(event) {
           console.log(`[message] Данные получены с сервера: ${event.data}`)
            setMessages(JSON.parse(event.data))
        }
    },[]);


    return <Chat messages={messages} sendMessage={sendMessage}/>
})

type ChatType = {
    messages : Array<MessageType>
    sendMessage: SendMessageType
}

const Chat : FC<ChatType> = React.memo((props) => {
    return <><WindowOfMessages messages={props.messages}/><SendMessageForm sendMessage={props.sendMessage}/></>
})

type WindowOfMessagesType = {
    messages : Array<MessageType>
}

const WindowOfMessages : FC<WindowOfMessagesType> = React.memo((props) => {

        return <div>
            {props.messages.map((msg: any, index: number) => {
                return <OneMessage key={index} message={msg}/>
            })}
        </div>

})

type OneMessageType = {
    message : MessageType
}

const OneMessage : FC<OneMessageType> = (props) => {
    return <><p>{props.message.userName} : {props.message.message}</p></>
}

type SendMessageForm = {
    sendMessage: SendMessageType
}

const SendMessageForm : FC<SendMessageForm> = React.memo((props) => {

    let [myMessages, setMyMessages] = useState('')

    const onSendMyMessage = () => {
        props.sendMessage(myMessages)
    }

    const onSetMyMessage = (e : ChangeEvent<HTMLTextAreaElement>) => {
        setMyMessages(e.target.value)
    }


    return <div><textarea onChange={onSetMyMessage} placeholder={'type any here'}></textarea><div><button onClick={onSendMyMessage}>SendMessage</button></div></div>
})

export default ChatContainer