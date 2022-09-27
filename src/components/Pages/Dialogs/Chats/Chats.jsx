import React from "react"
import css from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom";

const Chats = (props) => {
    return (
        <div className={css.chats}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    )
}


export default Chats