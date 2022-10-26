import React, {FC} from "react"
import css from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom";

type ChatsType = {
    key: number
    name: string
}

const Chats: FC<ChatsType> = (props) => {
    return (
        <div className={css.chats}>
            <NavLink to={'/dialogs/' + props.key}>{props.name}</NavLink>
        </div>
    )
}


export default Chats