import React from "react"
import css from "./../../Dialogs.module.css"

const Messages = (props) => {
    return (
            <div className={css.msg}>
                <div>{`${props.ts} > ${props.msg}`}</div>
            </div>
    )
}


export default Messages